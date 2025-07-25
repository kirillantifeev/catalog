<template>
  <Header/>

  <router-view>
            
  </router-view>
</template>

<script setup>
import Comparsion from '@/components/Сomparison.vue'
import Header from './components/Header.vue';

</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Roboto', sans-serif;
}

</style>
