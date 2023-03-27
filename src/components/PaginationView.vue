<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['parentArr']);
const emit = defineEmits(['renderData']);

const eachPagData = ref([]);
const currentPage = ref(0)
const listenProp = computed(() => props.parentArr);

// 分頁邏輯 //////////////////////////////////////////
// slice(begin, end(不包含))
// Math.ceil() 函式會回傳大於等於所給數字的最小整數。

// 製作分頁
function makePagination() {
  eachPagData.value = [] // 先清空 才不會每次呼叫累積越多
  const totalPage = Math.ceil(props.parentArr.length / 12);
  for (let i = 0; i < totalPage; i++) {
    const cutPageArr = props.parentArr.slice(i * 12, i * 12 + 12)
    eachPagData.value.push(cutPageArr)
  }
  emit('renderData', eachPagData.value[currentPage.value])
}
// 上一頁
function prePage() {
  if (currentPage.value > 0) {
    currentPage.value--
    emit('renderData', eachPagData.value[currentPage.value])
  }
}
// 下一頁
function nextPage() {
  if (currentPage.value < eachPagData.value.length - 1) {
    currentPage.value++
    emit('renderData', eachPagData.value[currentPage.value])
  }
}

// 只要prop進來的陣列有變更就執行製作分頁
watch(listenProp, () => {
  makePagination();
}, { deep: true })

</script>

<template>
  <div class="pagination d-flex justify-content-center align-items-center py-4">
    <button class="pre btn btn-outline-secondary" @click="prePage">上一頁</button>
    <p class="mb-0 px-2">第{{ currentPage + 1 }}頁 / 共{{ eachPagData.length }}頁</p>
    <button class="next btn btn-outline-secondary" @click="nextPage">下一頁</button>
  </div>
</template>

<style lang="scss" scoped>
div.pagination {
  button.pre {
    border-radius: .5rem 0 0 .5rem;
  }

  button.next {
    border-radius: 0 .5rem .5rem 0;
  }
}
</style>