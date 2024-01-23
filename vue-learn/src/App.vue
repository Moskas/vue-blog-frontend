<script setup>
import { ref, computed } from 'vue'
import Home from './components/Home.vue'
import BlogList from './components/BlogList.vue';
import Footer from '@/components/Footer.vue'

const routes = {
  '/': Home,
  '/blog': BlogList,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <header>
    <span class="logo">Moskas' Website</span>
    <a href="#/">Home</a>
    <a href="#/blog">Blog</a>
  </header>
  <component :is="currentView" />
  <Footer />
</template>

<style scoped>

</style>
