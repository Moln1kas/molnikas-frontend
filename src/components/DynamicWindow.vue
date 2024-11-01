<script lang="ts">
    import { markRaw } from 'vue'
    import Window from './Window.vue'

    type window = {
        component: any,
        content: string,
        title: string,
        color?: string,
        posX?: number,
        posY?: number
    }

    export default {
        components: { Window },
        data(): {
            windows: window[] 
        } { return { windows: [] } },
        methods: {
            newWindow(content: string, title: string, color: string, posX: number, posY: number) {
                let range = 32
                this.windows.push({
                        component: markRaw(Window), 
                        content: content,
                        title: title,
                        color: color,
                        posX: (posX || 0) + Math.floor(Math.random() * (range - -range + 1)) + -range,
                        posY: (posY || 0) + Math.floor(Math.random() * (range - -range + 1)) + -range
                })
            }
        }
    }
</script>

<template>
    <component v-for="(window, index) in windows" :color="window['color']" :title="window['title']" :pos-x="window['posX']" :pos-y="window['posY']" :key="index" :is="window['component']">
        <div v-html="window['content']"></div>
    </component>
</template>