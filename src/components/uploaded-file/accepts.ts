import { UploadedFile } from './uploaded-file'

export default class Accepts {
  uploadedFile: UploadedFile

  constructor(uploadedFile) {
    this.uploadedFile = uploadedFile
  }

  get errors() {
    if(this.#errors) return this.#errors
    this.#errors = []

    const accepts = this.uploadedFile.accepts ? this.uploadedFile.accepts.split(/,\s*/) : []
    const regexes = accepts.map(accept => {
      const regex = this.regexMap[accept]
      if(!regex) console.error(`Unknown accepts type: ${accept}`)
      return regex
    }).filter(r => !!r) // discard not found

    if(regexes.length > 0 && !regexes.some(regex => regex.test(this.uploadedFile.mimetype))) {
      this.#errors.push(`Must be a ${this.joinWords(accepts)}.`)
    }
    return this.#errors
  }

  #errors: Array<string>

  private get regexMap() {
    return {
      image: new RegExp("^image/.+$"),
      video: new RegExp("^video/.+$"),
      pdf: new RegExp("^application/pdf$"),
    }
  }

  private joinWords(words) {
    if(words.length >= 3) {
      return (words.slice(0, -1) + [`or ${words.at(-1)}`]).join(", ")
    } else {
      return words.join(" or ")
    }
  }
}

