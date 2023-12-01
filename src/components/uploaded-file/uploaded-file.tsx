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
  static fromFile(file, props={}): UploadedFile {
    const extension = file.name.split(".").at(-1)
    let uploadedFile = document.createElement("uploaded-file") as any
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

  @Prop({ reflect: true, mutable: true }) state: string = "complete"
  @Prop({ reflect: true, mutable: true }) percent: number = 100

  @Prop() file: File
  @Prop() validationMessage: string
  @Prop() uid: number

  @Event({ eventName: "uploaded-file:remove" }) removeEvent: EventEmitter

  private removeClicked = event => {
    event.stopPropagation()
    event.preventDefault()
    this.controller?.cancel()
    this.removeEvent.emit(this)
  }

  inputField: HTMLInputElement
  controller: DirectUploadController
  url: string

  constructor() {
    this.uid = uid++
    this.inputField = document.createElement("input")
    this.inputField.style.cssText = "opacity: 0.01; width: 1px; height: 1px; z-index: -999"
    this.inputField.name = this.name
    this.inputField.value = this.value

    this.el.checkValidity = () => {
      let errors = []
      errors.push(...new Accepts(this).errors)
      errors.push(...new Max(this).errors)
      this.inputField.setCustomValidity(errors.join(" "))
      this.inputField.reportValidity()
      return errors.length === 0
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
    this.inputField.setCustomValidity(error)
  }

  @Listen("direct-upload:end")
  end(_event) {
    if(this.state !== "error") {
      this.state = "complete"
      this.percent = 100
    }
  }

  render() {
    return (
      <Host>
        <slot>
        </slot>
        <figure>
          <div class="progress-details">
            <progress-bar percent={this.percent} class={this.state}>
              {this.filename}
            </progress-bar>
            <a class="remove-media" onClick={this.removeClicked} href="#">
              <span>Remove media</span>
            </a>
          </div>
          <file-preview src={this.src} mimetype={this.mimetype}></file-preview>
        </figure>
      </Host>
    )
  }

  componentWillLoad() {
    this.el.appendChild(this.inputField)
  }

  componentDidRender() {
    this.inputField.name = this.name
    this.inputField.value = this.value
  }

  componentDidLoad() {
    if(this.el.checkValidity() && this.state == "pending") {
      this.controller = new DirectUploadController(this.el)
      this.controller.dispatch("initialize", { controller: this.controller })
    }
  }
}

let uid = 0
