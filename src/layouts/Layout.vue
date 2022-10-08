<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        default-active="2"
        router
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <g-aside-menu
          v-for="(item, index) in menus"
          :key="index"
          :item="item"
        ></g-aside-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <GBreadcrumb />
        </div>
        <div class="right">
          <GDropdown
            @command="doCommand"
            :title="'admin'"
            :items="[{ key: 'logout', label: '退出' }]"
          />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Layout",
  computed: {
    ...mapGetters({
      menus: "user/getUserMenus",
    }),
  },
  methods: {
    ...mapActions({
      doLogout: "user/doLogout",
    }),
    async doCommand(e) {
      if (e === "logout") {
        await this.doLogout();
        // 外部没有依赖里面的值
        // 依赖的是执行顺序
        window.location.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  height: 100%;
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-container {
  height: 100%;
}
</style>
