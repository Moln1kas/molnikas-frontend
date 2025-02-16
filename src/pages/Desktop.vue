<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import Shortcut from '../components/Shortcut.vue';
    import WindowsManager from '../components/common/WindowsManager.vue';

    import { newWindow } from '../scripts/windowsManager';

    import Blog from '../components/Blog.vue';
    import Messanger from '../components/Messanger.vue';
    import Music from '../components/Music.vue';
    import AboutMe from '../components/AboutMe.vue';
    import AboutSite from '../components/AboutSite.vue';
    import AdminPanel from '../components/AdminPanel.vue';
    import Terminal from '../components/Terminal.vue';

    const gridWidth = ref(1);
    const gridHeight = ref(1);


    const updatePositions = () => {
        gridWidth.value = Math.floor(window.innerWidth / 80);
        gridHeight.value = Math.floor(window.innerHeight / 100);
    }


    const openAdmin = () => {
        newWindow('Админ', AdminPanel, 500, 350)
    }


    onMounted(() => {
        window.addEventListener("resize", updatePositions);
        updatePositions();

        newWindow(
            'moln1kas', 
            `
                <p class='mt-0'>Добро пожаловать!</p>
                <p>
                    Данный сайт сейчас находится в разработке, прошу вас сообщать об ошибках в <a href="https://github.com/Moln1kas/molnikas-frontend">репозитории сайта</a>.
                </p>
            `,
            450,
            140
        );
    });
</script>

<template>
    <WindowsManager />

    <div class='w-full h-full grid select-none overflow-hidden' :style="{
        gridTemplateColumns: `repeat(${gridWidth}, 80px)`,
        gridTemplateRows: `repeat(${gridHeight}, 100px)`,
    }">
        <Shortcut :title="'Обо мне'" :icon="'human'" @click="newWindow('Обо мне', AboutMe, 640, 360)"/>
        <Shortcut :title="'О сайте'" :icon="'desktop'" @click="newWindow('О сайте', AboutSite, 200, 100)"/>
        <Shortcut :title="'Блог'" :icon="'blog'" @click="newWindow('Блог', Blog, 500, 500)"/>
        <Shortcut :title="'Чат'" :icon="'chat'" @click="newWindow('Чат', Messanger, 250, 100, 'error')"/>
        <Shortcut :title="'Плеер'" :icon="'music'" @click="newWindow('Плеер', Music, 250, 100, 'error')"/>
        <Shortcut :title="'Терминал'" :icon="'terminal'" @click="newWindow('Терминал', Terminal, 250, 100, 'error')"/>
        
        <Shortcut :title="'Админка'" :icon="'admin'" @click="openAdmin()"/>
    </div>
</template>