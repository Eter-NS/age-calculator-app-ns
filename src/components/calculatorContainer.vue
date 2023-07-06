<script setup lang="ts">
import { ref } from "vue";
import CalculatorForm from "./calculatorForm.vue";
import CalculatorShowData from "./calculatorShowData.vue";
import { Data, IncomingFormData } from "../types and interfaces/interfaces";
import { createUserDate, getDateInMonth, returnMonthsDifference } from "../tools/dateTools";

const calculatedData = ref({
  days: "",
  months: "",
  years: "",
});

// Year Month Day calculations

function calculateYears(systemDate: Date, userDate: Date) {
  return Math.floor(returnMonthsDifference(systemDate, userDate) / 12).toString();
}

function calculateMonths(systemDate: Date, userDate: Date): string {
  const months = returnMonthsDifference(systemDate, userDate) % 12;
  return months.toString();
}

function calculateDays(systemDate: Date, userDate: Date) {
  const system = systemDate.getDate();
  const user = userDate.getDate();

  const equalToSystem = 0;
  const userSmaller = system - user;
  const userLarger = getDateInMonth(userDate) - user + system;

  return (user < system ? userSmaller : user > system ? userLarger : equalToSystem).toString();
}

// Main logic

function handleFormData(incomingObject: IncomingFormData) {
  calculatedData.value = calculate(incomingObject);
}

function calculate(obj: IncomingFormData): Data {
  const systemDate = new Date();
  const userDate = createUserDate(obj);

  return {
    days: calculateDays(systemDate, userDate),
    months: calculateMonths(systemDate, userDate),
    years: calculateYears(systemDate, userDate),
  };
}
</script>

<template>
  <div class="p-6 py-10 | container">
    <CalculatorForm @send-form="handleFormData"></CalculatorForm>
    <CalculatorShowData :calculated-data="calculatedData"></CalculatorShowData>
  </div>
</template>

<style scoped lang="scss">
@use "../style.scss" as *;

.container {
  background-color: var(--color-neutral-100);
  border-radius: 1.5rem;
  border-bottom-right-radius: 100px;

  @media screen and (min-width: $md-break) {
    border-bottom-right-radius: 125px;
  }
}
</style>
