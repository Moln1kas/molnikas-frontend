<script setup lang="ts">
    import { windows } from '../scripts/windowsManager';
</script>

<template>
    <component 
        v-for="(window, index) in windows"
        :color="window['color']"
        :title="window['title']"
        :pos-x="window['posX']"
        :pos-y="window['posY']"
        :width="window['width']"
        :height="window['height']"
        :key="index"
        :is="window['component']"
    >
        <div v-if="typeof(window['content']) === 'string'" v-html="window['content']"></div>
        <component v-if="typeof(window['content']) === 'object'" :is="window['content']"/>
    </component>
</template>