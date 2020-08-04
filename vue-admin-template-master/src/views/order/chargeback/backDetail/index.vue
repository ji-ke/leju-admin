<template>
  <div class="backDetail">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>退货商品</span>
      </div>
      <!-- card body -->

      <el-table :data="productDetail" border align="center">
        <el-table-column label="商品图片" align="center" width="200">
          <template slot-scope="scoped">
            <img
              :src="scoped.row.cover_img"
              style="width: 150px; height: 150px;"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" align="center" width="200">
          <template slot-scope="scoped">
            <div>{{ scoped.row.gname }}</div>
            <div>
              品牌: <span>{{ scoped.row.brandName }}</span> |
              <span>{{ scoped.row.brandEname }}</span>
            </div>
            <div>{{ scoped.row.gdescr }}</div>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" align="center" width="200">
          <template slot-scope="scoped">
            <div>价格:{{ scoped.row.sku_price | money }}</div>
            <div>货号:{{ scoped.row.sku_code }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品属性"
          prop="color_text"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="数量"
          prop="color_text"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="小计"
          prop="color_text"
          align="center"
          width="150"
        >
        </el-table-column>
      </el-table>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>订单信息</span>
        </div>
        <!-- card body -->
        <el-row class="total">
          <el-col class="front" :span="4">
            退单单号
          </el-col>
          <el-col :span="12"> {{ chargebackDetail.id }}</el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            当前状态
          </el-col>
          <el-col :span="12">
            <div v-if="chargebackDetail.process == 0">
              等待处理{{ chargebackDetail.process }}
            </div>
            <div v-else-if="chargebackDetail.process == 1">
              确认收货,等待收货;{{ chargebackDetail.process }}
            </div>
            <div v-else-if="chargebackDetail.process == 2">
              确认收货,已退款{{ chargebackDetail.process }}
            </div>
            <div v-else-if="chargebackDetail.process == 9">
              拒绝退货{{ chargebackDetail.process }}
            </div>
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            定单编号
          </el-col>
          <el-col :span="12">
            {{ chargebackDetail.orderId }}
            <span @click="orderLink( chargebackDetail.orderId )" style="color: #0ff">订单编号</span>
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            申请时间
          </el-col>
          <el-col :span="12">
            {{ chargebackDetail.addtime }}
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            用户账号
          </el-col>
          <el-col :span="12">
            {{ chargebackDetail.username }}
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            退单理由
          </el-col>
          <el-col :span="12">
            {{ chargebackDetail.reason }}
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col :span="4">
            <!-- 退单理由 -->
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            联系人
          </el-col>
          <el-col :span="8">
            {{ chargebackDetail.sendUser }}
          </el-col>
          <el-col class="front" :span="4">
            电话
          </el-col>
          <el-col :span="8"> {{ chargebackDetail.tel }}</el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            收货地址
          </el-col>
          <el-col :span="8"> {{ chargebackDetail.cityStr }} </el-col>
          <el-col class="front" :span="4">
            邮编
          </el-col>
          <el-col :span="8"> 410000</el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            详细地址
          </el-col>
          <el-col :span="12"> {{ chargebackDetail.cityBak }} </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            <!-- 详细地址 -->
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            订单金额
          </el-col>
          <el-col :span="8"> {{ chargebackDetail.order_price }} </el-col>
          <el-col class="front" :span="4">
            确定退款金额
          </el-col>
          <el-col :span="8">
            <el-input-number
              v-model="search.num"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            <!-- 订单金额 -->
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            处理备注
          </el-col>
          <el-col :span="12">
            <el-input v-model="search.s" placeholder="处理备注信息"></el-input>
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col :span="24">
            处理结果:{{ chargebackDetail.handlebak }}
          </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            处理备注
          </el-col>
          <el-col :span="8">
            {{ chargebackDetail.endbak }}
          </el-col>
          <el-col class="front" :span="4" :offset="8">
            处理时间
          </el-col>
          <el-col :span="8"> {{ chargebackDetail.handletime }} </el-col>
        </el-row>
        <el-row class="total">
          <el-col class="front" :span="4">
            处理备注
          </el-col>
          <el-col :span="8">
            {{ chargebackDetail.endbak }}
          </el-col>
          <el-col class="front" :span="4" :offset="8">
            处理时间
          </el-col>
          <el-col :span="8">
            {{ chargebackDetail.handletime }}
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
//导入api
import chargebackApi from "@/api/chargeback";

export default {
  name: "BackDetail",
  data() {
    return {
      backId: null,
      chargebackDetail: {},
      productDetail: [],
      search: {},
    };
  },
  methods: {
    // 方法
    getChargebackDetail() {
      let data = {
        id: this.backId,
      };
      chargebackApi.orderBackDetail(data).then((res) => {
        // this.productDetail = res.data.data.product;
        this.productDetail.push(res.data.data.product);
        this.chargebackDetail = res.data.data;
        // console.log(this.productDetail);
      });
    },
    orderLink(val){
      console.log(val)
      this.$router.push({name: 'orderDetail',params: {val}})
    }
  },
  computed: {
    // 计算属性
  },
  created() {
    // ajax初始化页面
    this.backId = this.$route.params.backId;
    // console.log(this.backId)
    this.getChargebackDetail();
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.backDetail {
  .total {
    border: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    .front {
      text-align: center;
      background-color: #0ff;
    }
  }
}
</style>
