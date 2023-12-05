# uploaded-file



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type     | Default      |
| ------------------- | -------------------- | ----------- | -------- | ------------ |
| `accepts`           | `accepts`            |             | `string` | `undefined`  |
| `file`              | --                   |             | `File`   | `undefined`  |
| `filename`          | `filename`           |             | `string` | `undefined`  |
| `filetype`          | `filetype`           |             | `string` | `undefined`  |
| `max`               | `max`                |             | `number` | `undefined`  |
| `name`              | `name`               |             | `string` | `undefined`  |
| `percent`           | `percent`            |             | `number` | `100`        |
| `size`              | `size`               |             | `number` | `undefined`  |
| `src`               | `src`                |             | `string` | `undefined`  |
| `state`             | `state`              |             | `string` | `"complete"` |
| `uid`               | `uid`                |             | `number` | `undefined`  |
| `validationMessage` | `validation-message` |             | `string` | `undefined`  |
| `value`             | `value`              |             | `string` | `undefined`  |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `uploaded-file:remove` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [uploaded-file](.)

### Depends on

- [uploaded-file](.)
- [progress-bar](../progress-bar)
- [file-preview](../file-preview)

### Graph
```mermaid
graph TD;
  uploaded-file --> uploaded-file
  style uploaded-file fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
