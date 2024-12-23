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

export const windows = reactive<window[]>([]);

export const newWindow = (
    title: string, 
    content: Component | string, 
    width: number, 
    height: number, 
    color?: string, 
    posX?: number, 
    posY?: number
) => {
    let formattedContent: any;

    if(typeof(content) === 'object') formattedContent = markRaw(content); else formattedContent = content;

    windows.push({
        component: markRaw(Window), 
        content  : formattedContent,
        title    : title,
        width    : width,
        height   : height,
        color    : color,
        posX     : width/2 + (posX || 0),
        posY     : height/2 + (posY || 0),
    })
}