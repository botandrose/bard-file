import { DirectUpload } from "@rails/activestorage"
import { UploadedFile } from "./uploaded-file"

export default class DirectUploadController {
  uploadedFile: UploadedFile
  input: HTMLInputElement
  file: File
  directUpload: any

  constructor(input, uploadedFile) {
    this.input = input;
    this.file = uploadedFile.file;
    this.directUpload = new DirectUpload(this.file, this.url, this);
    this.uploadedFile = uploadedFile
  }

  start(callback) {
    this.dispatch("start")
    this.directUpload.create(((error, attributes) => {
      if (error) {
        this.dispatchError(error)
      } else {
        this.uploadedFile.value = attributes.signed_id
      }
      this.dispatch("end")
      callback(error)
    }))
  }

  uploadRequestDidProgress(event) {
    const progress = event.loaded / event.total * 100;
    if (progress) {
      this.dispatch("progress", {
        progress: progress
      });
    }
  }
  get url() {
    return this.input.getAttribute("data-direct-upload-url");
  }
  dispatch(name, detail = {} as any) {
    detail.file = this.file;
    detail.id = this.directUpload.id;
    return dispatchEvent(this.input, `direct-upload:${name}`, {
      detail: detail
    });
  }
  dispatchError(error) {
    const event = this.dispatch("error", {
      error: error
    });
    if (!event.defaultPrevented) {
      alert(error);
    }
  }
  directUploadWillCreateBlobWithXHR(xhr) {
    this.dispatch("before-blob-request", {
      xhr: xhr
    });
  }
  directUploadWillStoreFileWithXHR(xhr) {
    this.dispatch("before-storage-request", {
      xhr: xhr
    });
    xhr.upload.addEventListener("progress", (event => this.uploadRequestDidProgress(event)));
  }
}

function dispatchEvent(element: any, type, eventInit = {} as any) {
  const {disabled: disabled} = element;
  const {bubbles: bubbles, cancelable: cancelable, detail: detail} = eventInit;
  const event = document.createEvent("Event") as any;
  event.initEvent(type, bubbles || true, cancelable || true);
  event.detail = detail || {};
  try {
    element.disabled = false;
    element.dispatchEvent(event);
  } finally {
    element.disabled = disabled;
  }
  return event;
}

