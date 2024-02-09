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
    colId: 1,
    field: "order",
    headerName: "",
    rowDrag: true,
    width: "50px",
    editable: false,
    cellRenderer: null,
  },
  {
    colId: 2,
    field: "action",
    headerName: "Действие",
    width: "26px",
    cellRenderer: ActionCell,
    editable: false,
  },
  {
    colId: 3,
    field: "unitType",
    headerName: "Наименование еденицы",
    cellRendererParams: {
      showSelect: true,
    },
    flex: 1,
  },
  {
    colId: 4,
    field: "price",
    headerName: "Цена",
  },
  {
    colId: 5,
    field: "amount",
    headerName: "Кол-во",
  },
  {
    colId: 6,
    field: "name",
    headerName: "Название товара",
    cellRendererParams: {
      showSelect: true,
    },
  },
  {
    colId: 7,
    field: "total",
    headerName: "Итого",
    cellEditorParams: {
      showSelect: true,
    },
  },
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
const filterColumns = (col, checked) => {
  if (checked) {
    columnDefs.value = columnDefs.value.filter(
      (item) => item.colId !== col.colId,
    );
  }

  if (!checked && col) {
    appendColumn(col);
  }
};

// добавляю обратно колонку
const appendColumn = (col) => {
  const part1 = columnDefs.value.splice(0, col.colId - 1);
  const part2 = columnDefs.value;
  columnDefs.value = [...part1, col, ...part2];
};
</script>

<template>
  <div class="container content-wrapper">
    <div class="sidebar"></div>
    <div class="main-content">
      <Header :column-defs="columnDefs" :filter-columns="filterColumns" />
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
