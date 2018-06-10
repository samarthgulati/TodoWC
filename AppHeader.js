const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    height: var(--header-ht);
    background: var(--primary);
    color: var(--pri-font-color);
    box-shadow: var(--elevation);

    display: flex;
    align-items: center;
    justify-content: center;
}
input[type="checkbox"] {
    transform-origin: 0% 35%;
    transform: scale(3);
    margin-right: calc(4 * var(--padding));
}
input[type="text"] {
    flex: 0.99;
    background: none;
    border: none;
    border-bottom: 2px solid var(--pri-font-color);
    color: var(--pri-font-color);
    font-size: calc(var(--header-ht) * 0.5);
}
</style>
<input type="checkbox">
<input type="text">
`
export default class AppHeader extends HTMLElement {
  static get is() {
    return 'app-header'
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._checkAll = this.shadowRoot.querySelector('input[type="checkbox"]')
    this._input = this.shadowRoot.querySelector('input[type="text"]')
  }
  _addNew(e) {
      if(e.key !== 'Enter') return
      this.dispatchEvent(new CustomEvent('add-todo-item', {
          composed: true,
          bubbles: true,
          detail: this._input.value
      }))
      this._input.value = ''
  }
  connectedCallback() {
    this._checkAll.addEventListener('change', 
        e => this.dispatchEvent(new CustomEvent('toggle-all', {
            composed: true,
            bubbles: true,
            detail: e.target.checked
        }))
    )
    this._addNew = this._addNew.bind(this)
    this._input.addEventListener('keydown', this._addNew)
  }
}