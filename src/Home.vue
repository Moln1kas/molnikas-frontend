<script setup lang="ts">
    import { ref } from 'vue';
    import Window from './components/Window.vue';
    import Shortcut from './components/Shortcut.vue';
    import nocturne from './assets/sounds/nocturne_no20.mp3';

    const isPlaying = ref(false);
    const gridWidth = ref(1);
    const gridHeight = ref(1);

    const music = new Audio(nocturne);

    const toggleMusic = () => {
        if(!isPlaying.value) {
            music.play().catch((error) => {
                console.error('Error playing sound:', error);
            });
        } else {
            music.pause();
        }

        isPlaying.value = !isPlaying.value;
    }

    const updatePositions = () => {
        gridWidth.value = Math.floor(window.innerWidth / 64)
        gridHeight.value = Math.floor(window.innerHeight / 96)
    }

    updatePositions()

    window.addEventListener("resize", updatePositions)
</script>

<template>
    <Window :title="'Moln1kas'" :resize="false">
        <h3>Добро пожаловать!</h3>
        <p>Сейчас я только разрабатываю этот сайт,<br> а значит, еще многое впереди. ;)</p>
        <p>Следите за изменениями в приложении "Блог".</p>
        <p>Оставьте мне пару ласковых слов в приложении "Мессенджер".</p>
        <button v-on:click="toggleMusic()">{{ isPlaying ? 'Выключить' : 'Включить' }} классическую музыку</button>
    </Window>
    
    <div class="desktop" :style="{
        width: '100%',
        height: '100%',

        display: 'grid',
        gridTemplateColumns: `repeat(${gridWidth}, 64px)`,
        gridTemplateRows: `repeat(${gridHeight}, 96px)`,
    }">
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        <Shortcut :title="'aaa'" />
        
    </div>
</template>

<style lang="scss">
</style>