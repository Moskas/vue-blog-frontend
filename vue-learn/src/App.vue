<script setup>
import { ref, computed } from 'vue'
import Home from '@/components/Home.vue'
import Stock from '@/components/Stock.vue'
import About from '@/components/About.vue'
import Footer from '@/components/Footer.vue'
import BlogList from '@/components/BlogList.vue'
import NotFound from '@/components/NotFound.vue'
import Post from '@/components/Post.vue'
import WritePost from '@/components/WritePost.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = {
  '/': Home,
  '/blog': BlogList,
  '/about': About,
  '/crypto': Stock,
  '/blog/test': Post,
  '/blog/:slug': Post,
  '/:notFound': NotFound,
  '/admin': WritePost
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
  <main>
    <header>
      <span class="logo">Moskas' Website</span>
      <router-link to="/">Home</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/crypto">Stock</router-link>
      <router-link to="/admin">hmm</router-link>
    </header>
    <router-view />
    <Footer />
  </main>
</template>

<style scoped></style>
