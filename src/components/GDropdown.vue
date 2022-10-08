<template>
  <el-dropdown @command="$emit('command',$event)">
    <span class="el-dropdown-link">
      {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in items"
        :key="index"
        :command="item.key"
        >{{ item.label }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "GDropdown",
  props: {
    title: {
      required: true,
      type: String,
    },
    items: {
      required: true,
      type: Array,
    },
  },
  methods:{

  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #000;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
