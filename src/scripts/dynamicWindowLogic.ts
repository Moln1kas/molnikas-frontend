import { Component, markRaw, reactive } from 'vue';
import Window from '../components/Window.vue';

type window = {
    component: Component,
    content: Component | string,
    title: string,
    width: number | string,
    height: number | string,
    color?: string,
    posX?: number,
    posY?: number
}

const randomWithRange = (min: number, max: number) => {
    return Math.floor(Math.random() * max + min)
}

export const windows = reactive<window[]>([]);

export const newWindow = (title: string, content: Component | string, width: number, height: number, color?: string, posX?: number, posY?: number) => {
    const range = 32;
    let formattedContent: any;

    if(typeof(content) === 'object') formattedContent = markRaw(content); else formattedContent = content;

    windows.push({
        component: markRaw(Window), 
        content  : formattedContent,
        title    : title,
        width    : width,
        height   : height,
        color    : color,
        posX     : (posX || 0) + randomWithRange(-range, range),
        posY     : (posY || 0) + randomWithRange(-range, range),
    })
}