<script setup lang="ts">
    import { reactive } from 'vue';
    import { newWindow } from '../../scripts/windowsManager';
    import axios from 'axios';
    import AdminPanel from './AdminPanel.vue';

    const loginData = reactive({
        name: '',
        pass: '',
    });

    const API_URI = import.meta.env.VITE_API_URI;

    const login = () => {
        axios.post(`${API_URI}/login`, { name: loginData.name, pass: loginData.pass })
        .then(_ => {
            newWindow('Админ-панель', AdminPanel, 350, 100)
        })
        .catch(res => {
            if(res.status == 403) return newWindow('Ошибка', `<p>Неверное имя пользователя или пароль.</p>`, 350, 100, 'error')

            newWindow('Ошибка', `<p>${res}</p>`, 350, 100, 'error')
        });
        // newWindow('Ошибка', `<p>${loginData.name} ${loginData.pass}</p>`, 350, 100, 'error')
    }
</script>
<template>
    <input v-model="loginData.name" placeholder="логин">
    <input v-model="loginData.pass" placeholder="пароль" type="password">
    <button @click='login'>Войти</button>
</template>