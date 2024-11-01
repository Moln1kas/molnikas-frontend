<script>
    import Window from './Window.vue'
    export default {
        props: {
            title: String
        },
        methods: {
            callWindow() {
                document.body.appendChild(Window)
            }
        },
        components: { Window }
    }
</script>

<template>
    <div class="shortcut" @click="callWindow()">
        <img class="shortcut-icon" src="../assets/file.svg" width="64px" height="64px">
        <p class="shortcut-title">{{ title }}</p>
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