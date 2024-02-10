<script setup>
import { ref } from "vue";

//params это параметры поля
const props = defineProps({
  params: Object,
});

const inputValue = ref(props.params.value);
const selectOpen = ref(false);
const toggleList = () => {
  selectOpen.value = !selectOpen.value;
};

const getValue = () => {
  return inputValue.value;
};

// запрос на сервер на иземение значения ячейки
const handleChange = (event) => {
  inputValue.value = event.target.value;
  if (props.params.colDef.cellDataType === "number") {
    props.params.setValue(Number(inputValue.value));
  } else {
    props.params.setValue(inputValue.value);
  }
  props.params.api.stopEditing();
};

// сохранить значение после enter
const onKeyDown = (event) => {
  event.stopPropagation();
  return getValue();
};
</script>

<template>
  <div class="combinedInput">
    <input
      class="input_part"
      :type="props.params.showSelect ? 'text' : 'number'"
      @change="handleChange"
      :value="inputValue"
      @keydown="onKeyDown"
    />
    <div
      class="triangle-wrapper"
      v-show="props.params.showSelect"
      @click="toggleList"
    >
      <span class="triangle" />
    </div>
  </div>
</template>

<style>
.combinedInput {
  display: flex;
  margin-top: 1.5px;
  align-items: center;
  position: relative;
  border-radius: 5px;
  border: solid 1px #eeeff1;
  background-color: #fff;
  overflow: hidden;
}

.input_part {
  padding: 8px 15px 8px;
  font-size: 16px;
  flex-grow: 1;
  border: none;
}

.triangle-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 8px;
  background: #eeeff1;
  height: 100%;
  display: flex;
  align-items: center;
}

.triangle {
  width: 0;
  height: 0;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-left: 6px solid #c0c0c0;
  display: inline-block;
}
</style>
