<script setup lang="ts">
    import Window from './components/Window.vue'
    import DynamicWindow from './components/DynamicWindow.vue'
    import Prediction from './components/apps/Prediction.vue'
    import Config from '../config.json'
</script>

<script lang="ts">
    interface WindowRef {
        newWindow: (arg1: string, arg2: string, arg3: string, arg4: number, arg5: number) => void
    }

    export default {
        components: {
            Window, Prediction, DynamicWindow
        },
        data(): {
                name: String,
                pass: String,
                window: any
        } { 
            return {
                name: '', 
                pass: '',
                window: undefined
            }
        },
        mounted() {
            this.window = this.$refs.window as WindowRef
        },
        methods: {
            tryLogin() {
                if (this.name.length > 0 && this.pass.length > 0) {
                    let data = {username: this.name, password: this.pass}
                    this.axios.post(`${Config.apiAddr}/api/admin/login`, data)
                        .then(res => {
                            localStorage.setItem('token', res.data.token);
                            this.$router.push('/admin/dashboard')
                        })
                        .catch(err => {
                            this.window.newWindow(`<p>${err.response.data.message}</p>`, 'Ошибка', 'error')
                        })
                } else {
                    this.window.newWindow('<p>Заполните все текстовые поля.</p>', 'Ошибка', 'error')
                }
            }
        }
    }
</script>

<template>
    <Window :title="'Вход'" :resize="false">
        <input v-model="name" placeholder="Логин">
        <input v-model="pass" placeholder="Пароль" type="password">
        <button @click="tryLogin()">Войти</button>
    </Window>
    <DynamicWindow ref="window"/>
</template>