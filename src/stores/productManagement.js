import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productManagement', () => {

  const products = ref([]);
  const loading = ref(false);

  // 分頁邏輯會用到 /////////
  const eachPagData = ref([]);
  const currentPage = ref(0)
  /////////////////////////


  // 取得資料 && 做排序
  async function getProductData() {
    loading.value = true;
    try {
      const res = await axios.get('http://localhost:3000/products');
      products.value = await res.data.products
      products.value.sort(function (a, b) {
        return b.addTime - a.addTime;
      })
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  }

  // 分頁邏輯 //////////////////////////////////////////
  // slice(begin, end(不包含))
  // Math.ceil() 函式會回傳大於等於所給數字的最小整數。

  // 製作分頁
  function makePagination() {
    const totalPage = Math.ceil(products.value.length / 10);
    for(let i = 0; i < totalPage; i++) {
      const cutPageArr = products.value.slice(i * 10, i * 10 + 10)
      eachPagData.value.push(cutPageArr)
    }
  }
  // 上一頁
  function prePage() {
    if(currentPage.value > 0) {
      currentPage.value --
    }
  }
  // 下一頁
  function nextPage() {
    if(currentPage.value < eachPagData.value.length - 1) {
      currentPage.value ++
    }
  }
  // /////////////////////////////////////////////////

  // 更新上下架
  async function sellingStatus(id, tf) {
    loading.value = true;
    const status = !tf
    try {
      await axios.patch(`http://localhost:3000/products/${id}`, { tf: status })
      getProductData();
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  }

  return { products, getProductData, sellingStatus,
    loading,  eachPagData, makePagination, currentPage,
    prePage, nextPage, }
});