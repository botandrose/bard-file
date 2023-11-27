import { Component, Prop, State, Element, Host, h } from '@stencil/core'
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
    return Object.assign(new UploadedFile(), {
      ...props,
      src: URL.createObjectURL(file),
      filename: file.name,
      mimetype: Mime.getType(extension),
      size: file.size,
      state: "pending",
      percent: 0,
      file: file,
    })
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

  @Element() el: HTMLElement

  @Prop() name: string
  @Prop() value: string
  @Prop() filename: string
  @Prop() src: string
  @Prop() mimetype: string
  @Prop() size: number

  @Prop() accepts: string
  @Prop() max: number

  @State() state: string
  @State() percent: number
  @State() file: File
  @State() validationMessage: string


  @Event() remove: EventEmitter

  removeSelf(event) {
    event.stopPropagation()
    event.preventDefault()
    this.remove.emit(this)
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
          <progress-bar percent={this.percent} class="separate-upload direct-upload--{this.state}">
            ${this.filename}
          </progress-bar>
          <a class="remove-media" onClick={this.removeSelf} href="#">
            <span>Remove media</span>
          </a>
          <p>{media}</p>
        </figure>
      </Host>
    )
  }

  componentDidRender() {
    this.el.innerHTML = <input type="hidden" name={this.name} value={this.value} />
  }

  checkValidity() {
    let errors = []
    errors.push(...new Accepts(this).errors)
    errors.push(...new Max(this).errors)
    this.setCustomValidity(errors.join(" "))
    // this.reportValidity() // fire invalid event?
    return errors.length === 0
  }

  setCustomValidity(msg) {
    this.validationMessage = msg
  }
}
