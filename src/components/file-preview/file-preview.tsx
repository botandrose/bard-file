import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'file-preview',
  styleUrl: 'file-preview.css',
  shadow: true,
})
export class FilePreview {
  @Prop() src: string
  @Prop() mimetype: string

  render() {
    return (
      <Host class={this.computeClass()}>
        {this.isImage() && <img src={this.src} />}
        {this.isVideo() && <video src={this.src} onClick={toggle} />}
        {this.isOther() && "This media does not offer a preview"}
        <slot></slot>
      </Host>
    );
  }

  private computeClass() {
    if(this.isImage()) return "image-preview"
    if(this.isVideo()) return "video-preview"
    return "missing-preview"
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
