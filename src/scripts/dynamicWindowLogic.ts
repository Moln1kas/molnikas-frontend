import { Component, markRaw, reactive } from 'vue';
import Window from '../components/Window.vue';

type window = {
    component: Component,
    content: Component | string,
    title: string,
    color?: string,
    posX?: number,
    posY?: number
}

export const windows = reactive<window[]>([]);

export const newWindow = (title: string, content: Component | string, color?: string, posX?: number, posY?: number) => {
    const range = 32;
    let formattedContent: any;
    if(typeof(content) === 'object') formattedContent = markRaw(content); else formattedContent = content;
    windows.push({
        component: markRaw(Window), 
        content  : formattedContent,
        title    : title,
        color    : color,
        posX     : (posX || 0) + Math.floor(Math.random() * (range - -range + 1)) + -range,
        posY     : (posY || 0) + Math.floor(Math.random() * (range - -range + 1)) + -range
    })
}