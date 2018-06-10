'use strict'

import AppHeader from './AppHeader.js'
import AppMain from './AppMain.js'
import AppFooter from './AppFooter.js'
import App from './AppWC.js'
import TodoItem from './TodoItem.js'
customElements.define(TodoItem.is, TodoItem)
customElements.define(App.is, App)
customElements.define(AppFooter.is, AppFooter)
customElements.define(AppMain.is, AppMain)
customElements.define(AppHeader.is, AppHeader)