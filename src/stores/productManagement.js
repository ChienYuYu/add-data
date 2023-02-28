import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productManagement', () => {

  const products = ref([]);

  // 取得資料 && 做排序
  async function getProductData() {
    try {
      const res = await axios.get('http://localhost:3000/products');
      products.value = await res.data.products
      products.value.sort(function (a, b) {
        return b.addTime - a.addTime;
      })
    } catch (error) {
      console.log(error);
    }
  }

  // 更新上下架
  async function sellingStatus(id, tf) {
    const status = !tf
    try {
      await axios.patch(`http://localhost:3000/products/${id}`, { tf: status })
      getProductData();
    } catch (error) {
      console.log(error);
    }
  }

  return { products, getProductData, sellingStatus }
});