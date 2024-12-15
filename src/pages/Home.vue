<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import Window from '../components/Window.vue';
    import Shortcut from '../components/Shortcut.vue';
    import WindowsManager from '../components/WindowsManager.vue';

    import { newWindow } from '../scripts/dynamicWindowLogic';

    import Blog from '../components/apps/Blog.vue';
    import Messanger from '../components/apps/Messanger.vue';
    import Music from '../components/apps/Music.vue';
    import AboutMe from '../components/apps/AboutMe.vue';
    import AboutSite from '../components/apps/AboutSite.vue';
    import AdminLogin from '../components/apps/AdminLogin.vue';
    import AdminPanel from '../components/apps/AdminPanel.vue';

    import axios from 'axios';

    const API_URI = import.meta.env.VITE_API_URI;

    const gridWidth = ref(1);
    const gridHeight = ref(1);

    const updatePositions = () => {
        gridWidth.value = Math.floor(window.innerWidth / 80);
        gridHeight.value = Math.floor(window.innerHeight / 100);
    }
    onMounted(() => {
        window.addEventListener("resize", updatePositions);
        updatePositions();

        newWindow(
            'moln1kas', 
            `<p>ABOBA</p>`,
            300,
            200
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
        <Shortcut :title="'О сайте'" :icon="'desktop'" @click="newWindow('О сайте', AboutSite, 100, 100)"/>
        <Shortcut :title="'Блог'" :icon="'blog'" @click="newWindow('Блог', Blog, 100, 100)"/>
        <Shortcut :title="'Чат'" :icon="'chat'" @click="newWindow('Чат', Messanger, 100, 100)"/>
        <Shortcut :title="'Плеер'" :icon="'music'" @click="newWindow('Плеер', Music, 100, 100)"/>
        <Shortcut :title="'Терминал'" :icon="'terminal'"/>
        
        <Shortcut :title="'Админка'" :icon="'admin'" @click="
            axios.get(`${API_URI}/api/v1/admin`)
                .then(res => {
                    newWindow('Админ', AdminPanel, 100, 100);
                })
                .catch(res => {
                    if(res.status == 403) return newWindow('Вход', AdminLogin, 100, 100);

                    newWindow('Ошибка', '<p>Произошла ошибка.</p>', 240, 80, 'error')
                });
        "/>
    </div>
</template>