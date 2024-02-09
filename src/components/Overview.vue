<script></script>

<template>
  <div class="totalData_wrapper">
    <div class="unit_names_list">
      <div class="unit_name">Text 1</div>
      <div class="unit_name">Text 1</div>
      <div class="unit_name">Text 1</div>
      <div class="unit_name">Text 1</div>
    </div>
    <div class="total_sum_wrapper">
      <div class="total_sum_list">
        <div class="total_sum_item">
          Сумма: <span>{{ "152 212 руб" }}</span>
        </div>
        <div class="total_sum_item">
          Кол-во:<span>{{ "24 шт" }}</span>
        </div>
        <div class="total_sum_item">
          Общий вес: <span>{{ "2 322 кг" }}</span>
        </div>
      </div>
      <div class="total_sum">Общая сумма: <span>152 212 руб</span></div>
    </div>
  </div>
</template>

<style>
.totalData_wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 5px;
}

.unit_names_list {
  margin-left: 84px;
  border-radius: 5px;
  box-shadow:
    0 0 3px 0 #000,
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
  padding: 7px 10px;
  width: 41%;
}

.unit_names_list > *:not(:last-child) {
  margin-bottom: 14px;
}

.total_sum_wrapper {
  padding: 0 15px 15px 0;
}

.total_sum_list,
.total_sum {
  min-width: 300px;
  padding: 15px;
  border-radius: 5px;
  border: solid 1px #eeeff1;
  background-color: #fbfcfd;
}

.total_sum_list > *:not(:last-child) {
  margin-bottom: 15px;
}

.total_sum_item {
  color: #8f8f8f;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total_sum_list span {
  color: #000;
}

.total_sum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}
</style>
