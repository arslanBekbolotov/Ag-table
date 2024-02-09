<script setup>
import AccordionItem from "@/components/AccordionItem.vue";
import { ref, defineProps } from "vue";

const props = defineProps({
  columnDefs: Array,
});

defineEmits(["filterColumns"]);

const columnDefsCopy = props.columnDefs;
const activeItem = ref(-1);
const selectedColumns = ref(columnDefsCopy);
const list = [{ name: "Отображение столбцов" }, { name: "Порядок столбцов" }];

const toggleAccordion = (index) => {
  if (activeItem.value === index) {
    activeItem.value = -1;
  }
  activeItem.value = index;
};
</script>

<template>
  <div class="popover">
    <ul class="customization_list">
      <AccordionItem
        v-for="(item, index) in list"
        :item="item"
        :index="index"
        :toggle-accordion="toggleAccordion"
        :active-item="activeItem"
      >
        <div
          class="checkbox_wrapper"
          v-for="(col, colIndex) in columnDefsCopy"
          :key="colIndex"
        >
          <input
            type="checkbox"
            :id="`checkbox_${index}_${colIndex}`"
            :checked="selectedColumns[colIndex][col.headerName]"
            @change="$emit('filterColumns', col, $event.target.checked)"
          />
          <label
            class="checkbox_label"
            :for="`checkbox_${index}_${colIndex}`"
            >{{ col.headerName ? col.headerName : col.field }}</label
          >
        </div>
      </AccordionItem>
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

.customization_list {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 179px;
  list-style: none;
}

.checkbox_wrapper {
  display: flex;
  align-items: center;
}

.checkbox_label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 5px;
}
</style>
