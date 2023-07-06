<script lang="ts" setup>
import arrowSVG from "./arrowSVG.vue";
import { ref } from "vue";
import { ErrorFlags, SendFormat } from "../types and interfaces/interfaces";

const todayDate = new Date();
const maxYear = todayDate.getFullYear();

const emitter = defineEmits<{
  (e: "sendForm", value: SendFormat): void;
}>();

const formData: SendFormat = {
  day: 0,
  month: 0,
  year: 0,
};

function setFormData(value: string, key: keyof typeof formData) {
  formData[key] = parseInt(value);
}

const errorFlags = ref<ErrorFlags>({
  year: false,
  month: false,
  day: false,
  notHistoricDate: false,
  emptyInput: false,
});

function isDayIncorrect(value: number): boolean {
  const { month, year } = formData;
  if (month && year) {
    const numberOfDaysInMonth = new Date(year, month, 0).getDate();
    return numberOfDaysInMonth < value;
  }

  // the month and year are not defined, so it is impossible to check the date
  return value > 31;
}

function isNotHistoricDate(): boolean {
  const { day, month, year } = formData;
  if (day && month && year) {
    const userDate = new Date(year, month - 1, day);
    return todayDate.getTime() < userDate.getTime();
  }
  return false;
}

function checkInput(e: Event): void;
function checkInput(e: HTMLInputElement): void;
function checkInput(e: Event | HTMLInputElement): void {
  const target = "preventDefault" in e ? (e.target as HTMLInputElement) : e;

  errorFlags.value.day = isDayIncorrect(formData.day);
  errorFlags.value.notHistoricDate = isNotHistoricDate();

  if (target.id === "year" || target.id === "month")
    errorFlags.value[target.id] = !target.checkValidity();

  if (target.id === "year")
    errorFlags.value.emptyInput = target.id === "year" && Number.isNaN(formData[target.id]);
  if (target.id === "month" || target.id === "day")
    errorFlags.value.emptyInput = !Boolean(formData[target.id]);
}

function lastCheck(e: Event): void {
  e.preventDefault();

  // Just in case
  if (!checkFlags()) emitter("sendForm", formData);
}

function checkFlags(): boolean {
  document.querySelectorAll<HTMLInputElement>(".form__input").forEach(input => checkInput(input));

  let hasError = false;
  Object.values(errorFlags.value).forEach((value: boolean) => {
    // if any error flags is true, returns true
    if (value) hasError = true;
  });

  return hasError;
}
</script>

<template>
  <form class="form" novalidate @submit="lastCheck">
    <div class="grid gap-x-4 grid-cols-3 items-start sm:w-4/5 | form__field-container">
      <fieldset class="form__field">
        <label for="day" :class="errorFlags.day ? 'error' : ''">Day</label>
        <input
          class="form__input"
          type="number"
          id="day"
          placeholder="DD"
          required
          min="1"
          max="31"
          @input="(e)=>{setFormData((e.target as HTMLInputElement).value,'day');checkInput(e)}"
          :class="errorFlags.day ? 'error-background' : ''"
        />
        <p v-if="errorFlags.day && errorFlags.emptyInput" class="error">This Field is required</p>
        <p v-else-if="errorFlags.day" class="error">Must be a valid day</p>
      </fieldset>

      <fieldset class="form__field">
        <label for="month" :class="errorFlags.month ? 'error' : ''">Month</label>
        <input
          class="form__input"
          type="number"
          id="month"
          placeholder="MM"
          required
          min="1"
          max="12"
          @input="(e)=>{setFormData((e.target as HTMLInputElement).value,'month');checkInput(e)}"
          :class="errorFlags.month ? 'error-background' : ''"
        />
        <p v-if="errorFlags.month && errorFlags.emptyInput" class="error">This Field is required</p>
        <p v-else-if="errorFlags.month" class="error">Must be a valid month</p>
      </fieldset>

      <fieldset class="form__field">
        <label for="year" :class="errorFlags.year ? 'error' : ''">Year</label>
        <input
          class="form__input"
          type="number"
          id="year"
          placeholder="YYYY"
          :max="maxYear"
          @input="(e)=>{setFormData((e.target as HTMLInputElement).value,'year');checkInput(e)}"
          :class="errorFlags.year ? 'error-background' : ''"
        />
        <p v-if="errorFlags.year && errorFlags.emptyInput" class="error">This Field is required</p>
        <p v-else-if="errorFlags.notHistoricDate" class="error">Must be in the past</p>
      </fieldset>
    </div>

    <div class="form__bottom-section">
      <div class="absolute w-full top-1/2 left-0 | form__divider"></div>
      <button
        class="absolute top-1/2 right-1/2 w-12 h-12 rounded-full grid place-items-center translate-x-1/2 -translate-y-1/2 sm:w-16 sm:h-16 sm:right-0 sm:translate-x-0 sm:-translate-y-1/2 | form__submit-buttom"
        type="submit"
        title="Calculate the time"
      >
        <arrowSVG class="scale-50 sm:scale-75"></arrowSVG>
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use "../style.scss" as *;

.error {
  color: red;
  border-color: red;
}
p.error {
  @extend %fw-400i;
  font-size: 0.7rem;
}

label {
  @extend %fw-700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.175ch;
  color: var(--color-neutral-400);
}

.form {
  &__field {
    &-container {
      grid-template-rows: auto 1fr auto;
    }
  }

  &__input {
    margin-top: 0.25rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    width: 100%;
    font-size: min(5vw, 32px);
    line-height: 0.5;
    border: 1px solid var(--color-neutral-300);
    caret-color: var(--color-primary-100);
    color: var(--color-neutral-500);

    @media screen and (hover: hover) {
      &:hover {
        border-color: var(--color-primary-100);
        outline-color: var(--color-primary-100);
      }
    }
    &:focus {
      border-color: var(--color-primary-100);
      outline-color: var(--color-primary-100);
    }
  }

  &__bottom-section {
    margin-top: 5px;
    height: 100px;
    position: relative;
  }

  &__divider {
    border: 1px solid var(--color-neutral-200);
  }

  &__submit-buttom {
    background-color: var(--color-primary-100);
    &:hover {
      background-color: var(--color-neutral-500);
    }
  }
}
</style>
