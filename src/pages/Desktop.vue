<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import Shortcut from '../components/Shortcut.vue';
    import WindowsManager from '../components/WindowsManager.vue';

    import { newWindow } from '../scripts/windowsManager';

    import Blog from '../components/apps/Blog.vue';
    import Messanger from '../components/apps/Messanger.vue';
    import Music from '../components/apps/Music.vue';
    import AboutMe from '../components/apps/AboutMe.vue';
    import AboutSite from '../components/apps/AboutSite.vue';
    import AdminLogin from '../components/apps/AdminLogin.vue';
    import AdminPanel from '../components/apps/AdminPanel.vue';
    import Terminal from '../components/apps/Terminal.vue';

    import axios from 'axios';


    const API_URI = import.meta.env.VITE_API_URI;

    const gridWidth = ref(1);
    const gridHeight = ref(1);


    const updatePositions = () => {
        gridWidth.value = Math.floor(window.innerWidth / 80);
        gridHeight.value = Math.floor(window.innerHeight / 100);
    }


    const openAdmin = () => {
        const headers = {
            headers: {
                'Authorization': 'a'
            }
        };

        axios.get(`${API_URI}/admin/`, headers)
        .then(_res => {
            newWindow('Админ', AdminPanel, 500, 300);
        })
        .catch(res => {
            if(res.status == 403) return newWindow('Вход', AdminLogin, 300, 200);

            newWindow('Админ-панель', `<p>Произошла ошибка на сервере.</p>`, 280, 100, 'error')
        });
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
        <Shortcut :title="'Блог'" :icon="'blog'" @click="newWindow('Блог', Blog, 250, 100, 'error')"/>
        <Shortcut :title="'Чат'" :icon="'chat'" @click="newWindow('Чат', Messanger, 250, 100, 'error')"/>
        <Shortcut :title="'Плеер'" :icon="'music'" @click="newWindow('Плеер', Music, 250, 100, 'error')"/>
        <Shortcut :title="'Терминал'" :icon="'terminal'" @click="newWindow('Терминал', Terminal, 250, 100, 'error')"/>
        
        <Shortcut :title="'Админка'" :icon="'admin'" @click="openAdmin()"/>
    </div>
</template>