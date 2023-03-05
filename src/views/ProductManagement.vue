<script setup>
import { ref, onMounted } from 'vue';
import ProductModal from '../components/ProductModal.vue';
import Pagination from '../components/PaginationView.vue';
import axios from 'axios';
import { useProductStore } from '../stores/productManagement';


const productStore = useProductStore();

const tempObj = ref({}); // 用於 props
const addOrEdit = ref(''); // 用於 props

function addProduct() {
  addOrEdit.value = 'add';
  tempObj.value = {};
}

// 刪除媒體庫圖片 然後 刪除資料庫資料
async function deleteData(id, fileName) {
  try {
    productStore.loading = true;
    await axios.delete(`http://localhost:3000/uploadImg/${fileName}`); // 刪媒體庫圖片
    await axios.delete(`http://localhost:3000/products/${id}`)// 刪資料庫資料
    productStore.loading = false;
    productStore.getProductData();
  } catch (error) {
    console.log(error);
  }
}

function editProduct(data) {
  addOrEdit.value = 'edit'
  tempObj.value = data;
}

onMounted(async() => {
  await productStore.getProductData();
  productStore.makePagination();
})

</script>

<template>
  <!-- 載入效果 -->
  <div class="bg-white bg-opacity-75 position-fixed top-0 start-0 bottom-0 end-0"
  v-if="productStore.loading">
    <VueSpinnerHourglass size="60" color="#f93" class="position-fixed top-50 start-50"/>
  </div>

  <!-- 上方列 -->
  <div class="border-bottom d-flex justify-content-between px-5 py-3 mb-5">
    <h3 class="mb-0">【產品管理】</h3>
    <button class="btn btn-mygreen text-white py-1" data-bs-toggle="modal" data-bs-target="#exampleModal"
      data-bs-whatever="@mdo" @click="addProduct">新增品項</button>
  </div>
  <!-- 彈出視窗 -->
  <ProductModal :tempObj="tempObj" :addOrEdit="addOrEdit"/>
  <!-- 表格 -->
  <div class="px-5">
    <table class="table text-center mb-0">
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
        <tr v-for="p in productStore.eachPagData[productStore.currentPage]" :key="p.id">
          <td>{{ p.category }}</td>
          <td>
            <img :src="p.pic" class="product-img">
          </td>
          <td>{{ p.title }}</td>
          <td>${{ p.price }}</td>
          <td>{{ p.inventory }}</td>
          <td>
            <div class="form-check form-switch d-flex justify-content-center">
              <input class="form-check-input" type="checkbox" role="switch" @change="productStore.sellingStatus(p.id, p.selling)" :checked="p.selling">
            </div>
          </td>
          <td>
            <button class="edit btn btn-secondary" @click="editProduct(p)"
            data-bs-toggle="modal" data-bs-target="#exampleModal">編輯</button>
            <button class="delete btn btn-myred text-white" @click="deleteData(p.id, p.fileName)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 分頁導覽 -->
  <Pagination :prePage="productStore.prePage" :nextPage="productStore.nextPage" 
    :currentPage="productStore.currentPage + 1" :totalPage="productStore.eachPagData.length" />
</template>

<style lang="scss" scoped>
table {
  tr {
    vertical-align: baseline;
  }

  img.product-img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }

  button.edit {
    border-radius: .25rem 0 0 .25rem;
  }

  button.delete {
    border-radius: 0 .25rem .25rem 0;
  }
}
</style>