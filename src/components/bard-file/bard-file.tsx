import { Component, Element, Prop, State, Listen, Host, h } from '@stencil/core';
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

  @State() files: Array<UploadedFile> = []

  originalId: string
  fileTarget: HTMLInputElement
  hiddenTarget: HTMLInputElement
  formController: FormController

  constructor() {
    this.originalId = this.el.id

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

  @Listen("direct-upload:initialize")
  init(event) {
    const { file } = event.detail
    const uploadedFile = this.files.find(bf => bf.file === file)
    uploadedFile.state = "pending"
    uploadedFile.percent = 0
  }

  @Listen("direct-upload:start")
  start(event) {
    const { file } = event.detail
    const uploadedFile = this.files.find(bf => bf.file === file)
    uploadedFile.state = "pending"
  }

  @Listen("direct-upload:progress")
  progress(event) {
    const { file, progress } = event.detail
    const uploadedFile = this.files.find(bf => bf.file === file)
    uploadedFile.percent = progress
  }

  @Listen("direct-upload:error")
  error(event) {
    event.preventDefault()
    const { file } = event.detail
    const uploadedFile = this.files.find(bf => bf.file === file)
    uploadedFile.state = "error"
    // uploadedFile.error = error
  }

  @Listen("direct-upload:end")
  end(event) {
    const { file } = event.detail
    const uploadedFile = this.files.find(bf => bf.file === file)
    uploadedFile.state = "complete"
    uploadedFile.percent = 100
  }

  fileTargetChanged(_event) {
    const uploadedFiles = Array.from(this.fileTarget.files).map(file => {
      return UploadedFile.fromFile(file, { name: this.name, accepts: this.accepts, max: this.max })
    })
    this.fileTarget.value = null
    this.assignFiles(uploadedFiles)
    if(this.checkValidity()) {
      this.formController.uploadFiles(this)
    } else {
      this.files = []
    }
  }

  assignFiles(uploadedFiles) {
    if(this.multiple) {
      this.files.push(...uploadedFiles)
    } else {
      this.files = uploadedFiles.slice(-1)
    }
    this.renderFiles()
    this.el.dispatchEvent(new Event("change"))
  }

  removeFile(file) {
    const index = this.files.indexOf(file)
    this.files.splice(index, 1)
    this.renderFiles()
    this.el.dispatchEvent(new Event("change"))
  }

  componentWillLoad() {
    this.el.insertAdjacentHTML("afterbegin", `
      <input type="file"
        style="opacity: 0.01; position: absolute; z-index: -999"
        id="${this.originalId}"
        data-direct-upload-url="${this.directupload}"
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
          <strong>Choose {this.multiple ? "files" : "file"} </strong>
          <span>or drag {this.multiple ? "them" : "it"} here.</span>

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
    let errors = []

    this.files.forEach(uploadedFile => {
      if(!uploadedFile.checkValidity()) {
        errors.push(uploadedFile.validationMessage)
      }
    })

    this.setCustomValidity(errors.join(" "))
    this.reportValidity()
    return errors.length === 0
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

