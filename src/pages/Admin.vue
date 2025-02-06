<script setup lang="ts">
    import Window from '../components/Window.vue';
    import DynamicWindow from '../components/WindowsManager.vue';
    import { newWindow } from '../scripts/windowsManager';
    import Config from '../../config.json';

    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const router = useRouter();

    const state = reactive({
        name: '',
        pass: '',
    });

    const window: any = ref(null);

    const tryLogin = () => {
        if(state.name.length === 0 || state.pass.length === 0) return newWindow('Ошибка', '<p>Заполните все текстовые поля.</p>', 100, 100, 'error');

        const data = { username: state.name, password: state.pass }
        axios.post(`${Config.apiAddr}/api/admin/login`, data)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            router.push('/admin/dashboard');
        })
        .catch(err => {
            newWindow('Ошибка', `<p>${err.response.data.message}</p`, 100, 100, 'error');
        });
    }
</script>

<template>
    <Window :title="'Вход'" :resize="false">
        <input v-model="state.name" placeholder="Логин">
        <input v-model="state.pass" placeholder="Пароль" type="password">
        <button @click="tryLogin()">Войти</button>
    </Window>
    <DynamicWindow ref="window"/>
</template>