<template>
  <div class="chargeback">
    <div class="back-search">
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>条件查询</span>
        </div>
        <!-- card body -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="search.name" placeholder="用户名"></el-input>
          </el-col>
          <el-col :span="6">
            <!-- <el-input v-model="search.name" placeholder="用户名"></el-input> -->

            <el-select v-model="search.name" placeholder="订单状态">
              <el-option
                v-for="(value, key) in orderStstus"
                :key="key"
                :label="value"
                :value="value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <!-- <el-input v-model="search.name" placeholder="是否关闭"></el-input> -->
            <el-select v-model="search.statusend" placeholder="是否关闭">
              <el-option label="已关闭" value="1"> </el-option>
              <el-option label="正在进行" value="0"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <!-- <template slot-scope="scoped"> -->

            <el-button type="default" size="mini" @click="backReset"
              >重置</el-button
            >
            <el-button type="primary" size="mini" @click="backSearch"
              >搜索</el-button
            >
            <!-- </template> -->
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="back-list">
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <span><!-- card title --></span>
        </div>
        <!-- card body -->
        <el-table :data="chargebackList" border>
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="orderId" label="订单编号" width="200">
          </el-table-column>
          <el-table-column prop="addtime" label="申请时间" width="200">
          </el-table-column>
          <el-table-column prop="username" label="用户账号" width="200">
          </el-table-column>
          <el-table-column label="订单金额" width="200">
            <template slot-scope="scoped">
              <div>{{ scoped.row.order_price | money("$:") }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="订单数量" width="200">
          </el-table-column>
          <el-table-column label="是否关闭" width="200">
            <template slot-scope="scoped">
              <div>{{ scoped.row.status == '0' ? "正在进行" : "已关闭" }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="endtime" label="完成时间" width="200">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scoped">
              <el-button type="primary" @click="backDetail(scoped.row.backId)"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
//导入api
import chargebackApi from "@/api/chargeback";
export default {
  name: "Chargeback",
  data() {
    return {
      chargebackList: [],
      search: {},
    };
  },
  methods: {
    // 方法
    getChargebackList() {
      chargebackApi.orderBackList().then((res) => {
        this.chargebackList = res.data.data.list;
      });
    },
    backReset() {
      this.search = {};
    },
    backSearch() {},
    backDetail(backId) {
      // console.log(backId)
      this.$router.push({ name: "BackDetail",params: {backId} });
    },
  },
  computed: {
    // 计算属性
    orderStstus() {
      return {
        "0": "等待处理",
        "1": "正在处理",
        "2": "已处理",
        "9": "拒绝退货",
      };
    },
  },
  created() {
    // ajax初始化页面
    this.getChargebackList();
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.chargeback {
}
</style>
