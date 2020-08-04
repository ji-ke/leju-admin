<template>
  <div class="productAdd">
    <div class="add-step">
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="商品基本信息"></el-step>
        <el-step title="添加库存信息"></el-step>
        <el-step title="添加关联"></el-step>
      </el-steps>
    </div>
    <div class="add-from">
      <el-form :model="form" ref="form" label-width="80px">
        <div class="first-page" v-show="active == 1">
          <el-card :body-style="{ padding: '50px' }" box-shadow="never">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品名称">
                  <el-input
                    v-model="form.gname"
                    placeholder="请输入商品名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌">
                  <el-select v-model="form.brand_id" placeholder="">
                    <el-option
                      v-for="item in brandListAll"
                      :key="item.id"
                      :label="item.cname"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原产地">
                  <el-cascader
                    :options="options"
                    v-model="originCity"
                    @change="handleChange"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品编码">
                  <el-input
                    v-model="form.pcode"
                    placeholder="商家自定义"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关键词">
                  <el-input
                    v-model="form.keywords"
                    placeholder="不要用逗号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商品描述">
                  <el-input
                    v-model="form.descr"
                    placeholder="商品描述:butterfly is all stomach"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="封面图片">
                  <el-upload
                    class="upload-demo"
                    action="/api/leju/admin/material/uploadImg"
                    :on-success="successUpload"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <img
                  class="cover-img"
                  :src="form.cover_img"
                  alt=""
                  style="width: 100px; height: 100px;"
                />
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="是否上架">
                  <el-switch
                    v-model="form.isshow"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否最热">
                  <el-switch
                    v-model="form.ishot"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否最新">
                  <el-switch
                    v-model="form.isnew"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="进价">
                  <el-input-number
                    v-model="form.price_in"
                    @change="handleChange"
                    :min="0"
                  ></el-input-number>
                  <span>(单位:分)</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="售价">
                  <el-input-number
                    v-model="form.price_out"
                    @change="handleChange"
                    :min="0"
                  ></el-input-number>
                  <span>(单位:分)</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前价格">
                  <el-input-number
                    v-model="form.price_now"
                    @change="handleChange"
                    :min="0"
                  ></el-input-number>
                  <span>(单位:分)</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="重量">
                  <el-input-number
                    v-model="form.weight"
                    @change="handleChange"
                    :min="0"
                    label="描述文字"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="排序">
                  <el-input-number
                    v-model="form.sort"
                    @change="handleChange"
                    :min="0"
                    label="描述文字"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单位名称">
                  <el-input
                    v-model="form.unit_name"
                    placeholder="比如:个/坨/公斤"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品分类">
                  <el-checkbox-group v-model="form.kindIds">
                    <el-checkbox
                      v-for="item in categoryList"
                      :key="item.id"
                      :label="item.ctitle"
                      :value="item.id"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="系列">
                  <el-select v-model="form.seriesId">
                    <el-option
                      v-for="item in seriesAllList"
                      :key="item.id"
                      :label="item.cname"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="送货服务">
                  <el-checkbox-group v-model="form.service_promise">
                    <el-checkbox :label="0">无</el-checkbox>
                    <el-checkbox :label="1">送货入户</el-checkbox>
                    <el-checkbox :label="2">上门安装</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button style="margin-top: 12px;" @click="next"
                >下一步</el-button
              >
            </el-form-item>
            <!-- <el-button type="primary" @click="onSubmit">立即保存</el-button> -->
          </el-card>
        </div>
        <div class="second-page" v-show="active == 2">
          <el-card :body-style="{ padding: '20px' }">
            <el-row>
              <el-col :span="12">
                <el-form-item label="详情标题">
                  <el-input
                    v-model="form.detail_title"
                    placeholder="老友记"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="副标题">
                  <el-input
                    v-model="form.detail_desc"
                    placeholder="绝命毒师"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="轮播图">
                  <el-upload
                    class="upload-demo"
                    action="/api/leju/admin/material/uploadImg"
                    multiple
                    :limit="4"
                    :on-success="causorUpload"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <img
                  :src="item"
                  v-for="item in form.imgs"
                  :key="item"
                  style="width: 100px; height: 100px;"
                  alt=""
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="添加sku">
                  <span>颜色:</span>
                  <el-checkbox-group v-model="colorSel">
                    <el-checkbox
                      v-for="(item, index) in colorList"
                      :key="index"
                      :label="item.color_text"
                    >
                      <span :style="{ color: item.color }">{{
                        item.color_text
                      }}</span>
                      <span @click="colorDel(item.color_text)">删除</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="">
                  <el-input
                    v-model="colorObj.color_text"
                    placeholder="颜色描述"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="">
                  <el-input
                    v-model="colorObj.color"
                    placeholder="色值:如#fff"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="">
                  <el-button type="primary" size="mini" @click="createSku"
                    >创建</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="">
                  <el-button type="default" size="mini" @click="generateSku"
                    >生城</el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="18" :offset="3">
                <el-form-item label="">
                  <el-table :data="skuList" border>
                    <el-table-column prop="color_text" label="颜色">
                    </el-table-column>
                    <el-table-column prop="color" label="色值">
                    </el-table-column>
                    <el-table-column label="sku编码">
                      <template slot-scope="scoped">
                        <el-input
                          v-model="scoped.row.sku_code"
                          placeholder="自定义sku编码"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="价格">
                      <template slot-scope="scoped">
                        <el-input
                          v-model="scoped.row.price"
                          placeholder="0"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="库存">
                      <template slot-scope="scoped">
                        <el-input
                          v-model="scoped.row.count"
                          placeholder="0"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scoped">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="skuDel(scoped.row.tempId)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品详情">
                  <Tinymce
                    ref="tin"
                    upload-url="http://bufantec.com/api/leju/admin/material/uploadImg"
                  ></Tinymce>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <!-- <el-button type="primary" @click="onSubmit">立即保存</el-button> -->
              <el-button type="primary" @click="prev">上一步</el-button>
              <el-button style="margin-top: 12px;" @click="next"
                >下一步</el-button
              >
            </el-form-item>
          </el-card>
        </div>
        <div class="third-page" v-show="active == 3">
          <el-card :body-style="{ padding: '20px' }">
            <el-form-item label="关联商品">
              <el-transfer
                v-model="linkProducts"
                :titles="['所有商品', '选中商品']"
                :data="productList"
              ></el-transfer>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.bak"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="prev">上一步</el-button>
              <el-button type="primary" @click="onSubmit">立即保存</el-button>
            </el-form-item>
          </el-card>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
