<script setup lang="ts">
import { Data } from "../types and interfaces/interfaces";

const { calculatedData } = defineProps<{ calculatedData: Data }>();
</script>

<template>
  <ul class="grid | result-container">
    <li class="result__label">
      <p class="result__number">{{ calculatedData.years || "--" }}</p>
      <p>years</p>
    </li>
    <li class="result__label">
      <p class="result__number">{{ calculatedData.months || "--" }}</p>
      <p>months</p>
    </li>
    <li class="result__label">
      <p class="result__number">{{ calculatedData.days || "--" }}</p>
      <p>days</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use "../style.scss" as *;

.result {
  &__label {
    display: flex;
    font-size: min(13.5vw, 65px);
    @extend %fw-800i;
    line-height: 1.05;
  }
  &__number {
    margin-right: 0.5rem;
    color: var(--color-primary-100);
  }
}
</style>
