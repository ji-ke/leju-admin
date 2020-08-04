<template>
  <div class="dashboard-container">
    <div class="headcard">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card :body-style="{ padding: '20px' }">
            <!-- card body -->
            <div class="num">用户数量:{{ numObj.userCount }}</div>
            <div class="desc">今日新增</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '20px' }">
            <div class="num">产品数量:{{ numObj.productCount }}</div>
            <div class="desc">今日新增</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '20px' }">
            <div class="num">订单数量:{{ numObj.orderCount }}</div>
            <div class="desc">今日新增</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '20px' }">
            <div class="num">退单数量:{{ numObj.backCount }}</div>
            <div class="desc">今日新增</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import homePageApi from "@/api/homepage";

export default {
  name: "Dashboard",
  data() {
    return {
      numObj: {},
      dayList: [],
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    getBaseInfo() {
      homePageApi.baseInfo().then((res) => {
        this.numObj = res.data;
        this.dayList = res.data.orderByDay;
      });
    },
  },
  created() {
    this.getBaseInfo();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
