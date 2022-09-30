<template>
  <div class="login-container">
    <div class="login-wrapper center">
      <h1>信贷管理系统</h1>
      <el-form ref="userform" :rules="rules" :model="user">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
            v-model="user.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="text"
            placeholder="请输入密码"
            prefix-icon="el-icon-s-goods"
            v-model="user.password"
          >
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="submit()">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { login } from "@/apis/user";
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    return {
      user: {
        username: "admin",
        password: "approve123456.",
      },
      rules: {
        username: [
          {
            validator: checkUsername,
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations({
      changeLogin: "user/changeIsLogin",
      changeUserInfo: "user/changeUserInfo",
    }),
    // 登录方法
    async doLogin(user) {
      let [res, err] = await login(user);
      if (err) {
        this.$message({
          type: "error",
          message: '请求异常' + err.message,
        });
      }
      if (res.data.code === 20000) {
        // 改变登录状态
        this.changeLogin(true);
        // 改变用户信息
        this.changeUserInfo({
          username: user.username,
        });
        this.$router.push(this.$route.query.redirect || "/");
      } else {
        console.log(res);
        this.$message.error('登陆失败！！！')
      }
    },
    submit() {
      let that = this;
      this.$refs.userform.validate((valid) => {
        if (valid) {
          that.doLogin(that.user);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: url(@/assets/bg2.jpg) center center no-repeat;
  background-size: 100% 100%;
  .login-wrapper {
    width: 502px;
    padding: 40px 30px;
    background-color: #fff;
    h1 {
      text-align: center;
    }
    .el-form {
      .el-form-item:nth-of-type(2) {
        margin-top: 30px;
      }
    }
    .el-button {
      display: inline-block;
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
