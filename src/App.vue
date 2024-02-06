<script setup>
import Header from "@/components/Header.vue";
import AddLine from "@/components/AddLine.vue";
</script>

<template>
  <div class="container content-wrapper">
    <div class="sidebar">
    </div>
    <div class="main-content">
      <Header/>
      <AddLine/>
    </div>
  </div>
</template>

<style scoped>

.content-wrapper{
  display: flex;
}

.sidebar{
  min-width: 229px;
  height: 100vh;
  background-image: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
}

.main-content{
  flex-grow: 1;
  padding:0 25px;
}

@media only screen and (max-width: 1000px) {
  .sidebar {
    display: none;
  }
}
</style>
