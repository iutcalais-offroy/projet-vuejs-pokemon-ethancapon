// Faire la liste des pokemons 
<template>
  <div class="form-container">
    <h2 v-if="isLogin">Connexion</h2>
    <h2 v-else>Inscription</h2>
    <form @submit.prevent="isLogin ? login() : register()" class="form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" v-model="password" required class="form-control" />
      </div>
      <button type="submit" class="btn">{{ isLogin ? 'Se connecter' : "S'inscrire" }}</button>
    </form>
    <button @click="toggleForm" class="toggle-btn">{{ isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter' }}</button>
    <p v-if="isLoggedIn" class="status-msg">Vous êtes connecté</p>
    <p v-else class="status-msg">Vous n'êtes pas connecté</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const isLogin = ref(true);
const isLoggedIn = ref(false);
const router = useRouter();

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

const checkIfLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true;
    router.push('/deck-builder');
  } else {
    isLoggedIn.value = false;
  }
};

const login = async () => {
  try {
    const response = await axios.post('https://pokemon-api-seyrinian-production.up.railway.app/users/login', {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    isLoggedIn.value = true;
    router.push('/deck-builder');
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};

const register = async () => {
  try {
    await axios.post('https://pokemon-api-seyrinian-production.up.railway.app/users', {
      email: email.value,
      password: password.value,
    });
    toggleForm();
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
  }
};

onMounted(() => {
  checkIfLoggedIn();
});
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-top: 1rem;
}

.btn:hover {
  background-color: #0056b3;
}

.toggle-btn {
  display: block;
  margin: 1rem auto 0;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.toggle-btn:hover {
  color: #0056b3;
}

.status-msg {
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
}
</style>

