<script setup lang="ts">
    import dayjs from 'dayjs';
    import duration from "dayjs/plugin/duration";
    import { onMounted, ref } from 'vue';

    dayjs.extend(duration);

    const date = dayjs(`${dayjs().year()}-12-31T23:59:59`);
    const left = ref('');

    const count = () => {
        const now = dayjs();
        const diff = date.diff(now);
        const dur = dayjs.duration(diff);

        const d = String(dur.days()).padStart(2, '0')
        const h = String(dur.hours()).padStart(2, '0'); 
        const m = String(dur.minutes()).padStart(2, '0');
        const s = String(dur.seconds()).padStart(2, '0');

        left.value = `${d}:${h}:${m}:${s}`;
    }

    onMounted(() => {
        count();
        setInterval(count);
    });
</script>
<template>
    <p class='w-full text-justify'>До нового года:</p>
    <h2 class='text-3xl mb-0'>{{ left }}</h2>
</template>