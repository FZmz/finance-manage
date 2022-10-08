import GAsideMenu from "@/components/GAsideMenu.vue";
import GBreadcrumb from "@/components/GBreadcrumb.vue";
import GDropdown from "@/components/GDropdown.vue";
import GFormCreator from "@/components/GFormCreator.vue";

// require.context('../components/xxx',true,/\.vue$/) 自动引入

function install(Vue) {
  Vue.component(GAsideMenu.name, GAsideMenu);
  Vue.component(GBreadcrumb.name, GBreadcrumb);
  Vue.component(GDropdown.name, GDropdown);
  Vue.component(GFormCreator.name, GFormCreator);
}
export default {
  install,
};
