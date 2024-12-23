<script setup lang="ts">
    import { newWindow } from '../../scripts/dynamicWindowLogic';

    const login = () => {
        newWindow('Ошибка', '<p>Данный функционал пока не реализован.</p>', 350, 100, 'error')
    }
</script>
<template>
    <input placeholder="логин">
    <input placeholder="пароль">
    <button @click='login'>Войти</button>
</template>