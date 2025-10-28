import DirectUploadController from "../attachment-file/direct-upload-controller"

export default class FormController {
  static instance(form) {
    return form.inputAttachmentFormController ||= new FormController(form)
  }

  progressContainerTarget: HTMLElement
  dialog: HTMLDialogElement

  element: HTMLFormElement
  progressTargetMap: {}
  controllers: Array<DirectUploadController>
  submitted: boolean
  processing: boolean
  errors: boolean

  constructor(form) {
    this.element = form
    this.progressTargetMap = {}
    this.controllers = []
    this.submitted = false
    this.processing = false
    this.errors = false

    this.element.insertAdjacentHTML("beforeend",
      `<dialog id="form-controller-dialog">
        <div class="direct-upload-wrapper">
          <div class="direct-upload-content">
            <h3>Uploading your media</h3>
            <div id="progress-container"></div>
          </div>
        </div>
      </dialog>`)

    this.dialog = this.element.querySelector("#form-controller-dialog")
    this.progressContainerTarget = this.dialog.querySelector("#progress-container")

    if(this.element.dataset.remote !== "true" && (this.element.dataset.turbo == "false" || !(window as any).Turbo?.session?.enabled)) {
      this.element.addEventListener("submit", event => this.submit(event))
    }
    window.addEventListener("beforeunload", event => this.beforeUnload(event))

    this.element.addEventListener("direct-upload:initialize", event => this.init(event))
    this.element.addEventListener("direct-upload:start", event => this.start(event))
    this.element.addEventListener("direct-upload:progress", event => this.progress(event))
    this.element.addEventListener("direct-upload:error", event => this.error(event))
    this.element.addEventListener("direct-upload:end", event => this.end(event))

    this.element.addEventListener("attachment-file:remove", event => this.removeUploadedFile(event))
  }

  beforeUnload(event) {
    if(this.processing) {
      event.preventDefault()
      return (event.returnValue = "")
    }
  }

  submit(event) {
    event.preventDefault()
    this.submitted = true
    this.startNextController()
    if(this.processing) {
      this.dialog.showModal()
    }
  }

  startNextController() {
    if(this.processing) return

    const controller = this.controllers.shift()
    if(controller) {
      this.processing = true
      this.setInputAttachmentsDisabled(true)
      controller.start(error => {
        if(error) {
          this.setInputAttachmentsDisabled(false)
        }
        this.processing = false
        this.startNextController()
      })
    } else {
      this.submitForm()
    }
  }

  submitForm() {
    if(this.submitted) {
      this.setInputAttachmentsDisabled(true)
      window.setTimeout(() => { // allow other async tasks to complete
        this.element.submit()
      }, 10)
    }
  }

  setInputAttachmentsDisabled(disabled: boolean) {
    Array.from(this.element.querySelectorAll("input-attachment"))
      .forEach((el: any) => {
        el.disabled = disabled
      })
  }

  init(event) {
    const { id, file, controller } = event.detail

    this.progressContainerTarget.insertAdjacentHTML("beforebegin", `
      <progress-bar id="direct-upload-${id}" class="direct-upload--pending">${file.name}</progress-bar>
    `)
    const progressTarget = document.getElementById(`direct-upload-${id}`)
    this.progressTargetMap[id] = progressTarget

    this.controllers.push(controller)
    this.startNextController()
  }

  start(event) {
    this.progressTargetMap[event.detail.id].classList.remove("direct-upload--pending")
  }

  progress(event) {
    const { id, progress } = event.detail
    this.progressTargetMap[id].percent = progress
  }

  error(event) {
    event.preventDefault()
    const { id, error } = event.detail
    const target = this.progressTargetMap[id]
    target.classList.add("direct-upload--error")
    target.title = error
  }

  end(event) {
    this.progressTargetMap[event.detail.id].classList.add("direct-upload--complete")
  }

  removeUploadedFile(event) {
    const uploadedFile = event.detail
    const id = uploadedFile.controller?.directUpload?.id
    if(id) {
      document.getElementById(`direct-upload-${id}`).remove()
      delete this.progressTargetMap[id]
    }
  }
}


