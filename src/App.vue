<script setup lang="ts">
import CalculatorContainer from "./components/calculatorContainer.vue";

import Attribution from "./components/attribution.vue";
</script>

<template>
  <main>
    <CalculatorContainer></CalculatorContainer>
    <Attribution></Attribution>
  </main>
</template>

<style scoped lang="scss">
main {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  align-content: space-between;
}
</style>
