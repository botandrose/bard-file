import { Component, Element, Prop, State, Listen, Host, h } from '@stencil/core';
import FormController from "./form-controller"
import { UploadedFile } from "../uploaded-file/uploaded-file"
import { FileDrop as _ } from "../file-drop/file-drop"
import morph from "morphdom"

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

  @Prop({ mutable: true }) files: Array<any>

  @State() _forceUpdate: boolean = false
  forceUpdate() {
    this._forceUpdate = !this._forceUpdate
  }

  originalId: string
  fileTarget: HTMLInputElement
  hiddenTarget: HTMLInputElement

  constructor() {
    this.originalId = this.el.id

    this.hiddenTarget = document.createElement("input")
    this.hiddenTarget.id = "hidden-target"

    this.fileTarget = document.createElement("input")
    this.fileTarget.id = this.originalId
    this.fileTarget.addEventListener("change", event => this.fileTargetChanged(event))

    this.files = Array.from(this.el.children).filter(e => e.tagName == "UPLOADED-FILE")
  }

  componentWillLoad() {
    this.el.removeAttribute("id")
    this.el.insertAdjacentElement("afterbegin", this.hiddenTarget)
    this.el.insertAdjacentElement("afterbegin", this.fileTarget)
    FormController.instance(this.el.closest("form"))
  }

  // Methods

  get value() {
    return this.files.map(uploadedFile => uploadedFile.value)
  }

  set value(val) {
    this.files = []
    const signedIds = this._signedIdsFromValue(val)
    const uploadedFiles = signedIds.map(signedId => {
      const e = new UploadedFile()
      e.name = this.name
      e.signedId = signedId
      return e
    })
    this.assignFiles(uploadedFiles)
  }

  _signedIdsFromValue(value) {
    let signedIds = []
    if(typeof value == "string" && value.length > 0) {
      signedIds = value.split(",")
    }
    if(Array.isArray(value)) {
      signedIds = value
    }
    return signedIds.filter(signedId => {
      return signedId.toString().length > 0
    })
  }

  fileTargetChanged(_event) {
    const uploadedFiles = Array.from(this.fileTarget.files).map(file => {
      const e = new UploadedFile()
      e.name = this.name
      e.url = this.directupload
      if(this.accepts) e.accepts = this.accepts
      if(this.max) e.max = this.max
      e["file"] = file
      return e
    })
    this.fileTarget.value = null
    this.assignFiles(uploadedFiles)
  }

  assignFiles(uploadedFiles) {
    if(this.multiple) {
      this.files.push(...uploadedFiles);
      this.forceUpdate()
    } else {
      this.files = uploadedFiles.slice(-1)
    }
    this.el.dispatchEvent(new Event("change"))
  }

  @Listen("uploaded-file:remove")
  removeUploadedFile(event) {
    const index = this.files.findIndex(uf => uf === event.detail)
    if(index !== -1) this.files.splice(index, 1);
    this.forceUpdate()
    this.el.dispatchEvent(new Event("change"))
  }

  // Rendering

  render() {
    return (
      <Host>
        <file-drop for={this.originalId}>
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
        id="${this.originalId}"
        ${this.multiple ? "multiple" : ""}
        ${this.required && this.files.length === 0 ? "required" : ""}
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
      >`)
    morph(this.hiddenTarget, `
      <input
        type="hidden"
        id="hidden-target"
        name="${this.name}" ${this.files.length > 0 ? "disabled" : ""}
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

// function html(html) {
//   const el = document.createElement("div")
//   morph(el, `<div>${html}</div>`)
//   return el.children[0]
// }
