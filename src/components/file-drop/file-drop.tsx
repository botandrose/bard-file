import { Component, Element, Prop, Listen, Host, h } from '@stencil/core'

@Component({
  tag: 'file-drop',
  styleUrl: 'file-drop.css',
  shadow: true,
})
export class FileDrop {
  @Element() el: HTMLElement

  /**
   * The id of the an input[type=file] to assign dropped files to
   */
  @Prop() target: string

  private get fileTarget(): HTMLInputElement {
    return document.querySelector<HTMLInputElement>(`#${this.target}`)
  }

  @Listen("click")
  openFilePicker(_event) {
    this.fileTarget.click()
  }

  @Listen("dragover")
  highlight(event) {
    event.preventDefault()
    event.stopPropagation()
    this.el.classList.add("-dragover")
  }

  @Listen("dragleave")
  unhighlight(event) {
    event.preventDefault()
    event.stopPropagation()
    this.el.classList.remove("-dragover")
  }

  @Listen("drop")
  drop(event) {
    this.unhighlight(event)
    this.fileTarget.files = event.dataTransfer.files
    this.fileTarget.dispatchEvent(new Event("change"))
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
