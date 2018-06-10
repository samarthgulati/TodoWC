const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  display: flex;
  align-items: center;
  width: calc(100% - 2 * var(--padding));
  height: 3rem;
  padding: var(--padding);
  border-bottom: 2px solid hsla(0,0%,0%,0.15);
}
:host(.hidden) {
    display: none;
}
input {
    transform-origin: 0% 35%;
    transform: scale(2);
    margin-right: 2rem;
}
input:checked + [name="content"]::slotted(*) {
  --text-decoration: line-through;
  pointer-events: none;
}
</style>
<input type="checkbox">
<slot name="content"></slot>
`
export default class TodoItem extends HTMLElement {
  static get is() {
    return 'todo-item'
  }
  static get observedAttributes() {
    return ['completed']
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'completed':
        newValue = this.hasAttribute('completed')
        if(this._checkbox.checked !== newValue)
            this._checkbox.checked = newValue
      break
    }
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._checkbox = this.shadowRoot.querySelector('input')
  }
  _updateCompleted() {
    if(this._checkbox.checked) {
        this.setAttribute('completed', true)
    } else {
        this.removeAttribute('completed')
    }
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: this._checkbox.checked
    }))
  }
  connectedCallback() {
    this._updateCompleted = this._updateCompleted.bind(this)
    this._checkbox.addEventListener('change', this._updateCompleted)
  }
}