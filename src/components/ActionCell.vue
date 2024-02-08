<script setup>
import { ref } from "vue";

const actionsOpen = ref(false);

const openActions = () => {
  actionsOpen.value = true;
  console.log(actionsOpen.value);
};
</script>

<template>
  <div class="action_cell" @click="openActions">
    <img src="../assets/icons/321423213123Combined Shape.svg" alt="" />
  </div>
</template>

<style scoped></style>
