<script setup>
import { ref } from 'vue'

let id = 0
const posts = ref([
  { id: id++, title: 'Test blog', description: 'A test blog element' },
  {
    id: id++,
    title: 'Test blog',
    description: 'A test blog element !'
  },
  { id: id++, title: 'Second Test', description: 'Lorem Hipsum' },
  { id: id++, title: 'Third Test', description: 'A small description' }
])
</script>
<template>
  <h1>Blog Posts</h1>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <span style="white-space: pre-line">{{ post.description }}</span>
    </li>
  </ul>
</template>
