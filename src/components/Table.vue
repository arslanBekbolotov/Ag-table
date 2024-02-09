<script setup>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CombinedInput from "@/components/CombinedInput.vue";

defineProps({
  rowData: Array,
  columnDefs: Array,
  onRowDragEnd: Function,
});

const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  cellRenderer: CombinedInput,
};

// запрос на сервер что поменял значение ячейки
const onCellValueChanged = () => {
  console.log("cell value changed");
};
</script>

<template>
  <div class="ag-table-wrapper">
    <div class="ag-table-header">
      <img src="../assets/icons/32131Combined Shape.svg" alt="Combined Shape" />
    </div>
    <ag-grid-vue
      enableCellChangeFlash="true"
      :defaultColDef="defaultColDef"
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
    >
    </ag-grid-vue>
  </div>
</template>

<style scoped>
.ag-table-wrapper {
  border: 1px solid #eeeff1;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  background: #ffffff;
}

.ag-table-header {
  padding: 9px 15px;
  cursor: pointer;
  border-bottom: 1px solid #eeeff1;
  text-align: end;
}
</style>
