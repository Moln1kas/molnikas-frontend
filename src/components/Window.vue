<script setup lang="ts">
    import { defineProps, onMounted, onUnmounted, reactive } from 'vue';

    const props = defineProps({
        title: String,
        resize: Boolean,
        color: String,
        posX: Number,
        posY: Number,
    });
    
    const state = reactive({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        seen: true,
    });

    onMounted(() => {
        updatePositions();
        window.addEventListener('load', updatePositions);
        window.addEventListener("resize", updatePositions);
    });
    onUnmounted(() => {
        window.removeEventListener("resize", updatePositions);
    });

    /**
     * Updates the positions of all windows on the screen.
     */
    const updatePositions = () => {
        const block: HTMLElement | null = document.querySelector('.vdr');
        if (!block) return;

        state.width  = block.offsetWidth;
        state.height = block.offsetHeight;

        state.x = Math.max(0, (window.innerWidth - state.width) / 2 + (props.posX || 0));
        state.y = Math.max(0, (window.innerHeight - state.height) / 2 + (props.posY || 0));
    }

    const closeWindow = () => {
        state.seen = false;
    }
    /**
     * Getting a formatted color for css.
     */
    const getWindowColor = () => {
        return '--' + (props.color || 'accent');
    }
</script>

<template>
    <vue-draggable-resizable 
        :min-width="state.width"
        :min-height="state.height"
        :resizable="resize"
        :drag-handle="'.drag-handle'"
        :h="'auto'"
        :w="'auto'"
        :x="state.x"
        :y="state.y"
        :parent="true"
        v-if="state.seen"
    >
        <div class="window">
            <header class="window-header drag-handle" :style="{'background': `var(${getWindowColor()})`}">
                <div class="window-title">{{ title }}</div>
                <div class="window-action-container">
                    <button class="window-action" @click="closeWindow"><img src="../assets/underline.svg" width="8px"></button>
                    <button class="window-action" @click="closeWindow"><img src="../assets/square.svg" width="8px"></button>
                    <button class="window-action" @click="closeWindow"><img src="../assets/cross.svg" width="8px"></button>
                </div>
            </header>
            <div class="window-content">
                <slot></slot>
            </div>
        </div>
    </vue-draggable-resizable>
</template>

<style lang="scss">
    @import "vue-draggable-resizable/style.css";
    @import '../styles/variables';
    @import '../styles/mixins';

    .vdr {
        border: none;
    }

    .window {
        height: 100%;
        background: var(--background);

        @include inner-border(#000);
    }

    .window-header {
        user-select: none;
        color: var(--foreground);
        display: flex;
        padding: 4px 4px 4px 4px;

        font-size: 14px;

        @include inner-border(#000);
    }

    .window-action-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .window-action {
        width: 24px;
        height: 22px;
        padding: 2px 0;
        margin: 0 0 0 2px;
        font-size: 12px;
        background: var(--foreground);
        color: var(--background);
    }

    .window-title {
        padding: 2px 0;
        width: 100%;
    }

    .window-content {
        padding: 0 4px 0.1px 4px;
        color: var(--foreground);
    }

    .handle {
        background: #000;
        border: none;
        width: 8px; height: 8px;
    }

    .handle-tl {
        top: 0;
        left: 0;
    }
    .handle-tm {
        top: 0;
    }
    .handle-tr {
        top: 0;
        right: 0;
    }
    .handle-mr {
        right: 0;
    }
    .handle-br {
        right: 0;
        bottom: 0;
    }
    .handle-bm {
        bottom: 0;
    }
    .handle-bl {
        left: 0;
        bottom: 0;
    }
    .handle-ml {
        left: 0;
    }
</style>