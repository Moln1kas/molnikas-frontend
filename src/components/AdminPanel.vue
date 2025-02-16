<script setup lang="ts">
  import axios from 'axios';
  import { newWindow } from '../scripts/windowsManager';
  import { onMounted, ref } from 'vue';

  import Card from './common/Card.vue';
  import Login from './Login.vue';
import Whitelist from './admin/Whitelist.vue';

  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = localStorage.getItem('token');

  const isAuth = ref<Boolean>();

  onMounted(async () => {
    if (!TOKEN) isAuth.value = false;
    try {
      await axios.get(`${API_URL}/auth/isAdmin`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });

      isAuth.value = true;
    } catch(err) {
      isAuth.value = false;
    }
  })

  const getPlayersList = async (url, windowTitle) => {
      try {
          const res = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${TOKEN}`
            }
          });

          if (res.data.players && res.data.players.length > 0) {
              const window = res.data.players.map(player => `<p>${player}</p>`).join('');
              const totalPlayers = `<h3>Всего ${res.data.players.length} игроков</h3>`;
              const windowContent = totalPlayers + window;

              newWindow(windowTitle, windowContent, 300, 300);
          } else {
              newWindow(windowTitle, '<p>Список пуст</p>', 300, 300);
          }
      } catch (err) {
          newWindow('Ошибка', `<p>Не удалось загрузить данные.</p>`, 300, 300, 'error');
      }
  };

  const getOnline = async () => getPlayersList(`${API_URL}/mc/online/list`, 'Онлайн');

  const getWhitelist = async () => getPlayersList(`${API_URL}/mc/whitelist`, 'Белый список');
</script>

<template>
  <div v-if="isAuth">
    <Card>
      <h3 class='mt-0'>Онлайн</h3>
      <button class='mb-1' @click="getOnline()">Получить</button>
    </Card>

    <Card class="bg-backgroundPrimary">
      <h3 class='mt-0'>Белый список</h3>
      <button class='mb-1' @click="getWhitelist()">Получить</button>
      <button class='mb-1' @click="newWindow('Белый список', Whitelist, 290, 238);">Управлять</button>
    </Card>
  </div>

  <Login v-else/>
</template>