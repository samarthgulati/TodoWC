const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--pri-font-color);
    color: var(--primary);
    height: var(--footer-ht);
    padding: var(--padding);
}
p.hidden, a.hidden {
  visibility: hidden;
}
</style>
<p class="hidden"><span></span> item left</p>
<section>
  <button>All</button>
  <button>Active</button>
  <button>Completed</button>
</section>
<a class="hidden" href="">Clear Completed</a>
`
export default class AppFooter extends HTMLElement {
  static get is() {
    return 'app-footer'
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._tabs = this.shadowRoot.querySelector('section')
  }
  _dispatchFilterItems(e) {
    if(e.target.localName !== 'button') return
    this.dispatchEvent(new CustomEvent('filter-items', {
      composed: true,
      bubbles: true,
      detail: e.target.textContent.toLowerCase()
    }))
  }
  connectedCallback() {
    this._dispatchFilterItems = this._dispatchFilterItems.bind(this)
    this._tabs.addEventListener('click', this._dispatchFilterItems)
  }
}