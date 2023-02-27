import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productManagement', () => {

  const products = ref([]);

  function getProductData() {
    axios.get('http://localhost:3000/products')
      .then((res) => {
        // console.log(res);
        products.value = res.data.products
      })
      .catch();
  }

  return { products, getProductData }
});