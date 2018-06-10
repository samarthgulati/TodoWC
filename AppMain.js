const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  height: calc(100vh - var(--header-ht) - var(--footer-ht));
  display: flex;
  flex-direction: column;
  align-items: center;
}
main {
  width: 100%;
  overflow-y: auto;
}
</style>
<main>
  <todo-item completed>
    <editable-input value="2123asdfar" slot="content"></editable-input>
  </todo-item>
</main>
`
export default class AppMain extends HTMLElement {
  static get is() {
    return 'app-main'
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._main = this.shadowRoot.querySelector('main')
  }
  get completed() {
    return this._main.querySelectorAll('todo-item[completed]')
  }
  get all() {
    return this._main.querySelectorAll('todo-item')
  }
  get active() {
    return this._main.querySelectorAll('todo-item:not([completed])')
  }
  addTodo(content) {
    const todo = document.createElement('todo-item')
    const editableInput = document.createElement('editable-input')
    editableInput.setAttribute('value', content)
    editableInput.setAttribute('slot', 'content')
    todo.appendChild(editableInput)
    this._main.appendChild(todo)
  }
  connectedCallback() {
   
  }
}