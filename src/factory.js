import { ref } from "vue";

let sequence = 1;
let goods = [
  {
    name: "Мраморный щебень",
    unitTypes: [
      "Мраморный щебень фр. 2-5 мм, 25кг",
      "Мраморный щебень фр. 2-5 мм, 50кг",
    ],
  },
  {
    name: "Керамика",
    unitTypes: ["Керамика фр. 2-5 мм, 25кг", "Керамика фр. 2-5 мм, 50кг"],
  },
  { name: "Cтекло", unitTypes: ["Стекло тип 1", "Стекло тип 2"] },
  { name: "Металл", unitTypes: ["Металл тип A", "Металл тип B"] },
];

export const externalGridRef = ref(null);
export const columnDefs = ref([
  {
    children: [
      {
        field: "order",
        headerName: "",
        rowDrag: true,
        width: "50px",
        editable: false,
      },
      { field: "act", headerName: "Действие", editable: false },
      {
        field: "unitType",
        headerName: "Наименование еденицы",
        flex: 1,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: goods.flatMap((item) => item.unitTypes),
        },
      },
      { field: "price", headerName: "Цена" },
      { field: "amount", headerName: "Кол-во" },
      { field: "name", headerName: "Название товара" },
      { field: "total", headerName: "Итого" },
    ],
  },
]);

const getRandomNum = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

export const createOneRandomProduct = () => {
  const randomGoods = goods[getRandomNum(0, goods.length - 1)];
  const product = {
    id: sequence,
    order: sequence,
    name: randomGoods.name,
    unitType:
      randomGoods.unitTypes[getRandomNum(0, randomGoods.unitTypes.length - 1)],
    price: getRandomNum(100, 10000),
    amount: getRandomNum(1, 50),
  };

  sequence++;
  return { ...product, total: product.amount * product.price };
};

// должен был идти запрос на добавлении
export const appendCell = () => {
  const newItem = { id: sequence, order: sequence };
  externalGridRef.value.api.applyTransaction({
    add: [newItem],
  });

  sequence++;
};

// должен был идти запрос на филтрацию
const filterColumns = (name) => {
  columnDefs.value = columnDefs.value.filter((item) => item.field !== name);
};

//удаления выбранных рядов
const removeSelectedCells = () => {
  const selectedNode = gridRef.value.api.getSelectedNodes();
  const selectedData = selectedNode.map((node) => node.data);
  gridRef.value.api.applyTransaction({
    remove: selectedData,
  });
};
