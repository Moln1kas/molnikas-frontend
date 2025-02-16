<script setup lang="ts">
    import file from '../assets/file.svg';
    import chat from '../assets/chat.svg';
    import blog from '../assets/blog.svg';
    import music from '../assets/music.svg';
    import human from '../assets/human.svg';
    import admin from '../assets/admin.svg';
    import terminal from '../assets/terminal.svg';
    import desktop from '../assets/desktop.svg';
    import present from '../assets/present.svg';
    import minecraft from '../assets/minecraft.svg';

    const props = defineProps({
        title: String,
        icon: String
    });

    const icons = {
        file: file,
        chat: chat,
        blog: blog,
        music: music,
        human: human,
        admin: admin,
        terminal: terminal,
        desktop: desktop,
        present: present,
        minecraft: minecraft,
    }

    const getIcon = () => {
        return icons[props.icon || file];
    };
</script>

<template>
    <div class='flex flex-col justify-center items-center cursor-pointer hover:bg-accent'>
        <img class='mb-2' :src='getIcon()' width="52px" height="52px">
        <p class='w-full text-foregroundPrimary text-center m-0 overflow-hidden'>{{ props.title }}</p>
    </div>
</template>