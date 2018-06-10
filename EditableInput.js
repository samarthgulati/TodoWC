'use strict'
const editableInputTemplate = document.createElement('template')
editableInputTemplate.innerHTML = `
<style>
:host {
  display: inline-flex;
}
textarea {
  border: none;
  padding: 0;
  background: var(--background);
  font-weight: var(--font-weight);
  font-size: var(--font-size);
  font-family: var(--font-family);
  width: var(--width, 100%);
  min-height: var(--min-height);
  text-decoration: var(--text-decoration);
  resize: none;
}
textarea[disabled] {
  pointer-events: none;
  color: inherit;
}
::slotted(*) {
  display: none;
}
</style>
<textarea rows="1" disabled></textarea>
`
class EditableInput extends HTMLElement {
  static get is() {
    return 'editable-input'
  }
  static get observedAttributes() {
    return ['placeholder', 'style', 'value']
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(editableInputTemplate.content.cloneNode(true))
    this._textarea = this.shadowRoot.querySelector('textarea')
    EditableInput.observedAttributes.forEach(attr => {
      if(this.hasAttribute(attr))
        this.attributeChangedCallback(attr, null, this.getAttribute(attr)) 
    })
  }
  _focus() {
    this._textarea.removeAttribute('disabled')
    this._textarea.focus()
    this._textarea.select()
  }
  _disable(e) {
    e.stopPropagation()
    this._textarea.setAttribute('disabled', true)
    this.dispatchEvent(new CustomEvent('blur', {
        composed: true, 
        bubbles: true,
        detail: this._textarea.value
    }))
  }
  _keyboardFocus(e) {
    if(e.key !== 'Enter') return
    e.preventDefault()
    this._focus()
  }
  _resize() {
    this._textarea.style.height = 'auto'
    this._textarea.style.height = `${this._textarea.scrollHeight}px`
  }
  connectedCallback() {
    this._focus = this._focus.bind(this)
    this._disable = this._disable.bind(this)
    this._keyboardFocus = this._keyboardFocus.bind(this)
    this._resize = this._resize.bind(this)
    
    this.addEventListener('dblclick', this._focus)
    this.addEventListener('keydown', this._keyboardFocus)
    this._textarea.addEventListener('blur', this._disable)
    this._textarea.addEventListener('input', this._resize)
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      if(this._textarea.value !== newValue)
        this._textarea.value = newValue
      return
    }
    this._textarea.setAttribute(name, newValue)
  }
}
window.customElements.define(EditableInput.is, EditableInput)
