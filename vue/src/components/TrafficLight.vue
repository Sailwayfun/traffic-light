<template>
  <div class="lights">
    <!-- {Array.from({ length: 3 }).map((_, index) => { return ( -->
    <!-- <div
      key="{index}"
      id="{index.toString()}"
      className="{`light"
      ${getLightStyles(
      index.toString(),
      currentLight
      )}`}
    ></div> -->
    <div v-for="n in 3" :key="n" :id="n.toString()" class="light" :class="lightClasses"></div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";

const currentLight = ref(0);
const timeout = ref();

function getLightStyles(id: string, currentLight: number) {
  if (currentLight.toString() !== id) return "";
  switch (currentLight) {
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
const lightClasses = getLightStyles(id, currentLight.value);

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
  function switchLights() {
    if (currentLight.value > 2) {
      currentLight.value++;
      return;
    }
    currentLight.value = 0;
  }
  timeout.value = setTimeout(switchLights, getTimeout());
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
