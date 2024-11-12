<script setup lang="ts">
    const props = defineProps({
        title: String,
    });
</script>

<template>
    <div class="shortcut">
        <img class="shortcut-icon" src="../assets/file.svg" width="64px" height="64px">
        <p class="shortcut-title">{{ props.title }}</p>
    </div>
</template>

<style lang="scss">
    @import '../styles/variables';

    .shortcut {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .shortcut-title {
        width: 100%;
        color: var(--foreground);
        text-align: center;
        margin: 0;
    }

    .shortcut:hover {
        .shortcut-title {
            background: var(--accent);
        }
    }
</style>