import { Component, Prop, Element, Host, h } from '@stencil/core'
import { Listen, Event, EventEmitter } from '@stencil/core'
import DirectUploadController from './direct-upload-controller'
import Max from './max'
import Accepts from './accepts'
import Mime from 'mime-lite'
import { get } from 'rails-request-json'

@Component({
  tag: 'uploaded-file',
  styleUrl: 'uploaded-file.css',
  shadow: true,
})
export class UploadedFile {
  static fromFile(file, props={} as any): UploadedFile {
    const extension = file.name.split(".").at(-1)
    let uploadedFile = new UploadedFile()
    const url = props.url
    delete props.url
    uploadedFile = Object.assign(uploadedFile, {
      ...props,
      src: URL.createObjectURL(file),
      filename: file.name,
      mimetype: Mime.getType(extension),
      size: file.size,
      state: "pending",
      percent: 0,
      file: file,
    })
    uploadedFile.hiddenField.setAttribute("data-direct-upload-url", url)
    uploadedFile.controller = new DirectUploadController(uploadedFile.hiddenField, uploadedFile)
    return uploadedFile
  }

  static fromSignedId(signedId, props={}) {
    return get(`/rails/active_storage/blobs/info/${signedId}`).then(blob => {
      return Object.assign(document.createElement("uploaded-file"), {
        ...props,
        src: `/rails/active_storage/blobs/redirect/${signedId}/${blob.filename}`,
        filename: blob.filename,
        mimetype: blob.content_type,
        size: blob.byte_size,
        state: "complete",
        percent: 100,
        value: signedId,
      })
    })
  }

  @Element() el

  @Prop({ reflect: true }) name: string
  @Prop({ reflect: true }) value: string
  @Prop({ reflect: true }) filename: string
  @Prop({ reflect: true }) src: string
  @Prop({ reflect: true }) mimetype: string
  @Prop({ reflect: true }) size: number

  @Prop({ reflect: true }) accepts: string
  @Prop({ reflect: true }) max: number

  @Prop({ reflect: true }) state: string = "complete"
  @Prop({ reflect: true }) percent: number = 100

  @Prop() file: File
  @Prop() validationMessage: string


  @Event({ eventName: "uploaded-file:remove" }) removeEvent: EventEmitter

  private removeClicked = event => {
    event.stopPropagation()
    event.preventDefault()
    this.removeEvent.emit(this)
  }

  hiddenField: HTMLInputElement
  controller: DirectUploadController
  checkValidity = null
  setCustomValidity = null

  constructor() {
    this.hiddenField = document.createElement("input")
    this.hiddenField.type = "hidden"
    this.hiddenField.name = this.name
    this.hiddenField.value = this.value

    this.el.checkValidity = () => {
      let errors = []
      errors.push(...new Accepts(this).errors)
      errors.push(...new Max(this).errors)
      this.setCustomValidity(errors.join(" "))
      // this.reportValidity() // fire invalid event?
      return errors.length === 0
    }

    this.el.setCustomValidity = (msg) => {
      this.validationMessage = msg
    }
  }

  @Listen("direct-upload:initialize")
  @Listen("direct-upload:start")
  start(_event) {
    this.state = "pending"
    this.percent = 0
  }

  @Listen("direct-upload:progress")
  progress(event) {
    const { progress } = event.detail
    this.percent = progress
  }

  @Listen("direct-upload:error")
  error(event) {
    event.preventDefault()
    const { error } = event.detail
    this.state = "error"
    this.validationMessage = error
  }

  @Listen("direct-upload:end")
  end(_event) {
    this.state = "complete"
    this.percent = 100
  }

  render() {
    let klass, media
    if(["image/jpeg", "image/png"].includes(this.mimetype)) {
      klass = "image-preview"
      media = <img src={this.src}/>
    } else if(this.mimetype === "video/mp4") {
      klass = "video-preview"
      const toggle = function() { this.paused ? this.play() : this.pause(); return false }
      media = <video src={this.src} onClick={toggle} />
    } else {
      klass = "missing-preview"
      media = "This media does not offer a preview"
    }

    return (
      <Host>
        <slot>
        </slot>
        <figure class={klass}>
          <progress-bar percent={this.percent} class={`separate-upload direct-upload--${this.state}`}>
            {this.filename}
          </progress-bar>
          <a class="remove-media" onClick={this.removeClicked} href="#">
            <span>Remove media</span>
          </a>
          <p>{media}</p>
        </figure>
      </Host>
    )
  }

  componentWillLoad() {
    this.el.appendChild(this.hiddenField)
    if(this.controller) this.controller.dispatch("initialize");
  }

  componentDidRender() {
    this.hiddenField.name = this.name
    this.hiddenField.value = this.value
  }
}
