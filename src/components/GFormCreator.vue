<script>
export default {
  name: "GFormCreator",
  props: {
    conf: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submit() {
      console.log("假数据");
    },
    reset() {
      console.log("执行假的重置");
    },
    renderItem() {
      return <el-input></el-input>;
    },
    renderColums(columns) {
      return columns.map((item) => {
        return (
          <el-col xl={item.colspan} lg={item.colspan} md={12} sm={24} xs={24}>
            <el-form-item label={item.label}>
              {this.renderItem(item)}
            </el-form-item>
          </el-col>
        );
      });
    },
    renderRows(items) {
      return items.map((rowArr) => {
        return <el-row>{this.renderColums(rowArr)}</el-row>;
      });
    },
  },
  render(h) {
    // 解构
    const { title, items } = this.conf;
    // jsx
    return (
      <div class="form-box">
        <h1>{title}</h1>
        {title && <hr />}
        {/* 表单区域 */}
        <el-form label-width="80px">{this.renderRows(items)}</el-form>
        {/* btns 按钮 */}
        <div class="btns">
          {/* 仅仅填dom this.$slots.default */}
          {this.$slots.default}
          {/* 仅仅填dom 给父传递参数 this.$scopedSlots.default(data)*/}
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.btns {
  text-align: center;
}
</style>
