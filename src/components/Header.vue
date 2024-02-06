<script setup>

</script>

<template>
  <div>
    <h1 class="main-title">
      Проведение ТО и мелкий ремонт
    </h1>
    <div class="navbar">
      <ul class="navigation">
        <li class="navigation_item">Общее</li>
        <li class="navigation_item active">Товары</li>
        <li class="navigation_item">Доп. расходы</li>
      </ul>
      <div class="gear_wrapper">
        <img class="gear_icon" src="../assets/icons/32131Combined%20Shape.svg" alt="Combined Shape">
      </div>
    </div>
  </div>
</template>


<style scoped>
.main-title{
  font-size: 30px;
  margin-bottom: 25px;
}

.navbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navigation{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.navigation_item{
  color: #1253a2;
  font-weight: 600;
  list-style: none;
  padding-right: 23px;
}

.active{
  color: #000;
}

.gear_wrapper{
  flex-grow: 1;
  text-align: end;
}

.gear_icon{
  width: 15px;
  height: 15px;
  object-fit: contain;
}


</style>