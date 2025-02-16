<script setup lang="ts">
    import { reactive } from 'vue';
    import { newWindow } from '../scripts/windowsManager';
    import axios from 'axios';

    const loginData = reactive({
        name: '',
        pass: '',
    });

    const API_URL = import.meta.env.VITE_API_URL;

    const login = () => {
        if (loginData.name === '' || loginData.pass === '') return newWindow('Ошибка', `<p>Заполните все поля.</p>`, 350, 100, 'error')

        axios.post(`${API_URL}/auth/login`, { email: loginData.name, password: loginData.pass })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            newWindow('Успешно', `<p>Вы успешно вошли в аккаунт!</p><p>${res.data.message}</p>`, 300, 130, 'success')
        })
        .catch(error => {
            if(error.status == 403) return newWindow('Ошибка', `<p>Неверное имя пользователя или пароль.</p>`, 350, 100, 'error')

            newWindow('Ошибка', `<p>${error.response.data.message}</p>`, 350, 100, 'error')
        });
    }
</script>
<template>
    <h3>Вход в аккаунт</h3>
    <input v-model="loginData.name" placeholder="Почта">
    <input v-model="loginData.pass" placeholder="Пароль" type="password">
    <button @click='login'>Войти</button>
</template>