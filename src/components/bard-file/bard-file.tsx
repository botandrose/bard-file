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

  fileTargetId: string
  fileTarget: HTMLInputElement
  hiddenTargetId: string
  hiddenTarget: HTMLInputElement
  _files: Array<any>

  constructor() {
    this.fileTargetId = this.el.id
    this.fileTarget = html(`<input id="${this.fileTargetId}">`) as HTMLInputElement
    this.hiddenTargetId = `hidden-target-${this.name}`
    this.hiddenTarget = html(`<input id="${this.hiddenTargetId}">`) as HTMLInputElement
    this.files = Array.from(this.el.children).filter(e => e.tagName == "UPLOADED-FILE")
  }

  componentWillLoad() {
    this.el.removeAttribute("id")
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
    const newValue = val || []
    if(JSON.stringify(this.value) !== JSON.stringify(newValue)) { // this is insane. javascript is fucking garbage.
      this.files = newValue.map(signedId => Object.assign(new UploadedFile(), {
        name: this.name,
        signedId,
      }))
    }
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
        <file-drop for={this.fileTargetId}>
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
      <input id="${this.fileTargetId}"
        type="file"
        ${this.multiple ? "multiple" : ""}
        ${this.required && this.files.length === 0 ? "required" : ""}
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
      >`)
    morph(this.hiddenTarget, `
      <input id="${this.hiddenTargetId}"
        type="hidden"
        name="${this.name}"
        ${this.files.length > 0 ? "disabled" : ""}
      >`)

    const wrapper = document.createElement("div")
    wrapper.replaceChildren(this.fileTarget, this.hiddenTarget, ...this.files)
    morph(this.el, wrapper, { childrenOnly: true })
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

