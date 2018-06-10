const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    --header-ht: 4rem;
    --footer-ht: 2rem;
    --primary: goldenrod;
    --pri-font-color: white;
    --color: #232323;
    --padding: 0.5rem;
    --bgd: #efefef;
    --shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --elevation: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    --border-radius: 0.4rem;
    background: var(--bgd);
    height: 100vh;
    width: 100vw;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: flex;
    flex-direction: column;
}
</style>
<app-header></app-header>
<app-main></app-main>
<app-footer></app-footer>
`
export default class App extends HTMLElement {
  static get is() {
    return 'app-wc'
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._main = this.shadowRoot.querySelector('app-main')
  }
  _toggleAll() {
    const completed = this._main.completed
    const all = this._main.all
    if(completed.length === all.length) {
      completed.forEach(item => item.removeAttribute('completed'))
    } else {
      all.forEach(item => item.setAttribute('completed', true))
    }
  }
  _filterItems(e) {
    if(e.detail === 'all') {
      this._main.all.forEach(i => i.classList.remove('hidden'))
    } else {
      this._main.all.forEach(i => i.classList.add('hidden'))
      this._main[e.detail].forEach(i => i.classList.remove('hidden'))
    }
  }
  connectedCallback() {
    this._toggleAll = this._toggleAll.bind(this)
    this._filterItems = this._filterItems.bind(this)
    this.addEventListener('add-todo-item', e => this._main.addTodo(e.detail))
    this.addEventListener('toggle-all', this._toggleAll)
    this.addEventListener('filter-items', this._filterItems)
  }
}