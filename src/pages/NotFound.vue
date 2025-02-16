<script setup lang="ts">
    import WindowsManager from '../components/common/WindowsManager.vue';
    import { newWindow } from '../scripts/windowsManager';

    newWindow('Ошибка 404', '<p>Запрашиваемый ресурс не найден.</p>', 300, 100, 'error')
</script>

<template>
    <WindowsManager/>
</template>