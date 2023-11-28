import { Component, Element, Prop, State, Listen, Host, h } from '@stencil/core';
import FormController from "./form-controller"
import { UploadedFile } from "../uploaded-file/uploaded-file"

@Component({
  tag: 'bard-file',
  styleUrl: 'bard-file.css',
  shadow: true,
})
export class BardFile {
  @Element() el: HTMLElement

  @Prop() name: string
  @Prop() directupload: string
  @Prop() multiple: boolean

  @Prop() required: boolean
  @Prop() accepts: string
  @Prop() max: number

  @State() files: Array<UploadedFile>

  originalId: string
  fileTarget: HTMLInputElement
  formController: FormController

  constructor() {
    this.files = []
    this.originalId = this.el.id
    this.el.removeAttribute("id")
  }

  @Listen("direct-upload:initialize")
  init(event) {
    const { file } = event.detail
    const bardFile = this.files.find(bf => bf.file === file)
    bardFile.state = "pending"
    bardFile.percent = 0
    // this.requestUpdate()
  }

  @Listen("direct-upload:start")
  start(event) {
    const { file } = event.detail
    const bardFile = this.files.find(bf => bf.file === file)
    bardFile.state = "pending"
    // this.requestUpdate()
  }

  @Listen("direct-upload:progress")
  progress(event) {
    const { file, progress } = event.detail
    const bardFile = this.files.find(bf => bf.file === file)
    bardFile.percent = progress
    // this.requestUpdate()
  }

  @Listen("direct-upload:error")
  error(event) {
    event.preventDefault()
    const { file } = event.detail
    const bardFile = this.files.find(bf => bf.file === file)
    bardFile.state = "error"
    // bardFile.error = error
    // this.requestUpdate()
  }

  @Listen("direct-upload:end")
  end(event) {
    const { file } = event.detail
    const bardFile = this.files.find(bf => bf.file === file)
    bardFile.state = "complete"
    bardFile.percent = 100
    // this.requestUpdate()
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

  assignFiles(bardFiles) {
    if(this.multiple) {
      this.files.push(...bardFiles)
    } else {
      this.files = bardFiles.slice(-1)
    }
    // this.requestUpdate()
    this.el.dispatchEvent(new Event("change"))
  }

  removeFile(file) {
    const index = this.files.indexOf(file)
    this.files.splice(index, 1)
    // this.requestUpdate()
    this.el.dispatchEvent(new Event("change"))
  }

  render() {
    return (
      <Host>
        <file-drop target={this.originalId}>
          <i class="drag-icon"></i>
          <strong>Choose {this.multiple ? "files" : "file"} </strong>
          <span>or drag {this.multiple ? "them" : "it"} here.</span>

          <div class="media-preview {this.multiple ? '-stacked' : ''}">
            <slot>
              <input type="file"
                style={{ opacity: "0.01", position: "absolute", "z-index": "-999"}}
                id={this.originalId}
                multiple={this.multiple}
                data-direct-upload-url={this.directupload}
                onChange={this.fileTargetChanged}
                required={this.files.length === 0 && this.required}
              />
              {this.files.length > 0
                ? this.files
                : <input type="hidden" name={this.name} />
              }
            </slot>
          </div>
        </file-drop>
      </Host>
    )
  }

  componentDidLoad() {
    this.fileTarget = this.el.querySelector("input[type=file]")
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
