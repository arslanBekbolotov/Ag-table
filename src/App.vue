<script setup>
import Header from "@/components/Header.vue";
import AddLine from "@/components/AddLine.vue";
import Table from "@/components/Table.vue";
import { onBeforeMount, ref } from "vue";
import { createOneRandomProduct, sequence } from "@/factory.js";
import ActionCell from "@/components/ActionCell.vue";

let products = [...new Array(4)].map((_, index) =>
  createOneRandomProduct(index + 1),
);

const rowData = ref(products);
const sequenceRef = ref(sequence);
const sidebarIsOpen = ref(false);
const totalSum = ref(0);
const totalAmount = ref(0);
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
    insertColumn(col);
  }
};

// добавляю обратно колонку
const insertColumn = (col) => {
  const part1 = columnDefs.value.splice(0, col.colId - 1);
  const part2 = columnDefs.value;
  columnDefs.value = [...part1, col, ...part2];
};

// обновляю результат после изменения ячейки
const updateResult = (data) => {
  totalSum.value = rowData.value.reduce((prev, current) => {
    if (!current.total && data?.total) {
      return (prev += data.total);
    }

    if (!data?.total && !current.total) {
      return prev;
    }

    return (prev += current.total);
  }, 0);

  totalAmount.value = rowData.value.reduce((prev, current) => {
    if (!current.amount && data?.amount) {
      return (prev += data.amount);
    }

    if (!data?.amount && !current.amount) {
      return prev;
    }

    return (prev += current.amount);
  }, 0);
};

const toggleSidebar = () => {
  sidebarIsOpen.value = !sidebarIsOpen.value;
};

onBeforeMount(() => updateResult());
</script>

<template>
  <div class="container content-wrapper">
    <div
      :class="{ sidebar: true, active_sidebar: sidebarIsOpen }"
      @click="toggleSidebar"
    ></div>
    <div class="main-content">
      <Header
        :column-defs="columnDefs"
        :filter-columns="filterColumns"
        :toggle-sidebar="toggleSidebar"
      />
      <AddLine @appendCell="appendCell" />
      <Table
        :row-data="rowData"
        :column-defs="columnDefs"
        :on-row-drag-end="onRowDragEnd"
        :total-amount="totalAmount"
        :total-sum="totalSum"
        :updateResult="updateResult"
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
  transition: transform 0.5s ease-in-out;
}

.main-content {
  flex-grow: 1;
  padding: 0 25px;
}

@media only screen and (max-width: 1000px) {
  .main-content {
    padding: 10px;
  }

  .sidebar {
    position: absolute;
    transform: translateX(-200%);
    z-index: 3;
  }

  .active_sidebar {
    transform: translateX(0);
  }
}
</style>
