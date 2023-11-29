import { Component, Prop, Element, Host, h } from '@stencil/core'
import { Event, EventEmitter } from '@stencil/core'
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
  static fromFile(file, props={}) {
    const extension = file.name.split(".").at(-1)
    const asdf = Object.assign(document.createElement("uploaded-file"), {
      ...props,
      src: URL.createObjectURL(file),
      filename: file.name,
      mimetype: Mime.getType(extension),
      size: file.size,
      state: "pending",
      percent: 0,
      file: file,
    })
    return asdf
  }

  static fromSignedId(signedId, props={}) {
    return get(`/rails/active_storage/blobs/info/${signedId}`).then(blob => {
      return Object.assign(new UploadedFile(), {
        ...props,
        // src: FIXME
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


  @Event() removeEvent: EventEmitter

  private removeSelf = event => {
    event.stopPropagation()
    event.preventDefault()
    this.removeEvent.emit(this)
  }


  checkValidity = null
  setCustomValidity = null

  constructor() {
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
          <a class="remove-media" onClick={this.removeSelf} href="#">
            <span>Remove media</span>
          </a>
          <p>{media}</p>
        </figure>
      </Host>
    )
  }

  hiddenField: HTMLInputElement

  componentWillLoad() {
    this.el.innerHTML = `<input type="hidden" name=${this.name} value=${this.value} />`
    this.hiddenField = this.el.querySelector("input[type=hidden]")
  }

  componentDidRender() {
    this.hiddenField.value = this.value
  }
}
