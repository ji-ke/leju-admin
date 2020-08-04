<template>
  <div class="orderDetail">
    <div class="detail-step">
      <el-steps :active="active" finish-status="success">
        <el-step title="未付款" :description="orderBaseInfo.addTime"></el-step>
        <el-step title="已付款" :description="orderBaseInfo.payTime"></el-step>
        <el-step title="已发货" :description="orderBaseInfo.sendTime"></el-step>
        <el-step
          title="申请退货"
          v-if="orderBaseInfo.orderStatus == 8"
          :description="orderBaseInfo.backTime"
        ></el-step>
        <el-step
          title="已验货"
          :description="orderBaseInfo.receiveTime"
        ></el-step>
        <el-step title="已关闭" :description="orderBaseInfo.doneTime"></el-step>
      </el-steps>
    </div>
    <div class="detail-info">
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>当前订单状态:</span>
          <span v-if="orderBaseInfo.statusend == 0" style="color: #0ff;"
            >正在进行...</span
          >
          <span v-else style="color: #f00;">已关闭</span>
        </div>
        <!-- card body -->
        <div class="baseinfo">
          <div>基本信息</div>
          <div>
            <el-row>
              <el-col v-for="(value, key) in baseInfo" :key="key" :span="4">
                <div class="key">
                  <span>{{ key }}</span>
                </div>
                <div class="value">
                  <span>{{ value }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="userInfo">
          <div>收货人信息</div>
          <div>
            <el-row>
              <el-col :span="6" v-for="(value, key) in userInfo" :key="key">
                <div class="key">{{ key }}</div>
                <div class="value">
                  <span>{{ value }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="productInfo">
          <div>商品信息</div>
          <div>
            <el-table :data="orderDetailList" border stripe>
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column width="200" label="商品图片">
                <template slot-scope="scoped">
                  <img
                    :src="scoped.row.cover_img"
                    style="height: 120px; width: 120px;"
                    alt=""
                  />
                </template>
              </el-table-column>
              <el-table-column width="200" label="商品名称">
                <template slot-scope="scoped">
                  <div>{{ scoped.row.gname }}</div>

                  <div>
                    <span>品牌:</span>
                    <span>{{ scoped.row.brandName }}</span> |
                    <span>{{ scoped.row.brandEname }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="200" label="价格货号">
                <template slot-scope="scoped">
                  <div>
                    <span> 价格:</span>
                    <span>{{ scoped.row.price | money }}</span>
                  </div>

                  <div>
                    <span>货号:</span>
                    <span> {{ scoped.row.sku_code }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="200" prop="" label="型号">
              </el-table-column>
              <el-table-column width="200" prop="color_text" label="是否退货">
                <template slot-scope="scoped">
                  <div v-if="!scoped.row.backId">否</div>
                  <div v-if="scoped.row.backId" style="color: #f00;">是</div>
                </template>
              </el-table-column>
              <el-table-column width="200" prop="count" label="数量">
              </el-table-column>
              <el-table-column width="200" label="小计">
                <!-- {{ totalPrice | money }} -->
                <template slot-scope="scoped">
                  <div>{{ (scoped.row.price * scoped.row.count) | money }}</div>
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <el-col :span="4" :offset="20"
                >合计:{{ totalPrice | money }}</el-col
              >
            </el-row>
          </div>
        </div>
        <div class="feeInfo">
          <div>费用信息</div>
          <div>
            <el-row>
              <el-col
                :span="6"
                v-for="(value, key, index) in feeInfo"
                :key="index"
              >
                <div class="key">{{ key }}</div>
                <div class="value">{{ value }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="otherInfo">
          <div>其它信息</div>
          <div>
            <el-row>
              <el-col
                :span="6"
                v-for="(value, key, index) in otherInfo"
                :key="index"
              >
                <div class="key">{{ key }}</div>
                <div class="value">{{ value }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import orderApi from "@/api/order";
export default {
  name: "OrderDetail",
  data() {
    return {
      active: 1,
      orderId: null,
      orderDetailList: [],
      orderBaseInfo: {},
      orderUserInfo: {},
    };
  },
  methods: {
    // 方法
    getOrderDetail() {
      // console.log(this.$route.params.orderId)
      let data = {
        orderId: this.orderId,
      };
      orderApi.orderDetail(data).then((res) => {
        // console.log(res)
        this.orderDetailList.push(res.data.data[0]);
        // console.log(this.orderDetailList)
      });
    },
    getOrderUserInfo() {
      let data = {
        orderId: this.orderId,
      };
      orderApi.orderUserInfo(data).then((res) => {
        // console.log(res);
        this.orderUserInfo = res.data.data;
        // console.log(this.orderUserInfo)
        // console.log(1)
      });
    },
    getorderBaseInfo() {
      let data = {
        orderId: this.orderId,
      };
      orderApi.orderList(data).then((res) => {
        this.orderBaseInfo = res.data.data.list[0];
        // console.log(this.orderBserInfo)
      });
    },
  },
  computed: {
    // 计算属性
    baseInfo() {
      return {
        订单编号: this.orderBaseInfo.orderId,
        用户账号: this.orderBaseInfo.username,
        订单金额: this.orderBaseInfo.price,
        订单数量: this.orderBaseInfo.count,
        订单状态: this.orderBaseInfo.orderStatus,
        付款时间: this.orderBaseInfo.payTime,
        下单时间: this.orderBaseInfo.addTime,
        发货时间: this.orderBaseInfo.sendTime,
        收货时间: this.orderBaseInfo.receiveTime,
        退单时间: this.orderBaseInfo.backTime,
        结束时间: this.orderBaseInfo.doneTime,
        其他: "",
      };
    },
    userInfo() {
      return {
        收货人: this.orderUserInfo.name,
        手机号码: this.orderUserInfo.tel,
        邮政编码: 41000,
        城市: this.orderUserInfo.cityStr,
        详细地址: this.orderUserInfo.cityBak,
      };
    },
    feeInfo() {
      const sumPrice = this.totalPrice;
      return {
        商品合计: sumPrice,
        运费: 0,
        订单金额: sumPrice,
        实付款: sumPrice,
      };
    },
    otherInfo() {
      return {
        申请人: "张三",
        退款金额: 999,
        退货商品: "仙女凳",
        申请时间: 20202020202,
      };
    },
    totalPrice() {
      let sum = this.orderDetailList.reduce((total, current) => {
        total += current.price * current.count;
        return total;
      }, 0);
      return sum;
    },
  },
  created() {
    // ajax初始化页面
    this.orderId = this.$route.params.orderId;
    // console.log(this.orderUserInfo)
    this.getOrderDetail();
    this.getOrderUserInfo();
    this.getorderBaseInfo();
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.orderDetail {
  .detail-info {
    .key {
      text-align: center;
      background-color: rgb(200, 212, 202);
      height: 30px;
      line-height: 30px;
      border: 1px solid #ccc;
    }
    .value {
      text-align: center;
      background-color: #fff;
      height: 50px;
      line-height: 50px;
      border: 1px solid #ccc;
    }
  }
}
</style>
