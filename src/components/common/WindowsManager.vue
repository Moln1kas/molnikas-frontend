<script setup lang="ts">
import { windows } from '../../scripts/windowsManager';
import { computed } from 'vue';

const visibleWindows = computed(() => windows.filter(window => window.isVisible));
</script>

<template>
  <component
    v-for="(window, index) in visibleWindows"
    :key="index"
    :is="window.component"
    :title="window.title"
    :width="window.width"
    :height="window.height"
    :color="window.color"
    :pos-x="window.posX"
    :pos-y="window.posY"
  >
    <component v-if="typeof window.content === 'object'" :is="window.content" />
    <div v-else v-html="window.content" />
  </component>
</template>