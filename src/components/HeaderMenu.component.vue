<template>
  <n-menu :options="menuOptions" mode="horizontal"/>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

const checkIfLoggedIn = () => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  isLoggedIn.value = false;
  router.push('/login');
};

onMounted(() => {
  checkIfLoggedIn();
});

const menuOptions = computed(() => [
  {
    label: 'DeckBuilder',
    key: 'deck-builder',
    onClick: () => {
      router.push('/pokemon');
    }
  },
  {
    label: 'Mes Decks',
    key: 'deck-collection',
    onClick: () => {
      router.push('/deck-collection');
    }
  },
  isLoggedIn.value
    ? {
        label: 'Se déconnecter',
        key: 'logout',
        onClick: logout
      }
    : {
        label: 'Se connecter',
        key: 'login',
        onClick: () => {
          router.push('/login');
        }
      }
]);
</script>