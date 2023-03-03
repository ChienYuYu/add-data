<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import { Modal } from "bootstrap";
import { useProductStore } from '../stores/productManagement';

const props = defineProps(['tempObj', 'addOrEdit']); // props
const tempObj = computed(() => props.tempObj)
const addOrEdit = computed(() => props.addOrEdit);

const productModalRef = ref(null)
let productModal;

const productStore = useProductStore();
const productData = ref({});
const fileName = ref('');
const modalLoadingEffect = ref(false)

watch(tempObj, () => {
  if (addOrEdit.value === 'add') {
    productData.value = {}
  } else { productData.value = props.tempObj; }
}, { deep: true })

// 上傳圖片
async function uploadImg(e) {
  if (e.target.files[0].type !== 'image/jpeg') {
    console.log('這不是圖片');
    return
  };

  const myUpload = e.target.files[0];
  const formData = new FormData();
  formData.append('yourUpload', myUpload)
  modalLoadingEffect.value = true;
  try {
    const res = await axios.post('http://localhost:3000/uploadImg', formData);
    productData.value.pic = res.data.url;
    fileName.value = e.target.files[0].name;
  } catch (error) {
    console.log(error);
  }
  modalLoadingEffect.value = false;
}

// 刪除圖片
async function removeUploadImg() {
  if (fileName.value !== '') {
    try {
      await axios.delete(`http://localhost:3000/uploadImg/${fileName.value}`);
      productData.value = {};
    } catch (error) {
      console.log(error);
    }
  }
}

// 上傳資料
async function addData() {
  // 判斷欄位
  const pd = productData.value;
  if (!pd.title || !pd.category || !pd.price || !pd.inventory || !pd.pic) {
    alert('所欄位、圖片不得為空!!!')
    return
  };
  modalLoadingEffect.value = true;
  try {
    await axios.post('http://localhost:3000/addData', productData.value)
    productModal.hide();
    productStore.getProductData();
    productData.value = {};
  } catch (error) {
    console.log(error);
  }
  modalLoadingEffect.value = false;
}

// 編輯資料
async function editData() {
  try {
    modalLoadingEffect.value = true;
    const id = tempObj.value.id;
    await axios.put(`http://localhost:3000/products/${id}`, productData.value)
    productStore.getProductData();
    productModal.hide();
    productData.value = {};
    modalLoadingEffect.value = false;
  } catch (error) {
    console.log(error);
  }
}

// 判斷是新增還是編輯
function checkAddOrEdit() {
  if (addOrEdit.value === 'add') addData()
  if (addOrEdit.value === 'edit') editData()
}

onMounted(() => {
  productModal = new Modal(productModalRef.value, {})
})

</script>

<template>
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="productModalRef">
    <div class="modal-dialog modal-lg">
      <!-- 載入效果 -->
      <div class="d-flex justify-content-center align-items-center
      border position-absolute top-0 start-0 end-0 bottom-0 bg-white bg-opacity-75"
      style="z-index: 9999;" v-if="modalLoadingEffect">
        <VueSpinner size="50" color="#fa0"/>
      </div>
    <!--  -->
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增/編輯 產品</h1>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal" aria-label="Close" @click="removeUploadImg"></button>
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
              <img src="../assets/upload-gbc2294792_640.png" style="width:200px" class="d-block my-3 mx-auto" alt=""
                v-if="!productData.pic">
              <img :src="productData.pic" style="width:200px" class="d-block my-3 mx-auto" alt="" v-else>
              <input class="form-control mx-auto" type="file" id="formFile" @change="uploadImg">
            </div>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="removeUploadImg">取消</button>
          <button type="button" class="btn btn-primary" @click="checkAddOrEdit">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>