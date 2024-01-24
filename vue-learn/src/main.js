import './assets/main.css'

import { createApp, h } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import VueApolloComponents from '@vue/apollo-components'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: "http://localhost:8000/graphql",
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

const app = createApp({
    render: () => h(App),
})

app.use(apolloProvider)
app.use(VueApolloComponents)

app.mount('#app')
