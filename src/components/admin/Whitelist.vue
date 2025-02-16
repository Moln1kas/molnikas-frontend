<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { newWindow } from '../../scripts/windowsManager';
  import axios from 'axios';

  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = localStorage.getItem('token');

  const name = ref<string>('');
  const isWhitelistEnabled = ref<boolean>(false);

  const addPlayerToWhitelist = async () => {
      if(name.value.length === 0) {
          return newWindow('Ошибка', `<p>Заполните все доступные поля.</p>`, 250, 120, 'error');
      }

      try {
          const res = await axios.post(`${API_URL}/mc/whitelist`, {
              username: name.value,
          }, {
            headers: {
              Authorization: `Bearer ${TOKEN}`
            }
          });

          newWindow('Успешно', `<p>${res.data.message}</p>`, 250, 120, 'success');
      } catch (err) {
          console.error(err);
          newWindow('Ошибка', `<p>${err}</p>`, 250, 120, 'error');
      }
  }

  const removePlayerFromWhitelist = async () => {
      if(name.value.length==0) {
          return newWindow('Ошибка', `<p>Заполните все доступные поля.</p>`, 250, 120, 'error');
      }

      try {
          const res = await axios.delete(`${API_URL}/mc/whitelist/${name.value}`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`
            }
          });

          newWindow('Успешно', `<p>${res.data.message}</p>`, 250, 120, 'success');
      } catch (err) {
          console.error(err);
          newWindow('Ошибка', `<p>${err}</p>`, 250, 120, 'error');
      }
  }

  const getWhitelistStatus = async () => {
    try {
      const res = await axios.get(`${API_URL}/mc/whitelist/status`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });
      return res.data.status;
    } catch (err) {
      console.error(err);
    }
  }

  const toggleWhitelist = async () => {
    try {
      const res = await axios.get(`${API_URL}/mc/whitelist/toggle`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });

      isWhitelistEnabled.value = !isWhitelistEnabled.value;

      newWindow('Успешно', `<p>${res.data.message}</p>`, 220, 100, 'success');
    } catch (err) {
      newWindow('Ошибка', `<p>${err}</p>`, 220, 100, 'error');
    }
  }

  onMounted(async() => {
    isWhitelistEnabled.value = await getWhitelistStatus();
  })
</script>

<template>
  <div>
    <h3>Управление белым списком</h3>
    <input v-model="name" placeholder="Никнейм">
    <div class='flex'>
      <button class='redButton mr-0.5 mb-1' @click="removePlayerFromWhitelist()">Удалить</button>
      <button class="ml-0.5 mb-1" @click="addPlayerToWhitelist()">Добавить</button>
    </div>
    <button class='mb-1 mt-1' @click="toggleWhitelist">{{ isWhitelistEnabled ? 'Выключить' : 'Включить' }}</button>
  </div>
</template>