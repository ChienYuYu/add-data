<script setup>
const props = defineProps(['prePage', 'nextPage', 'currentPage', 'totalPage']); // props
</script>

<template>
  <div class="pagination d-flex justify-content-center align-items-center py-4">
    <button class="pre btn btn-outline-secondary" @click="prePage">上一頁</button>
    <p class="mb-0 px-2">第{{ currentPage }}頁 / 共{{ totalPage }}頁</p>
    <button class="next btn btn-outline-secondary" @click="nextPage">下一頁</button>
  </div>
</template>

<style lang="scss" scoped>
div.pagination{
  button.pre{
    border-radius: .5rem 0 0 .5rem;
  }
  button.next{
    border-radius: 0 .5rem .5rem 0;
  }
}
</style>