<script setup lang="ts">
import CalculatorContainer from "./components/calculatorContainer.vue";

import Attribution from "./components/attribution.vue";
</script>

<template>
  <main class="h-screen grid content-between">
    <div class="mx-auto grid place-content-center | content">
      <CalculatorContainer></CalculatorContainer>
    </div>
    <Attribution></Attribution>
  </main>
</template>

<style scoped lang="scss">
@use "./style.scss" as *;

.content {
  width: min(92.5%, $md-break);
  height: 92.5vh;
  height: 92.5dvh;
}
</style>
