<template>
  <div class="productList">
    <div class="pro-search">
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>查询条件</span>
        </div>
        <!-- card body -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              v-model="search.gname"
              placeholder="商品名称"
              size="small"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="search.pcode"
              placeholder="商品编码"
              size="small"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-select size="small" v-model="search.brandId" placeholder="品牌">
              <el-option
                v-for="item in brandListAll"
                :key="item.id"
                :label="item.cname"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              size="small"
              v-model="search.categoryId"
              placeholder="分类"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.ctitle"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-col :span="3" :offset="18">
            <el-button type="default" @click="proReset">重置</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="proSearch">搜索</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="pro-list">
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header">
          <el-button type="primary" @click="proAdd">新增</el-button>
        </div>
        <!-- card body -->
        <el-table :data="productList" v-loading="loading" border>
          <el-table-column fixed type="index" label="#" :width="50">
          </el-table-column>
          <el-table-column fixed label="商品图片" :width="200">
            <template slot-scope="scoped">
              <img
                class="brand-cover-img"
                :src="scoped.row.brandCoverImg"
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" :width="300">
            <template slot-scope="scoped">
              <div>{{ scoped.row.gname }}</div>
              <div>
                <span>{{ scoped.row.brandName }}</span> |
                <span>{{ scoped.row.brandEname }}</span>
              </div>
              <div>{{ scoped.row.descr }}</div>
            </template>
          </el-table-column>
          <el-table-column label="标签" :width="300">
            <template slot-scope="scoped">
              <div>
                上架:
                <el-switch
                  v-model="scoped.row.isshow"
                  :active-value="1"
                  :inactive-value="0"
                  @change="
                    switchStatus('isshow', scoped.row.isshow, scoped.row.id)
                  "
                >
                </el-switch>
              </div>
              <div>
                最热:
                <el-switch
                  v-model="scoped.row.ishot"
                  :active-value="1"
                  :inactive-value="0"
                  @change="
                    switchStatus('ishot', scoped.row.ishot, scoped.row.id)
                  "
                >
                </el-switch>
              </div>
              <div>
                最新:
                <el-switch
                  v-model="scoped.row.isnew"
                  :active-value="1"
                  :inactive-value="0"
                  @change="
                    switchStatus('isnew', scoped.row.isnew, scoped.row.id)
                  "
                >
                </el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="index" label="价格/货号" :width="300">
            <template slot-scope="scoped">
              <div>价格:{{ scoped.row.price_now }}</div>
              <div>货号:{{ scoped.row.service_promise }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="brandName" label="所属分类" :width="160">
          </el-table-column>
          <el-table-column prop="sku_count" label="查看sku" :width="160">
            <template slot-scope="scoped">
              <div style="color: #0ff;" @click="viewSku(scoped.row.id)">
                查看sku
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" :width="160">
          </el-table-column>
          <el-table-column prop="origin_city" label="原产地" :width="160">
          </el-table-column>
          <el-table-column prop="addtime" label="添加时间" :width="160">
          </el-table-column>
          <el-table-column label="操作" :width="160">
            <template slot-scope="scoped">
              <el-button
                type="primary"
                @click="proEdit(scoped.row.id)"
                size="mini"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="open(scoped.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <mypagination
          :page="page"
          @size-change="sizeChange"
          @current-change="currentChange"
        ></mypagination>
      </el-card>

      <el-dialog
        title=""
        :visible.sync="visiableDialog"
        width="60%"
        @close="dialogClose"
      >
        <el-table :data="skuList" border stripe>
          <el-table-column prop="color_text" label="颜色" width="150">
          </el-table-column>
          <el-table-column prop="color" label="色值" width="150">
          </el-table-column>
          <el-table-column label="sku编码" width="150">
            <template slot-scope="scoped">
              <el-input v-model="scoped.row.sku_code" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="150">
            <template slot-scope="scoped">
              <el-input v-model="scoped.row.price" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column label="库存" width="150">
            <template slot-scope="scoped">
              <el-input v-model="scoped.row.count" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="color_text" label="操作" width="150">
            <template slot-scope="scoped">
              <div style="color: #0ff;" @click="submitChange(scoped.row.id)">
                提交修改
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//导入api
import productApi from "@/api/product";
import categoryApi from "@/api/category";
import brandApi from "@/api/brand";
import skuApi from "@/api/warehouse";
//导入组件
import mypagination from "@/components/Mypagination/Mypagination";
//导入mixins
import pageParams from "@/mixins/mypagination";
//导入工具
import _ from "lodash";
export default {
  name: "ProductList",
  components: {
    mypagination,
  },
  mixins: [pageParams],
  data() {
    return {
      productList: [],
      brandListAll: [],
      categoryList: [],
      skuList: [],
      loading: false,
      search: {},
      visiableDialog: false,
    };
  },
  methods: {
    // 方法
    getProductList() {
      this.loading = true;
      let data = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search,
      };
      data = _.pickBy(data, (item) => item);
      productApi.productList(data).then((res) => {
        this.productList = res.data.data.list;
        this.page.total = res.data.data.totalRow;
        this.loading = false;
      });
    },
    getCategoryList() {
      categoryApi.categoryList().then((res) => {
        this.categoryList = res.data.data;
      });
    },
    getBrandListAll() {
      brandApi.brandListAll().then((res) => {
        this.brandListAll = res.data.data;
      });
    },
    getSkuList(val) {
      let data = {
        productId: val,
      };
      skuApi.skuList(data).then((res) => {
        this.skuList = res.data.data;
      });
    },
    getProductDetail(val){
      let data = {
        id: val
      }
      productApi.productDetail(data).then(res => {
        // console.log(res)
      })
    },
    viewSku(val) {
      this.getSkuList(val);
      this.visiableDialog = true;
    },
    dialogClose() {
      this.visiableDialog = false;
    },
    submitChange(val) {
      let skuObj = this.skuList.filter((ele) => ele.id == val);
      let data = skuObj[0];
      // console.log(this.skuList)
      // console.log(data)
      skuApi.skuSaveOrUpdate(data).then((res) => {
        // console.log(res)
      });
    },
    open(val) {
      this.$alert("是否确定删除", {
        confirmButtonText: "确定",
        callback: this.proDel(val),
        //  (action) => {
        //   this.$message({
        //     type: "info",
        //     message: `action: ${action}`,
        //   });
        // },
      });
    },
    switchStatus(name, val, id) {
      let data = {
        id
      };
      data[name] = val;
      productApi.productSwitchCode(data).then((res) => {
        // console.log(res.code == "success");
        // res.code == 'success' ? this.$message.success('更新成功') : this.$message.error('更新失败')
        if (res.code == "success") {
          this.$message.success("更新成功!");
        } else {
          this.$message.error("更新失败!");
        }
      });
    },
    proReset() {
      this.search = {};
    },
    proSearch() {
      this.getProductList();
    },
    proAdd() {
      this.$router.push({ name: "ProductAdd" });
    },
    proEdit(val) {
      this.$router.push({ name: "ProductAdd" });
      this.getProductDetail(val)
    },
    proDel(val) {
      let data = {
        id: val,
      };
      productApi.productDelete(data).then((res) => {
        this.getProductList();
      });
    },
    sizeChange(val) {
      this.page.limit = val;
      this.getProductList();
    },
    currentChange(val) {
      this.page.start = val;
      this.getProductList();
    },
  },
  computed: {
    // 计算属性
  },
  created() {
    // ajax初始化页面
    this.getProductList();
    this.getCategoryList();
    this.getBrandListAll();
    // this.getSkuList()
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.productList {
  .pro-list {
    .brand-cover-img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
