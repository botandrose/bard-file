import { Component, Element, Prop, Listen, Host, h } from '@stencil/core';
import FormController from "./form-controller"
import { UploadedFile } from "../uploaded-file/uploaded-file"
import { FileDrop as _ } from "../file-drop/file-drop"

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

  originalId: string
  fileTarget: HTMLInputElement
  hiddenTarget: HTMLInputElement
  formController: FormController

  constructor() {
    this.originalId = this.el.id

    this.files = Array.from(this.el.children).filter(e => e.tagName == "UPLOADED-FILE")

    Object.defineProperty(this.el, "value", {
      get () {
        return this.files.map(uploadedFile => uploadedFile.value)
      },
      set (val) {
        this.files = []
        const signedIds = this.signedIdsFromValue(val)
        const promises = signedIds.map(signedId => {
          return UploadedFile.fromSignedId(signedId, { name: this.name })
        })
        Promise.all(promises).then(uploadedFiles => {
          this.assignFiles(uploadedFiles)
        })
      },
    })
  }

  signedIdsFromValue(value) {
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

  connectedCallback() {
    this.el.removeAttribute("id")
    this.formController = FormController.forForm(this.el.closest("form"))
  }

  fileTargetChanged(_event) {
    const uploadedFiles = Array.from(this.fileTarget.files).map(file => {
      return UploadedFile.fromFile(file, {
        name: this.name,
        accepts: this.accepts,
        max: this.max,
        url: this.directupload,
      })
    })
    this.fileTarget.value = null
    this.assignFiles(uploadedFiles)
  }

  assignFiles(uploadedFiles) {
    if(this.multiple) {
      this.files.push(...uploadedFiles)
    } else {
      this.files = uploadedFiles.slice(-1)
    }
    this.render()
    this.renderFiles()
    this.el.dispatchEvent(new Event("change"))
  }

  @Listen("uploaded-file:remove")
  removeUploadedFile(event) {
    const index = this.files.findIndex(uf => uf.uid === event.detail.uid)
    if(index !== -1) this.files.splice(index, 1)
    this.render()
    this.renderFiles()
    this.el.dispatchEvent(new Event("change"))
  }

  componentWillLoad() {
    this.el.insertAdjacentHTML("afterbegin", `
      <input type="file"
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
        id="${this.originalId}"
      />
      <input type="hidden" name="${this.name}" />
    `)
    this.fileTarget = this.el.querySelector("input[type=file]")
    this.fileTarget.multiple = this.multiple
    this.fileTarget.addEventListener("change", event => this.fileTargetChanged(event))

    this.hiddenTarget = this.el.querySelector("input[type=hidden]")
  }

  render() {
    this.fileTarget.required = this.files.length === 0 && this.required
    this.hiddenTarget.disabled = this.files.length > 0

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

  renderFiles() {
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
