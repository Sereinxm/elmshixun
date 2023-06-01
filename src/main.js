import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from "vue-axios";
import {Icon,Switch ,Button} from "vant";
import "vant/lib/index.css";
import {Tabbar,TabbarItem} from "vant";
import {Rate} from "vant";
import {Dialog} from "vant";
import {Sidebar,SidebarItem} from "vant";
import {Stepper} from "vant";

Vue.use(Icon);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Rate);
Vue.use(Dialog);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Stepper);



Vue.config.productionTip = false


//全局导入axios
Vue.use(VueAxios,axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
