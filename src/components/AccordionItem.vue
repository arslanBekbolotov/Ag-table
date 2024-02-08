<script setup>
defineProps({
  item: Object,
  index: Number,
  toggleAccordion: Function,
  activeItem: Number,
});
</script>

<template>
  <li class="customization_item" @click.stop="toggleAccordion(index)">
    <div
      :class="{ customization_item_header: true, active: activeItem === index }"
    >
      <span>{{ item.name }}</span>
      <img
        :class="{
          customization_lists_icon: true,
          active_icon: activeItem === index,
        }"
        src="./../assets/icons/31243140129409Path 11.svg"
        alt=""
      />
    </div>
    <div
      :class="{
        customization_item_body: true,
        is_closed: activeItem !== index,
      }"
    >
      <slot />
    </div>
  </li>
</template>

<style scoped>
.customization_item {
  cursor: pointer;
  font-size: 14px;
  color: #161616;
  height: auto;
}

.customization_item_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  background-color: #eef3f8;
}

.customization_item_body {
  transition: transform 0.5s ease-in-out;
  padding: 4px 10px 7px;
  overflow: hidden;
}

.is_closed {
  max-height: 0;
  padding: 0;
}

.settings_item span {
  flex: 1;
}

.customization_lists_icon {
  transition: transform 0.5s ease-in-out;
}

.active_icon {
  transform: rotateZ(90deg);
}

.active {
  background-color: #fff;
}
</style>
