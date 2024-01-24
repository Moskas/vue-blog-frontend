<script setup>
</script>
<template>
  <h1>Latest blog posts</h1>
  <ApolloQuery :query="gql => gql`
      query { allPosts {
        title
        publishDate
        slug
        body
      }
    }
    `">
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>
      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>
      <!-- Result -->
      <div v-else-if="data && data.allPosts.length > 0" class="result apollo">
        <div v-for="post in data.allPosts" :key="post.slug">
          <div class="post">
            <h2>{{ post.title }}</h2>
            <p>{{ formatDate(post.publishDate) }}</p>
            <div v-html="post.body"></div>
          </div>
        </div>
      </div>
      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>
<script>
export default {
  methods: {
    formatDate(unixTimestamp) {
      const date = new Date(unixTimestamp);
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      };

      return date.toLocaleString('pl-PL', options);
    },
  },
};
</script>