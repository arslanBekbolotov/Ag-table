export let sequence = 1;
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
