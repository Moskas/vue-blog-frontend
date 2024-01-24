<script setup>
</script>
<template>
  <main>
    <p>List of my blog posts, they are also available as an RSS feed <a href="localhost:8000/feed">here</a>.</p>
    <ApolloQuery :query="gql => gql`
      query { allPosts {
        title
        author {
          user {
            username
          }
        }
        publishDate
        slug
        shortDescription
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
              <span class="post-info">{{ formatDate(post.publishDate) }} by {{ post.author.user.username }}</span>
              <div v-html="post.shortDescription"></div>
              <a href="#/blog/test">Read more</a>
            </div>
          </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </main>
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