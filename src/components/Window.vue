<script setup lang="ts">
    import { defineProps, onMounted, onUnmounted, reactive, ref } from 'vue';

    const props = defineProps({
        title : String,
        resize: Boolean,
        width : Number,
        height: Number,
        color : String,
        posX  : Number,
        posY  : Number,
    });
    
    const state = reactive({
        seen: true,
    });

    const isCompact = ref(false);

    onMounted(() => {
        updatePositions();
        checkDevice();
        window.addEventListener('load', updatePositions);
        window.addEventListener("resize", updatePositions);
    });

    const checkDevice = () => {
        isCompact.value = window.innerWidth <= 768;
    };

    /**
     * Updates the positions of all windows on the screen.
     */
    const updatePositions = () => {
        checkDevice();
    }

    const closeWindow = () => {
        state.seen = false;
    }
</script>

<template>
    <vue-draggable-resizable 
        :resizable="resize"
        :drag-handle="'.drag-handle'"
        :parent="true"
        :w="props.width"
        :h="props.height"
        v-if="!isCompact && state.seen"
    >
        <div class='h-full bg-background shadow-[inset_0_0_0_1px_black] overflow-hidden flex flex-col'>
            <header :class="`bg-accent select-none text-foregroundPrimary flex p-2 ps-3 pe-3 text-sm drag-handle shadow-[inset_0_0_0_1px_black] active:shadow-[inset_0_0_0_1px_white] cursor-pointer active:cursor-move sticky top-0 z-10`">
                <div class='w-full p-0.5 text-sm'>{{ title }}</div>
                <div class='w-full flex justify-end'>
                    <button class='w-9 h-6 p-0.5 text-xs bg-foregroundPrimary text-background' @click="closeWindow">
                        <img src="../assets/cross.svg" width="18px">
                    </button>
                </div>
            </header>
            <div class='flex-1 overflow-y-auto p-3 text-foregroundPrimary box-border'>
                <slot />
            </div>
        </div>
    </vue-draggable-resizable>

    <div class='fixed flex flex-col w-full h-full bg-background' v-if="isCompact && state.seen">
        <div class='p-3 text-foregroundPrimary h-full overflow-y-auto'>
            <slot />
        </div>
        <div class='flex p-2 ps-3 pe-3 mt-auto bg-backgroundPrimary border-t'>
            <button class='w-10 h-7 p-0.5 text-xs' @click="closeWindow"><img src="../assets/cross.svg" width="18px"></button>
            <div class='w-full flex justify-end items-center p-0.5 text-base text-foregroundPrimary'>{{ title }}</div>
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