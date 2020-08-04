<template>
  <div class="order">
    <div class="order-search">
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>条件查询</span>
        </div>
        <!-- card body -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="search.username" placeholder="用户名"></el-input>
          </el-col>
          <el-col :span="6">
            <!-- <el-input v-model="search.status" placeholder="订单状态"></el-input> -->
            <el-select v-model="search.status" placeholder="订单状态">
              <el-option
                v-for="(value, key) in orderStatusObj"
                :key="key"
                :label="value"
                :value="key"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <!-- <el-input v-model="search.statusend" placeholder="是否关闭"></el-input> -->
            <el-select v-model="search.statusend" placeholder="是否关闭">
              <el-option label="已关闭" value="1"> </el-option>
              <el-option label="正在进行" value="0"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="default" size="mini" @click="orderReset"
              >重置</el-button
            >
            <el-button type="primary" size="mini" @click="orderSearch"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="order-list">
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <el-button type="primary" size="mini" @click="orderAdd"
            >添加</el-button
          >
        </div>
        <!-- card body -->
        <el-table :data="orderList" border stripe>
          <el-table-column type="index" width="50" fixed> </el-table-column>
          <el-table-column prop="orderId" label="订单编号" width="200">
          </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="200">
          </el-table-column>
          <el-table-column prop="username" label="用户账号" width="200">
          </el-table-column>
          <el-table-column label="订单金额" width="200">
            <template slot-scope="scoped">
              <div>{{ scoped.row.price | money("$:") }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="订单数量" width="200">
          </el-table-column>
          <el-table-column label="订单状态" width="200">
            <template slot-scope="scoped">
              <div v-if="scoped.row.orderStatus == 1">
                已付款: {{ scoped.row.orderStatus }}
              </div>
              <div v-else-if="scoped.row.orderStatus == 2">
                已发货: {{ scoped.row.orderStatus }}
              </div>
              <div v-else-if="scoped.row.orderStatus == 3">
                已收货: {{ scoped.row.orderStatus }}
              </div>
              <div v-else>申请退款: {{ scoped.row.orderStatus }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="payType" label="支付类型" width="200">
          </el-table-column>
          <el-table-column label="是否关闭" width="200">
            <template slot-scope="scoped">
              <!-- {{scoped.row.statusend == 0 ? '已关闭' : '正在进行'}} -->
              <div v-if="scoped.row.statusend == 1" style="color: red;">
                已关闭
              </div>
              <div v-else style="color: green;">正在进行</div>
            </template>
          </el-table-column>
          <el-table-column prop="doneTime" label="完成时间" width="200">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scoped">
              <el-button type="primary" @click="orderview(scoped.row.orderId)"
                >查看订单</el-button
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
import orderApi from "@/api/order";
export default {
  name: "Order",
  data() {
    return {
      orderList: [],
      search: {},
      orderStatusObj: {
        "0": "未付款",
        "1": "已付款",
        "2": "已发货",
        "3": "已收货",
        "9": "申请退款",
      },
    };
  },
  methods: {
    // 方法
    getOrderList() {
      let data = this.search;
      orderApi.orderList(data).then((res) => {
        this.orderList = res.data.data.list;
      });
    },
    orderReset() {
      this.search = {};
    },
    orderSearch() {
      this.getOrderList();
    },
    orderAdd() {},
    orderview(orderId) {
      this.$router.push({ name: "orderDetail", params: { orderId } });
    },
  },
  computed: {
    // 计算属性
  },
  created() {
    // ajax初始化页面
    this.getOrderList();
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.order {
}
</style>
