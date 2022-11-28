<template>
   <q-layout class="app">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>
.app {
  padding: 25px 20px;
}
</style>
 
