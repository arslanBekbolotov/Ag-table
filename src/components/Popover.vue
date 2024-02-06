<script setup>
import { ref } from "vue";

const activeItem = ref(1);

const showCustomization = (index) => {
  activeItem.value = index;
};
</script>

<template>
  <div class="popover">
    <ul class="customization_lists">
      <li
        :class="{ customization_item: true, active: activeItem === 1 }"
        @click.stop="showCustomization(1)"
      >
        <span>Отображение столбцов</span>
        <img src="./../assets/icons/31243140129409Path 11.svg" alt="" />
      </li>
      <li
        :class="{ customization_item: true, active: activeItem === 2 }"
        @click.stop="showCustomization(2)"
      >
        <span>Порядок столбцов</span>
        <img src="./../assets/icons/31243140129409Path 11.svg" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.popover {
  border-radius: 5px;
  overflow: hidden;
  box-shadow:
    0 0 3px 0 #000,
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
}

.customization_lists {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 179px;
}

.customization_item {
  list-style: none;
  cursor: pointer;
  font-size: 14px;
  color: #161616;
  padding: 7px 10px 7px;
  background-color: #eef3f8;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings_item span {
  flex: 1;
}

.active {
  background-color: #fff;
}
</style>
