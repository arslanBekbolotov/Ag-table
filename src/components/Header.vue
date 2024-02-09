<script setup>
import { ref } from "vue";
import AccordionList from "./AccordionList.vue";

defineProps({
  columnDefs: Array,
  filterColumns: Function,
  resetColumnDefs: Function,
});

const activeItem = ref(1);
const navigationItems = ["Общее", "Товары", "Доп. расходы"];
const isOpenList = ref(false);

const setActiveItem = (index) => {
  activeItem.value = index;
};

const toggleList = () => {
  isOpenList.value = !isOpenList.value;
};
</script>

<template>
  <div>
    <h1 class="main-title">Проведение ТО и мелкий ремонт</h1>
    <div class="navbar">
      <ul class="navigation">
        <li
          v-for="(item, index) in navigationItems"
          :key="index"
          @click="setActiveItem(index)"
          :class="{ navigation_item: true, active: activeItem === index }"
        >
          {{ item }}
        </li>
      </ul>
      <div class="gear_wrapper" @click="toggleList">
        <img
          class="gear_icon"
          src="../assets/icons/32131Combined%20Shape.svg"
          alt="Combined Shape"
        />
        <div class="popover_wrapper" v-show="isOpenList">
          <AccordionList
            :column-defs="columnDefs"
            @filter-columns="filterColumns"
            @reset-column-defs="resetColumnDefs"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-title {
  font-size: 30px;
  margin: 16px 0;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.navigation_item {
  font-weight: 600;
  list-style: none;
  padding-right: 23px;
  cursor: pointer;
  color: #1253a2;
}

.active {
  color: black;
}

.gear_wrapper {
  margin-right: 15px;
  padding: 5px;
  cursor: pointer;
  position: relative;
}

.popover_wrapper {
  position: absolute;
  top: 26px;
  right: 0;
  z-index: 2;
}

@media only screen and (max-width: 400px) {
  .gear_wrapper {
    display: none;
  }
}
</style>
