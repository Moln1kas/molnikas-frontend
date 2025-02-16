<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import { colors } from '../../../tailwind.config.js';

interface WindowProps {
  title: string;
  resize?: boolean;
  width: number;
  height: number;
  color?: string;
  posX?: number;
  posY?: number;
}

const props = defineProps<WindowProps>();

const state = reactive({
  centerX: 0,
  centerY: 0,
  isVisible: true,
});

const isCompact = ref(false);

const windowStyle = computed(() => ({
  backgroundColor: colors[props.color || 'accent'],
}));

const updatePositions = () => {
  state.centerX = window.innerWidth / 2;
  state.centerY = window.innerHeight / 2;
};

const checkDevice = () => {
  isCompact.value = window.innerWidth <= 768;
};

const closeWindow = () => {
  state.isVisible = false;
};

onMounted(() => {
  updatePositions();
  checkDevice();
  window.addEventListener('resize', updatePositions);
  window.addEventListener('resize', checkDevice);
});
</script>

<template>
  <vue-draggable-resizable
    v-if="!isCompact && state.isVisible"
    :resizable="resize"
    :drag-handle="'.drag-handle'"
    :parent="true"
    :x="state.centerX - (props.posX || 0)"
    :y="state.centerY - (props.posY || 0)"
    :w="props.width"
    :h="props.height"
  >
    <div class="h-full bg-background shadow-[inset_0_0_0_1px_black] overflow-hidden flex flex-col">
      <header
        class="select-none text-foregroundPrimary flex p-2 ps-3 pe-3 text-sm drag-handle shadow-[inset_0_0_0_1px_black] cursor-pointer active:ring-1 active:ring-inset active:ring-foregroundPrimary active:cursor-move sticky top-0 z-10"
        :style="windowStyle"
      >
        <div class="w-full p-0.5 text-sm">{{ title }}</div>
        <div class="w-full flex justify-end">
          <button class="w-9 h-6 p-0.5 text-xs m-0 bg-foregroundPrimary text-background" @click="closeWindow">
            <img src="../../assets/cross.svg" width="16px" alt="Close" />
          </button>
        </div>
      </header>
      <div class="flex-1 overflow-y-auto p-3 text-foregroundPrimary box-border">
        <slot />
      </div>
    </div>
  </vue-draggable-resizable>

  <div v-if="isCompact && state.isVisible" class="fixed flex flex-col w-full h-full bg-background">
    <div class="p-3 text-foregroundPrimary h-full overflow-y-auto">
      <slot />
    </div>
    <div class="flex p-2 ps-3 pe-3 mt-auto bg-backgroundPrimary border-t">
      <button class="w-10 h-7 p-0.5 text-xs" @click="closeWindow">
        <img src="../../assets/cross.svg" width="18px" alt="Close" />
      </button>
      <div class="w-full flex justify-end items-center p-0.5 text-base text-foregroundPrimary">{{ title }}</div>
    </div>
  </div>
</template>

<style>
@import "vue-draggable-resizable/style.css";

.vdr {
  border: none;
}

.handle {
  background: black;
  border: none;
  width: 8px;
  height: 8px;
}
</style>