//导入api
import brandApi from "@/api/brand";
import categoryApi from "@/api/category";
import seriesApi from "@/api/series";
import productApi from "@/api/product";
//导入工具
import NP from "number-precision";
import _ from "lodash";
import {
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
//导入富文本
import Tinymce from "@/components/Tinymce/index";

export default {
  name: "ProductAdd",
  components: {
    Tinymce,
  },
  data() {
    return {
      brandListAll: [],
      categoryList: [],
      seriesAllList: [],
      productList: [],
      linkProducts: [],
      skuList: [],
      form: {
        kindIds: [],
        service_promise: [],
        imgs: [],
      },
      colorObj: {},
      colorList: [],
      colorSel: [],
      originCity: [],
      active: 1,
      options: regionDataPlus,
      selectedOptions: [],
      value: true,
    };
  },
  methods: {
    // 方法
    getBrandListAll() {
      brandApi.brandListAll().then((res) => {
        this.brandListAll = res.data.data;
      });
    },
    getCategoryList() {
      categoryApi.categoryList().then((res) => {
        this.categoryList = res.data.data;
      });
    },
    getSeriesAllList() {
      seriesApi.seriesAllList().then((res) => {
        this.seriesAllList = res.data.data;
      });
    },
    getProductList() {
      productApi.productList().then((res) => {
        let list = res.data.data.list;

        list.forEach((item) => {
          this.productList.push({
            key: item.id,
            label: item.gname,
          });
        });
      });
    },
    onSubmit() {
      let data = this.form;
      this.form.content = this.getTin();
      //加入skuList对象

      for (let i = 0; i < this.skuList.length; i++) {
        data["skuList[" + i + "]"] = this.skuList[i];
      }

      this.form.link1 = this.linkProducts.join(',')
      // console.log(data);
      productApi.productSaveOrUpdate(data).then(res => {
        // console.log(res)
      })
    },
    next() {
      if (this.active++ > 2) {
        this.active = 1;
      }
      this.isShow = !this.isShow;
    },
    prev() {
      // this.active --
      if (this.active-- < 1) this.active = 1;
    },
    imgUpload() {},
    handleChange(value) {
      let origin_city = "";
      let origin_code = "";

      for (var i = 0; i < value.length; i++) {
        if (value[i] != "") {
          origin_code = value[i];
        }
        origin_city += "," + CodeToText[value[i]];
      }
      origin_city = origin_city.substr(1);
      this.form.origin_city = origin_city;
      this.form.origin_code = origin_code;
    },

    causorUpload() {},
    createSku() {
      let colorNew = _.clone(this.colorObj);
      this.colorList.push(colorNew);
      this.colorObj = {};
    },
    colorDel(val) {
      this.colorList = this.colorList.filter((ele) => ele.color_text != val);
    },
    generateSku() {
      // this.colorSel = this.colorList
      this.skuList = [];
      this.colorList.forEach((item) => {
        this.skuList.push({
          tempId: item.color_text,
          sku_code: "",
          color_text: item.color_text,
          color: item.color,
          price: "",
          count: "",
        });
      });
    },
    skuDel(val) {
      this.skuList = this.skuList.filter((ele) => ele.tempId != val);
    },
    successUpload(response, file, fileList) {
      this.form.cover_img = response.ossUrl;
    },
    causorUpload(response, file, fileList) {
      this.form.imgs.push(response.ossUrl);
    },
    getTin() {
      let contentTin = this.$refs.tin.getContent();

      return contentTin;
    },
    setTin(val) {
      this.$refs.tin.setContent(val);
    },
  },
  computed: {
    // 计算属性
  },
  created() {
    // ajax初始化页面
    this.getBrandListAll();
    this.getCategoryList();
    this.getSeriesAllList();
    this.getProductList();
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.productAdd {
}
</style>
