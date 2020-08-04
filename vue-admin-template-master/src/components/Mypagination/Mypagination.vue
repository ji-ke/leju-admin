<template>
  <div class="mypagination">
    <el-row style="margin-top: 20px;">
      <el-col :span="12" :offset="6">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.start"
          :page-sizes="page.sizes"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          background
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Mypagination",
  props: {
      page: {
          type: Object,
          required: true,
          default: {}
      }
  },
  data() {
    return {};
  },
  methods: {
    // 方法
    sizeChange(val) {
        this.$emit('size-change',val)
    },
    currentChange(val) {
         this.$emit('current-change',val)
    },
  },
  computed: {
    // 计算属性
  },
  created() {
    // ajax初始化页面
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.mypagination {
}
</style>
