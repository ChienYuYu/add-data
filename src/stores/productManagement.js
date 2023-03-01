import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productManagement', () => {

  const products = ref([]);
  const loading = ref(false);

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