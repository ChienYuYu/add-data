<script setup>

</script>

<template>
  <!-- header -->
  <div class="header bg-dark position-fixed w-100">
    <h1 class="p-2 m-0">
      <a href="#" class="text-white text-decoration-none d-flex justify-content-center align-items-center">
        <i class="bi bi-github h4 mb-0"></i>
        <span class="h6 mb-0 px-2">Chen Chien Yu</span>
      </a>
    </h1>
  </div>
  <div class="wrapper d-flex">
    <!-- 側邊攔 -->
    <aside class="side-menu d-flex flex-column">
      <h3 class="fw-bolder text-center py-3 mb-0">後台管理</h3>
      <ul class="list-unstyled text-center">
        <li>
          <RouterLink to="/product" class="py-3 d-block text-decoration-none">產品管理</RouterLink>
        </li>
        <li>
          <a href="#" class="py-3 d-block text-decoration-none">xx管理</a>
        </li>
        <li>
          <a href="#" class="py-3 d-block text-decoration-none">xx管理</a>
        </li>
      </ul>
      <a href="#" class="logout text-center d-block mt-auto py-3 text-decoration-none">登出</a>
    </aside>
    <!-- 主要顯示區 -->
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
aside.side-menu{
  margin-top: 44.8px;
  height: calc(100vh - 44.8px);
  width: 200px;
  background: #ddd;
  border-right: 1px solid #bbb;

  h3{
    color: #333;
    // border-bottom: 1px solid #333;
  }
  a {
    color: #333;
    &:hover{
      background: #333;
      color: #fa0;
    }
  }
  a.logout{
    border-top: 1px solid #bbb;
  }  
}

main{
  width: calc(100% - 200px);
  margin-top: 44.8px;
  background: #efefef;
}
</style>
