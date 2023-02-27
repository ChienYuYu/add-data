<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductModal from '../components/ProductModal.vue';
import axios from 'axios';
import { useProductStore } from '../stores/productManagement';

const productStore = useProductStore();


// 刪除資料
async function deleteData(id) {
  await axios.delete(`http://localhost:3000/products/${id}`)
  productStore.getProductData();
}

onMounted(() => {
  // getData()
  productStore.getProductData();
})

</script>

<template>
  <!-- 上方列 -->
  <div class="border-bottom d-flex justify-content-between px-5 py-3 mb-5">
    <h3 class="mb-0">【產品管理】</h3>
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
      data-bs-whatever="@mdo">新增品項</button>
  </div>
  <!-- 彈出視窗 -->
  <ProductModal />
  <!-- 表格 -->
  <div class="px-5">
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col">類別</th>
          <th scope="col">圖片</th>
          <th scope="col">品名</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
          <th scope="col">上架</th>
          <th scope="col">編輯/刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productStore.products" :key="p.id">
          <th>{{ p.category }}</th>
          <th>
            <img :src="p.pic" class="product-img">
          </th>
          <td>{{ p.title }}</td>
          <td>${{ p.price }}</td>
          <td>{{ p.inventory }}</td>
          <td>
            <div class="form-check form-switch d-flex justify-content-center">
              <input class="form-check-input" type="checkbox" role="switch">
            </div>
          </td>
          <td>
            <button class="edit btn btn-primary">編輯</button>
            <button class="delete btn btn-danger" @click="deleteData(p.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
table {
  tr {
    vertical-align: baseline;
  }

  img.product-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  button.edit {
    border-radius: .5rem 0 0 .5rem;
  }

  button.delete {
    border-radius: 0 .5rem .5rem 0;
  }
}
</style>