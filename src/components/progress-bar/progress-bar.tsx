import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'progress-bar',
  styleUrl: 'progress-bar.css',
  shadow: true,
})
export class ProgressBar {
  @Prop() percent: number

  render() {
    return (
      <Host>
        <div class="bar" style={{ width: `${this.percent}%` }}></div>
        <slot></slot>
      </Host>
    )
  }
}
