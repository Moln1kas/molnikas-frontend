<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { newWindow } from '../scripts/windowsManager';
import DOMPurify from 'dompurify';
import Card from './common/Card.vue';

interface IBlog {
    id: number;
    title: string;
    content: string;
    updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const blogs = ref<IBlog[]>([]);
const loading = ref(false);
const errorMessage = ref<string | null>(null);

const getBlogsList = async () => {
    loading.value = true;
    errorMessage.value = null;
    try {
        const res = await axios.get(`${API_URL}/blog`, { timeout: 5000 });
        blogs.value = res.data.reverse();
    } catch (err) {
        console.error(err);
        errorMessage.value = 'Ошибка загрузки списка блогов.';
    } finally {
        loading.value = false;
    }
};

const openBlog = async (id: number) => {
    try {
        const res = await axios.get(`${API_URL}/blog/${id}`, { timeout: 5000 });
        newWindow(DOMPurify.sanitize(res.data.title), DOMPurify.sanitize(res.data.content), 400, 500);
    } catch (err) {
        console.error(err);
    }
};

const formatDate = (dateString: string) => {
    try {
        return new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(dateString));
    } catch {
        return 'Некорректная дата';
    }
};

onMounted(getBlogsList);
</script>

<template>
    <div>
        <p v-if="loading">Загрузка...</p>
        <p v-if="errorMessage" class='text-error'>{{ errorMessage }}</p>
        
        <Card v-for="blog in blogs" :key="blog.id">
            <div class="flex justify-between items-center">
                <h3 class='mt-0'>{{ blog.title }}</h3>
                <h3 class='text-foregroundDark font-normal text-base mt-0'>{{ formatDate(blog.updatedAt) }}</h3>
            </div>
            
            <p class="break-words whitespace-pre-line" v-html="DOMPurify.sanitize(blog.content)"></p>
            <button @click="openBlog(blog.id)" class="px-4 py-2 mb-1">
                Открыть
            </button>
        </Card>
    </div>
</template>
