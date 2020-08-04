<template>
  <div class="product">
    product/lisa
  </div>
</template>

<script>
import productApi from "@/api/product";
export default {
  name: "Product",
  data() {
    return {
      productList: [],
    };
  },
  methods: {
    // 方法
    get(){
        console.log('lisa')
    },
    getProductList() {
        console.log(1)
      productApi.productList().then((res) => {});
    },
  },
  computed: {
    // 计算属性
  },
  created() {
    // ajax初始化页面
    this.getProductList();
    (function(){
        console.log('lisa')
    }())
  },
  mounted() {
    // 初始化插件
  },
};
</script>

<style lang="scss" scoped>
.product {
}
</style>
