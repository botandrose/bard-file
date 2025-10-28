import { Component, Element, Prop, State, Listen, Host, h } from '@stencil/core';
import FormController from "./form-controller"
import { AttachmentFile } from "../attachment-file/attachment-file"
import { arrayRemove } from "../../utils/utils"
import '@botandrose/file-drop'

@Component({
  tag: 'input-attachment',
  styleUrl: 'input-attachment.css',
  shadow: true,
})
export class InputAttachment {
  @Element() el: HTMLElement

  @Prop() name: string
  @Prop() directupload: string
  @Prop() multiple: boolean = false

  @Prop() required: boolean = false
  @Prop() accepts: string
  @Prop() max: number
  @Prop() preview: boolean = true
  @Prop() disabled: boolean = false

  @State() _forceUpdate: boolean = false
  forceUpdate() { this._forceUpdate = !this._forceUpdate }

  form: HTMLFormElement
  internals: ElementInternals
  fileInput: HTMLInputElement
  _files: Array<any> = []

  constructor() {
    this.internals = (this.el as any).attachInternals()
  }

  componentWillLoad() {
    this.form = this.internals.form
    if (this.form) {
      this.form.addEventListener("reset", () => this.reset())
      FormController.instance(this.form)
    }
    const existingFiles = Array.from(this.el.children).filter(e => e.tagName == "ATTACHMENT-FILE");
    if(existingFiles.length > 0) this.files = existingFiles
  }

  // Methods

  get files() {
    return this._files
  }

  set files(val) {
    this._files = val
    if(!this.multiple) this._files = this._files.slice(-1)
    this.forceUpdate()
    this.fireChangeEvent()
  }

  get value() {
    return this.files.map(e => e.value)
  }

  set value(val) {
    const newValue = val || []
    if(JSON.stringify(this.value) !== JSON.stringify(newValue)) { // this is insane. javascript is fucking garbage.
      this.files = newValue.map(signedId => Object.assign(new AttachmentFile(), {
        name: this.name,
        preview: this.preview,
        signedId,
      }))
    }
  }

  updateFormValue() {
    if (!this.name || !this.internals?.setFormValue) return
    const formData = new FormData()
    formData.set(this.name, JSON.stringify(this.value))
    this.internals.setFormValue(formData)
  }

  reset() {
    this.value = []
  }

  @Listen("change")
  fileTargetChanged(event) {
    if(event.target !== this.fileInput) return
    this.files.push(...Array.from(this.fileInput.files).map(file => Object.assign(new AttachmentFile(), {
      name: this.name,
      preview: this.preview,
      url: this.directupload,
      accepts: this.accepts,
      max: this.max,
      file,
    })))
    this.files = this.files
    this.fileInput.value = null
  }

  @Listen("attachment-file:remove")
  removeUploadedFile(event) {
    arrayRemove(this.files, event.detail)
    this.files = this.files
  }

  @Listen("direct-upload:end")
  fireChangeEvent() {
    requestAnimationFrame(() => {
      this.updateFormValue()
      this.el.dispatchEvent(new Event("change", { bubbles: true }))
    })
  }

  // Rendering

  render() {
    return (
      <Host>
        <input
          ref={el => this.fileInput = el}
          type="file"
          multiple={this.multiple}
          accept={this.accepts}
          required={this.required && this.files.length === 0}
          disabled={this.disabled}
          style={{
            opacity: '0.01',
            width: '1px',
            height: '1px',
            zIndex: '-999'
          }}
        />
        <file-drop onClick={() => this.fileInput?.click()}>
          <p part="title">
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
    const wrapper = document.createElement("div")
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild)
    }
    this.files.forEach(file => wrapper.appendChild(file))

    let needsUpdate = false
    if (wrapper.children.length !== this.el.children.length) {
      needsUpdate = true
    } else {
      for (let i = 0; i < wrapper.children.length; i++) {
        if (wrapper.children[i] !== this.el.children[i]) {
          needsUpdate = true
          break
        }
      }
    }

    if (needsUpdate) {
      while (this.el.firstChild) {
        this.el.removeChild(this.el.firstChild)
      }
      this.el.appendChild(wrapper)
    }

    this.updateFormValue()
  }

  // Validations

  checkValidity() {
    if (this.required && this.files.length === 0) {
      return false
    }
    return true
  }

  setCustomValidity(msg: string) {
    this.internals.setValidity(msg ? { customError: true } : {}, msg, this.fileInput)
  }

  reportValidity() {
    return this.internals.reportValidity()
  }

  get validationMessage() {
    return this.internals.validationMessage
  }
}
