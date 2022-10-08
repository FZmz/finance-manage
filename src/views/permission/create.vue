<template>
  <GFormCreator ref="createform" :conf="createConf">
    <!-- 自定义按钮 -->
    <template #default>
      <div class="left">
        <el-button @click="doCreate" type="primary">创建管理员</el-button>
        <el-button @click="doReset">重置</el-button>
      </div>
    </template>
  </GFormCreator>
</template>

<script>
import createConf from "./createFormConf";
export default {
  data() {
    return {
      createConf,
    };
  },
  methods: {
    doCreate() {
      this.$refs.createform.submit((data) => {
        if (data) {
          console.log("验证成功！", data);
        } else {
          console.log("验证失败");
        }
      });
    },
    doReset() {
      this.$refs.createform.reset();
    },
  },
};
</script>

<style></style>
