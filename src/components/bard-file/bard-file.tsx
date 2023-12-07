import { Component, Element, Prop, State, Listen, Host, h } from '@stencil/core';
import FormController from "./form-controller"
import { UploadedFile } from "../uploaded-file/uploaded-file"
import { FileDrop as _ } from "../file-drop/file-drop"
import { morph, html, arrayRemove } from "../../utils/utils"

@Component({
  tag: 'bard-file',
  styleUrl: 'bard-file.css',
  shadow: true,
})
export class BardFile {
  @Element() el: HTMLElement

  @Prop() name: string
  @Prop() directupload: string
  @Prop() multiple: boolean = false

  @Prop() required: boolean = false
  @Prop() accepts: string
  @Prop() max: number

  @State() _forceUpdate: boolean = false
  forceUpdate() { this._forceUpdate = !this._forceUpdate }

  fileTarget: HTMLInputElement
  hiddenTarget: HTMLInputElement
  _files: Array<any>

  constructor() {
    this.hiddenTarget = html(`<input id="hidden-target">`) as HTMLInputElement
    this.fileTarget = html(`<input id="${this.el.id}">`) as HTMLInputElement
    this.files = Array.from(this.el.children).filter(e => e.tagName == "UPLOADED-FILE")
  }

  componentWillLoad() {
    this.el.removeAttribute("id")
    this.el.insertAdjacentElement("afterbegin", this.hiddenTarget)
    this.el.insertAdjacentElement("afterbegin", this.fileTarget)
    FormController.instance(this.el.closest("form"))
  }

  // Methods

  get files() {
    return this._files
  }

  set files(val) {
    this._files = val
    if(!this.multiple) this._files = this._files.slice(-1)
    this.forceUpdate()
    this.el.dispatchEvent(new Event("change"))
  }

  get value() {
    return this.files.map(e => e.value)
  }

  set value(val) {
    this.files = (val || []).map(signedId => Object.assign(new UploadedFile(), {
      name: this.name,
      signedId,
    }))
  }

  @Listen("change")
  fileTargetChanged(event) {
    if(event.target !== this.fileTarget) return
    this.files.push(...Array.from(this.fileTarget.files).map(file => Object.assign(new UploadedFile(), {
      name: this.name,
      url: this.directupload,
      accepts: this.accepts,
      max: this.max,
      file,
    })))
    this.files = this.files
    this.fileTarget.value = null
  }

  @Listen("uploaded-file:remove")
  removeUploadedFile(event) {
    arrayRemove(this.files, event.detail)
    this.files = this.files
  }

  // Rendering

  render() {
    return (
      <Host>
        <file-drop for={this.fileTarget.id}>
          <i class="drag-icon"></i>
          <p>
            <strong>Choose {this.multiple ? "files" : "file"} </strong>
            <span>or drag {this.multiple ? "them" : "it"} here.</span>
          </p>

          <div class={`media-preview ${this.multiple ? '-stacked' : ''}`}>
            <slot></slot>
          </div>
        </file-drop>
      </Host>
    )
  }

  componentDidRender() {
    morph(this.fileTarget, `
      <input
        type="file"
        id="${this.fileTarget.id}"
        ${this.multiple ? "multiple" : ""}
        ${this.required && this.files.length === 0 ? "required" : ""}
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
      >`)
    morph(this.hiddenTarget, `
      <input
        type="hidden"
        id="hidden-target"
        name="${this.name}"
        ${this.files.length > 0 ? "disabled" : ""}
      >`)

    const existingUploadedFiles = Array.from(this.el.children).filter(e => e.tagName === "UPLOADED-FILE")
    this.files.forEach(uploadedFile => {
      if(!existingUploadedFiles.includes(uploadedFile as any)) {
        this.el.append(uploadedFile as any)
      }
    })
    existingUploadedFiles.forEach(dom => {
      if(!this.files.includes(dom as any)) {
        this.el.removeChild(dom as any)
      }
    })
  }

  // Validations

  checkValidity() {
    return this.fileTarget.checkValidity()
  }

  setCustomValidity(msg) {
    this.fileTarget.setCustomValidity(msg)
  }

  reportValidity() {
    this.fileTarget.reportValidity()
  }

  get validationMessage() {
    return this.fileTarget.validationMessage
  }
}

