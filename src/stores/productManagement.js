import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productManagement', () => {

  const products = ref([]);
  const loading = ref(false);

  // 3/5 temp //////////////
  const eachPagData= []
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

  // ////////////////////////
  // slice(begin, end(不包含))
  // Math.ceil() 函式會回傳大於等於所給數字的最小整數。
  function makePagination() {
    const totalPage = Math.ceil(products.value.length / 3);
    for(let i = 0; i<totalPage; i++) {
      const cutPageArr = products.value.slice(i * 3, i * 3 + 3)
      eachPagData.value.push(cutPageArr)
    }
  }
  // ///////////////////////

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

  return { products, getProductData, sellingStatus, loading }
});