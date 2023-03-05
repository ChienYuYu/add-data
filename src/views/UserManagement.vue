<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Pagination from '../components/PaginationView.vue';

const userData = ref([]);
const loading = ref(false);

// 分頁邏輯會用到 /////////
const eachPagData = ref([]);
const currentPage = ref(0)
/////////////////////////

// 分頁邏輯 //////////////////////////////////////////
  // slice(begin, end(不包含))
  // Math.ceil() 函式會回傳大於等於所給數字的最小整數。

  // 製作分頁
  function makePagination() {
    const totalPage = Math.ceil(userData.value.length / 20);
    for(let i = 0; i < totalPage; i++) {
      const cutPageArr = userData.value.slice(i * 20, i * 20 + 20)
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

async function getUserData() {
  loading.value = true;
  try {
    const res = await axios.get('https://randomuser.me/api/?results=333')
    userData.value = res.data.results;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
}

onMounted(async() => {
  await getUserData();
  makePagination();
});

</script>

<template>
  <!-- 載入效果 -->
  <div class="bg-white bg-opacity-75 position-fixed top-0 start-0 bottom-0 end-0"
  v-if="loading">
    <VueSpinnerHourglass size="60" color="#f93" class="position-fixed top-50 start-50"/>
  </div>
    <!-- 上方列 -->
    <div class="border-bottom d-flex justify-content-between px-5 py-3 mb-5">
      <h3 class="mb-0">【人員資料】</h3>
    </div>
    <!-- 表格 -->
  <div class="px-5">
    <table class="table text-center mb-0">
      <thead>
        <tr>
          <th scope="col">名字</th>
          <th scope="col">性別</th>
          <th scope="col">年齡</th>
          <th scope="col">電話</th>
          <th scope="col">email</th>
          <th scope="col">詳情</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in eachPagData[currentPage]" :key="u.id">
          <td>{{ u.name.first }}</td>
          <td>{{ u.gender }}</td>
          <td>{{ u.dob.age }}</td>
          <td>{{ u.phone }}</td>
          <td>{{ u.email }}</td>
          <td>
            <button class="edit btn btn-secondary">詳情</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 導覽 -->
  <Pagination :prePage="prePage" :nextPage="nextPage" 
    :currentPage="currentPage + 1" :totalPage="eachPagData.length" />

</template>

<style lang="scss" scoped>
</style>