import { Component, Prop, Element, Watch, Host, h } from '@stencil/core'
import { Listen, Event, EventEmitter } from '@stencil/core'
import DirectUploadController from './direct-upload-controller'
import Max from './max'
import Accepts from './accepts'
import Extensions from './extensions'
import { get } from 'rails-request-json'
import { morph, html } from "../../utils/utils"

let uid = 0

@Component({
  tag: 'uploaded-file',
  styleUrl: 'uploaded-file.css',
  shadow: true,
})
export class UploadedFile {
  @Element() el

  @Prop({ reflect: true, mutable: true }) name: string
  @Prop({ reflect: true, mutable: true }) accepts: string
  @Prop({ reflect: true, mutable: true }) max: number
  @Prop({ reflect: true, mutable: true }) url: string

  @Prop({ reflect: true, mutable: true }) value: string
  @Prop({ reflect: true, mutable: true }) filename: string
  @Prop({ reflect: true, mutable: true }) src: string
  @Prop({ reflect: true, mutable: true }) filetype: string
  @Prop({ reflect: true, mutable: true }) size: number
  @Prop({ reflect: true, mutable: true }) state: string = "complete"
  @Prop({ reflect: true, mutable: true }) percent: number = 100

  @Prop() validationMessage: string

  @Event({ eventName: "uploaded-file:remove" }) removeEvent: EventEmitter

  private removeClicked = event => {
    event.stopPropagation()
    event.preventDefault()
    this.controller?.cancel()
    this.removeEvent.emit(this)
  }

  inputTarget: HTMLInputElement
  controller: DirectUploadController
  _file: File
  uid: number

  constructor() {
    this.uid = uid++
    this.inputTarget = html(`<input id="input-target">`) as HTMLInputElement
  }

  componentWillLoad() {
    this.el.appendChild(this.inputTarget)
    this.setMissingFiletype()
  }

  get file() {
    return this._file
  }

  set file(file: any) {
    this.src = URL.createObjectURL(file)
    this.filename = file.name
    this.size = file.size
    this.state = "pending"
    this.percent = 0
    this._file = file
  }

  set signedId(val) {
    get(`/rails/active_storage/blobs/info/${val}`).then(blob => {
      this.src = `/rails/active_storage/blobs/redirect/${val}/${blob.filename}`
      this.filename = blob.filename
      this.size = blob.byte_size
      this.state = "complete"
      this.percent = 100
      this.value = val
    })
  }

  @Watch("filename")
  setMissingFiletype(_value?, _previousValue?) {
    if(!this.filetype && this.filename) {
      this.filetype = Extensions.getFileType(this.filename)
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
    this.inputTarget.setCustomValidity(error)
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
          <file-preview src={this.src} filetype={this.filetype}></file-preview>
        </figure>
      </Host>
    )
  }

  componentDidRender() {
    morph(this.inputTarget, `
      <input
        id="input-target"
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
        name="${this.name}"
        value="${this.value}"
      >`)
  }

  componentDidLoad() {
    if(this.checkValidity() && this.state == "pending") {
      this.controller = new DirectUploadController(this.el)
      this.controller.dispatch("initialize", { controller: this.controller })
    }
  }

  checkValidity() {
    let errors = []
    errors.push(...new Accepts(this).errors)
    errors.push(...new Max(this).errors)
    this.inputTarget.setCustomValidity(errors.join(" "))
    this.inputTarget.reportValidity()
    return errors.length === 0
  }
}

