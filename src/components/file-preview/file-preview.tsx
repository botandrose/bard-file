import { Component, Prop, Host, h } from '@stencil/core';
import Mime from 'mime-lite'

@Component({
  tag: 'file-preview',
  styleUrl: 'file-preview.css',
  shadow: true,
})
export class FilePreview {
  @Prop() src: string

  get mimetype(): string {
    const extension = (this.src || "").split(".").at(-1)
    return Mime.getType(extension) || ""
  }

  render() {
    return (
      <Host class={this.computeClass()}>
        {this.isImage() && <img src={this.src} />}
        {this.isVideo() && <video src={this.src} onClick={toggle} />}
        {this.isOther() && "This file does not offer a preview"}
        <slot></slot>
      </Host>
    );
  }

  private computeClass() {
    if(this.isImage()) return "image"
    if(this.isVideo()) return "video"
    return "other"
  }

  private isImage() {
    return this.mimetype.startsWith("image/")
  }

  private isVideo() {
    return this.mimetype.startsWith("video/")
  }

  private isOther() {
    return !this.isImage() && !this.isVideo()
  }
}

const toggle = function() { this.paused ? this.play() : this.pause(); return false }
