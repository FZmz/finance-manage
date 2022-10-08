export default Object.freeze({
  // 提升性能(不需要响应式)
  // title: "123",
  items: [
    [{ type: "input", label: "用户名", colspan: 12, key: "username" }],
    [{ type: "input", label: "密码", colspan: 12, key: "password" }],
    [{ type: "input", label: "确认密码", colspan: 12, key: "confirmPwd" }],
  ],
  rules: {
    username: [{ require: true }],
    password: [{ required: true }],
  },
});
