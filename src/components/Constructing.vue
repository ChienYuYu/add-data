<template>
  <div class="mask">
    <div class="blur">
      <h2 class="text-white">本頁面尚未開工...</h2>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
div.mask{
  position: relative;
  width: 100%;
  height: calc(100vh - 44.8px);
  background: url('../assets/bulldozer-g62c6289b7_1280.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 80%;
  .blur{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0000009f;
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>