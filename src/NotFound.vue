<script lang="ts">
    export default {
        data(): {
            time: number
        } {return{time: 5}},
        mounted() {
            setInterval(() => {
                if (this.time > 1) this.time--
                else this.$router.push('/')
            }, 1000)
        }
    }
</script>
<script setup lang="ts">
    import Window from './components/Window.vue'
</script>


<template>
    <Window :title="'Ошибка 404'" :resize="false" :color="'error'">
        <p>Ресурс {{ $route.path }} не найден.</p>
        <p>Переадрессация на главную страницу через <b>{{ time }}</b></p>
    </Window>
</template>