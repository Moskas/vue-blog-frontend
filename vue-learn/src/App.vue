<script setup>
import { ref, computed } from 'vue'
import Home from './components/Home.vue'
import BlogList from './BlogList.vue';
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

<script>
import Footer from '@/components/Footer.vue'

//export default {
//  name: 'FooterSection',
//};
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
* {
  font-family: 'JetBrainsMono Nerd Font';
}

header {
  line-height: 1.5;
}

.done {
  text-decoration: line-through;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
