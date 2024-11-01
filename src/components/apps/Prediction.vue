<script lang="ts">
    export default {
        data() {
            return { name: '' }
        },
        methods: {
            checkName() {
                let validname = this.name.toLowerCase()
                let names = ['stishan', 'кирилл', 'karltop']

                for (let i in names) {
                    if(validname === names[i]) {
                        alert('ok')
                    }
                }
            }
        }
    }
</script>

<template>
    <h3>Послание</h3>
    <input v-model="name" placeholder="Ваше имя/псевдоним">
    <button @click="checkName()">Получить</button>
</template>