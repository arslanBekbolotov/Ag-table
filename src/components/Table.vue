<script setup>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ref } from "vue";
import {
  columnDefs,
  createOneRandomProduct,
  externalGridRef,
} from "@/factory.js";

let products = [...new Array(4)].map((_, index) =>
  createOneRandomProduct(index + 1),
);
const rowData = ref(products);
const gridRef = ref(externalGridRef);
const defaultRowDef = {};
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
};

const getRowId = (params) => {
  return params.data.id;
};

// запрос на сервер что поменял значение ячейки
const onCellValueChanged = () => {
  console.log("cell value changed");
};

// запрос на сервер что поменял порядок рядов
const onRowDragEnd = (event) => {
  const newIndex = event.node.rowIndex;
  const draggableItem = event.node.data;

  rowData.value = rowData.value.filter((item) => item.id !== draggableItem.id);
  rowData.value.splice(newIndex, 0, draggableItem);
  rowData.value = rowData.value.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};
</script>

<template>
  <ag-grid-vue
    enableCellChangeFlash="true"
    ref="gridRef"
    :defaultColDef="defaultColDef"
    :defaultRowDef="defaultRowDef"
    :getRowId="getRowId"
    :rowData="rowData"
    :columnDefs="columnDefs"
    class="ag-theme-quartz"
    :animateRows="true"
    :rowDragManaged="true"
    :onCellValueChanged="onCellValueChanged"
    :rowDragMultiRow="true"
    rowSelection="multiple"
    :onRowDragEnd="onRowDragEnd"
    style="height: 500px"
    :suppressDragLeaveHidesColumns="true"
    editType="fullRow"
  >
  </ag-grid-vue>
</template>

<style scoped></style>
