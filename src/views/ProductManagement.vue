<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();

onMounted(() => {
  console.log(route.path);
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
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <input type="text" class="form-control" id="product-name">
            </div>
            <div>
              <label for="product-category" class="col-form-label">類別:</label>
              <select class="form-select" aria-label="Default select example" id="product-category">
                <option selected disabled>請選擇產品類別</option>
                <option value="1">燈泡</option>
                <option value="2">檯燈</option>
                <option value="3">落地燈</option>
                <option value="4">壁燈</option>
                <option value="5">吊燈</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="product-price" class="col-form-label">價格:</label>
              <input type="number" class="form-control" id="product-price">
            </div>
            <div class="mb-3">
              <label for="product-qty" class="col-form-label">庫存:</label>
              <input type="number" class="form-control" id="product-qty">
            </div>
          </form>
          <form class="col-5 px-2">
            <div class="mb-3">
              <label for="formFile" class="form-label mb-0">上傳圖片：</label>
              <img src="../assets/upload-gbc2294792_640.png" style="width:200px" class="d-block my-3 mx-auto" alt="">
              <input class="form-control mx-auto" type="file" id="formFile">
            </div>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
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
        <tr>
          <th>燈泡</th>
          <th>
            <img src="../assets/pexels-led-supermarket-577512.jpg" class="product-img">
          </th>
          <td>T05 LED燈泡</td>
          <td>$120</td>
          <td>99</td>
          <td>
            <div class="form-check form-switch d-flex justify-content-center">
              <input class="form-check-input" type="checkbox" role="switch">
            </div>
          </td>
          <td>
            <button class="edit btn btn-primary">編輯</button>
            <button class="delete btn btn-danger">刪除</button>
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