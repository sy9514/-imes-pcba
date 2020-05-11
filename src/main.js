import Vue from 'vue'
import FastClick from 'fastclick'
import Promise from 'promise-polyfill'
import { router } from './config/router'
import store from './store'
import App from './App'
import {
  Dialog,
  Row,
  Col,
  Picker,
  Field,
  Cell,
  CellGroup,
  Button,
  Toast,
  NavBar,
  Tabbar,
  TabbarItem,
  List,
  Panel,
  NoticeBar,
  Tag,
  Popup,
  Notify,
  Icon,
  DropdownMenu,
  DropdownItem,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Divider,
  Uploader,
  PullRefresh
} from 'vant'
Vue.use(Divider)
Vue.use(Row).use(Col)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Button)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Panel)
Vue.use(List)
Vue.use(NoticeBar)
Vue.use(Tag)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Dialog)
Vue.use(Notify)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Uploader)
Vue.use(PullRefresh)


if (!window.Promise) {
  window.Promise = Promise
}

FastClick.attach(document.body)

Vue.config.productionTip = false

var app = new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App),
})

export default app
