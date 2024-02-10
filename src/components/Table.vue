<script setup>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CombinedInput from "@/components/CombinedInput.vue";
import Overview from "@/components/Overview.vue";

const props = defineProps({
  rowData: Array,
  columnDefs: Array,
  onRowDragEnd: Function,
  totalSum: Number,
  totalAmount: Number,
  updateResult: Function,
});

const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  cellRenderer: CombinedInput,
};

const onCellValueChanged = (event) => {
  props.updateResult(event.data);
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
      :rowDragMultiRow="true"
      rowSelection="multiple"
      :onCellValueChanged="onCellValueChanged"
      :onRowDragEnd="onRowDragEnd"
      domLayout="autoHeight"
      :suppressDragLeaveHidesColumns="true"
    >
    </ag-grid-vue>
    <Overview
      :row-data="rowData"
      :total-sum="totalSum"
      :total-amount="totalAmount"
    />
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
  position: relative;
}

/*.action_popup {
  position: absolute;
  right: 0;
  top: 30px;
  z-index: 3;
  border-radius: 5px;
  box-shadow:
    0 0 3px 0 #000,
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
  padding: 7px 10px;
}*/
</style>
