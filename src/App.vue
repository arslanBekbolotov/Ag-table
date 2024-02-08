<script setup>
import Header from "@/components/Header.vue";
import AddLine from "@/components/AddLine.vue";
import Table from "@/components/Table.vue";
import { ref } from "vue";
import { createOneRandomProduct, sequence } from "@/factory.js";
import ActionCell from "@/components/ActionCell.vue";

let products = [...new Array(4)].map((_, index) =>
  createOneRandomProduct(index + 1),
);

const rowData = ref(products);
const sequenceRef = ref(sequence);
const columnDefs = ref([
  {
    field: "order",
    headerName: "",
    rowDrag: true,
    width: "50px",
    editable: false,
  },
  {
    field: "action",
    headerName: "Действие",
    width: "20px",
    editable: false,
    cellRenderer: ActionCell,
  },
  {
    field: "unitType",
    headerName: "Наименование еденицы",
    flex: 1,
  },
  { field: "price", headerName: "Цена" },
  { field: "amount", headerName: "Кол-во" },
  { field: "name", headerName: "Название товара" },
  { field: "total", headerName: "Итого" },
]);

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

// должен был идти запрос на добавлении
const appendCell = () => {
  const newItem = { id: sequenceRef.value, order: sequenceRef.value };
  products = [...products, newItem];
  rowData.value = products;
  sequenceRef.value++;
};

// должен был идти запрос на редактирования
const filterColumns = (name) => {
  columnDefs.value = columnDefs.value.filter((item) => item.field !== name);
};

// //удаления выбранных рядов
// const removeSelectedCells = () => {
//   const selectedNode = gridRef.value.api.getSelectedNodes();
//   const selectedData = selectedNode.map((node) => node.data);
//   gridRef.value.api.applyTransaction({
//     remove: selectedData,
//   });
// };
</script>

<template>
  <div class="container content-wrapper">
    <div class="sidebar"></div>
    <div class="main-content">
      <Header :column-defs="columnDefs" @filter-columns="filterColumns" />
      <AddLine @appendCell="appendCell" />
      <Table
        :row-data="rowData"
        :column-defs="columnDefs"
        :on-row-drag-end="onRowDragEnd"
      />
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
}

.sidebar {
  min-width: 229px;
  height: 100vh;
  background-image: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
}

.main-content {
  flex-grow: 1;
  padding: 0 25px;
}

@media only screen and (max-width: 1000px) {
  .sidebar {
    display: none;
  }
}
</style>
