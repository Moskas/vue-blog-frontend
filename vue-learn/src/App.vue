<script setup>
import { ref, computed } from 'vue'
import Home from '@/components/Home.vue'
import Stock from '@/components/Stock.vue'
import About from '@/components/About.vue'
import Footer from '@/components/Footer.vue'
import BlogList from '@/components/BlogList.vue'
import NotFound from '@/components/NotFound.vue'
import Post from './components/Post.vue'

const routes = {
  '/': Home,
  '/blog': BlogList,
  '/about': About,
  '/crypto': Stock,
  '/blog/test': Post,
  '/:notFound': NotFound,
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
    <a href="#/about">About</a>
    <a href="#/crypto">Stock</a>
  </header>
  <component :is="currentView" />
  <Footer />
</template>

<style scoped>

</style>
