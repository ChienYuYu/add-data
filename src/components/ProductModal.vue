<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Modal } from "bootstrap";
import { useProductStore } from '../stores/productManagement';


const productData = ref({});
const fileName = ref('');
const productModalRef = ref(null)
let productModal;
const productStore = useProductStore(); 

// 上傳圖片
async function uploadImg(e) {
  if (e.target.files[0].type !== 'image/jpeg') {
    console.log('這不是圖片');
    return
  };

  const myUpload = e.target.files[0];
  const formData = new FormData();
  formData.append('yourUpload', myUpload)

  try {
    const res = await axios.post('http://localhost:3000/uploadImg', formData);
    productData.value.pic = res.data.url;
    fileName.value = e.target.files[0].name;
  } catch (error) {
    console.log(error);
  }
}

// 刪除圖片
async function removeUploadImg() {
  if(fileName.value !== '') {
    try {
      const res = await axios.delete(`http://localhost:3000/uploadImg/${fileName.value}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

// 上傳資料
async function sendData() {
  try {
    const res = await axios.post('http://localhost:3000/addData', productData.value)
    // console.log(res);
    productStore.getProductData();
    productModal.hide();
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  productModal = new Modal(productModalRef.value, {})
})

</script>

<template>
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="productModalRef">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增產品</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-around">
          <form class="col-5 px-2">
            <div>
              <label for="product-name" class="col-form-label">品名:</label>
              <input type="text" class="form-control" id="product-name" v-model="productData.title">
            </div>
            <div>
              <label for="product-category" class="col-form-label">類別:</label>
              <select class="form-select" aria-label="Default select example" id="product-category"
                v-model="productData.category">
                <option selected disabled>請選擇產品類別</option>
                <option value="燈泡">燈泡</option>
                <option value="檯燈">檯燈</option>
                <option value="落地燈">落地燈</option>
                <option value="壁燈">壁燈</option>
                <option value="吊燈">吊燈</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="product-price" class="col-form-label">價格:</label>
              <input type="number" class="form-control" id="product-price" v-model="productData.price">
            </div>
            <div class="mb-3">
              <label for="product-inventory" class="col-form-label">庫存:</label>
              <input type="number" class="form-control" id="product-inventory" v-model="productData.inventory">
            </div>
          </form>
          <form class="col-5 px-2">
            <div class="mb-3">
              <label for="formFile" class="form-label mb-0">上傳圖片：</label>
              <img src="../assets/upload-gbc2294792_640.png" style="width:200px" class="d-block my-3 mx-auto" alt="">
              <input class="form-control mx-auto" type="file" id="formFile" @change="uploadImg">
            </div>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="removeUploadImg" >取消</button>
          <button type="button" class="btn btn-primary" @click="sendData">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>