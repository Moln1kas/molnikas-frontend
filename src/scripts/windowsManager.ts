import { Component, markRaw, reactive } from 'vue';
import Window from '../components/common/Window.vue';

interface WindowConfig {
  component: Component;
  content: Component | string;
  title: string;
  width: number;
  height: number;
  color?: string;
  posX?: number;
  posY?: number;
  isVisible: boolean;
}

export const windows = reactive<WindowConfig[]>([]);

export const newWindow = (
  title: string,
  content: Component | string,
  width: number,
  height: number,
  color?: string,
  posX?: number,
  posY?: number
) => {
  const formattedContent = typeof content === 'object' ? markRaw(content) : content;

  windows.push({
    component: markRaw(Window),
    content: formattedContent,
    title,
    width,
    height,
    color,
    posX: width / 2 + (posX || 0),
    posY: height / 2 + (posY || 0),
    isVisible: true,
  });
};