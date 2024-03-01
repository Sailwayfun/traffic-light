<template>
  <div class="lights">
    <div
      v-for="(num, index) in 3"
      :key="index"
      :id="index.toString()"
      class="light"
      :class="getLightStyles(index)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const currentLight = ref<number>(0);
const timeout = ref<number>();

function switchLights() {
  if (currentLight.value < 2) {
    currentLight.value++;
    return;
  }
  currentLight.value = 0;
}

function resetTimer(timeout = { value: 4000 }) {
  if (timeout.value) clearTimeout(timeout.value);
  timeout.value = setTimeout(switchLights, timeout.value);
}

onMounted(() => {
  console.log(currentLight.value);
  resetTimer();
});

function getLightStyles(id: number) {
  if (id !== currentLight.value) return "";
  switch (currentLight.value) {
    case 1: {
      return "yellow";
    }
    case 2: {
      return "green";
    }
    default: {
      return "red";
    }
  }
}

watch(currentLight, () => {
  function getTimeout(): number {
    switch (currentLight.value) {
      case 1: {
        return 500;
      }
      case 2: {
        return 3000;
      }
      default: {
        return 4000;
      }
    }
  }
  resetTimer({ value: getTimeout() });
});
onUnmounted(() => clearTimeout(timeout.value));
</script>

<style scoped>
.lights {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #aaa;
  width: 100px;
  padding: 10px;
}

.light {
  width: 50px;
  aspect-ratio: 1/1;
  border: 1px solid #aaa;
  border-radius: 50px;
  background-color: #ccc;
}

.yellow {
  background-color: yellow;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}
</style>
