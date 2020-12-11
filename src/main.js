import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import { MessageBox, Message, FormItem, Form, Dialog, Row, Input, Button, Tag, Pagination, TableColumn, Table, Card, BreadcrumbItem, Breadcrumb, MenuItemGroup, MenuItem, Submenu, Menu, Main, Aside, Container } from 'element-ui'

Vue.use(FormItem)
Vue.use(Form)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Input)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Card)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)

marked.setOptions({
  renderer: marked.Renderer(),
  gfm: true,
  pedantic: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return hljs.highlightAuto(code).value
  }
})

Vue.prototype.$marked = marked
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
