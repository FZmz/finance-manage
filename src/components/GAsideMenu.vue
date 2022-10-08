<template>
  <el-menu-item v-if="!item.children" :index="item.path">
    <!-- <i class="el-icon-setting"></i> 可以通过配置传递icon -->
    <span slot="title">{{ item?.meta?.title }}</span>
  </el-menu-item>
  <el-submenu v-else :index="item.path">
    <template slot="title">{{ item?.meta?.title }}</template>
    <g-aside-menu
      v-for="(item, index) in item.children"
      :level="level + 1"
      :key="index"
      :item="item"
    ></g-aside-menu>
  </el-submenu>
</template>

<script>
export default {
  name: "GAsideMenu", // 递归组件的核心
  props: {
    level: {
      type: Number,
      default: () => 1,
    },
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
