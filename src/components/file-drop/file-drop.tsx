import { Component, Element, Prop, Listen } from '@stencil/core'

@Component({
  tag: 'file-drop',
  styleUrl: 'file-drop.css',
  shadow: false,
})
export class FileDrop {
  @Element() el: HTMLElement

  /**
   * The id of the an input[type=file] to assign dropped files to
   */
  @Prop({ reflect: true, mutable: true, attribute: "for" }) for: string

  private get fileTarget(): HTMLInputElement {
    return document.querySelector<HTMLInputElement>(`#${this.for}`)
  }

  @Listen("click")
  openFilePicker(_event) {
    this.fileTarget.click()
  }

  @Listen("dragover", { passive: false })
  highlight(event) {
    event.preventDefault()
    this.el.classList.add("-dragover")
  }

  @Listen("dragleave", { passive: false })
  unhighlight(_event) {
    this.el.classList.remove("-dragover")
  }

  @Listen("drop", { passive: false })
  drop(event) {
    event.preventDefault()
    this.el.classList.remove("-dragover")
    this.fileTarget.files = event.dataTransfer.files
    const changeEvent = new Event("change", { bubbles: true })
    this.fileTarget.dispatchEvent(changeEvent)
  }
}
