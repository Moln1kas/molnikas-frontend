<script setup lang="ts">
    import Window from './components/Window.vue';
    import Shortcut from './components/Shortcut.vue';
    import Blog from './components/apps/Blog.vue';
    import DynamicWindow from './components/DynamicWindow.vue';

    import nocturne from './assets/sounds/nocturne_no20.mp3';
    import { newWindow } from './scripts/dynamicWindowLogic';

    import { onMounted, ref } from 'vue';

    const isPlaying = ref(false);
    const gridWidth = ref(1);
    const gridHeight = ref(1);

    const music = new Audio(nocturne);

    const toggleMusic = () => {
        if(!isPlaying.value) {
            music.play().catch(err => {
                console.error('Error playing sound:', err);
            });
        } else {
            music.pause();
        }

        isPlaying.value = !isPlaying.value;
    }

    const updatePositions = () => {
        gridWidth.value = Math.floor(window.innerWidth / 80);
        gridHeight.value = Math.floor(window.innerHeight / 80);
    }
    onMounted(() => {
        window.addEventListener("resize", updatePositions);
        updatePositions();
    });
</script>

<template>
    <Window :title="'Moln1kas'" :resize="false">
        <h3>Добро пожаловать!</h3>
        <p>Сейчас я только разрабатываю этот сайт,<br> а значит, еще многое впереди. ;)</p>
        <p>Следите за изменениями в приложении "Блог".</p>
        <p>Оставьте мне пару ласковых слов в приложении "Мессенджер".</p>
        <button v-on:click="toggleMusic()">{{ isPlaying ? 'Выключить' : 'Включить' }} классическую музыку</button>
    </Window>

    <DynamicWindow />
    
    <div class="desktop" :style="{
        width: '100%',
        height: '100%',

        display: 'grid',
        gridTemplateColumns: `repeat(${gridWidth}, 80px)`,
        gridTemplateRows: `repeat(${gridHeight}, 80px)`,
    }">
        <Shortcut :title="'Блог'" @click="newWindow('Блог', Blog)"/>
        <Shortcut :title="'Мессенджер'" @click="newWindow('Мессенджер', Blog)"/>
        
    </div>
</template>

<style lang="scss">
</style>