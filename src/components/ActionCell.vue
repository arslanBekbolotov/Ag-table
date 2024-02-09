<script setup>
import { ref } from "vue";

const actionsOpen = ref(false);

const openActions = () => {
  actionsOpen.value = !actionsOpen.value;
};
</script>

<template>
  <div class="action_cell" @click="openActions">
    <img
      class="action_cell_icon"
      src="../assets/icons/321423213123Combined Shape.svg"
      alt=""
    />
  </div>
</template>

<style scoped>
.action_cell {
  position: relative;
}

.action_cell_icon {
  padding: 0 14px;
}
</style>
