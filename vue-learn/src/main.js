import './assets/main.css'
import { createApp, h } from 'vue';
import App from './App.vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';
import VueApolloComponents from '@vue/apollo-components';
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import Home from './components/Home.vue';
import Stock from './components/Stock.vue';
import About from './components/About.vue';
import Footer from './components/Footer.vue';
import BlogList from './components/BlogList.vue';
import NotFound from './components/NotFound.vue';
import Post from './components/Post.vue';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:8000/graphql',
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

const app = createApp({
  render: () => h(App),
});

// Apollo setup
app.use(apolloProvider);
app.use(VueApolloComponents);

// Vue Router setup
const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: BlogList },
  { path: '/about', component: About },
  { path: '/crypto', component: Stock },
  { path: '/blog/:slug', name: 'post', component: Post },
  { path: '/:catchAll(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

// Mount the app
app.mount('#app');
