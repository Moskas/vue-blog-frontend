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
        tags {
          name
        }
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
              <span class="post-info">{{ formatDate(post.publishDate) }} by {{
                post.author.user.username.charAt(0).toUpperCase() + post.author.user.username.slice(1) }}, tags:
                <a v-for="(tag, index) in post.tags" :key="index">#{{ tag.name }}<span
                    v-if="index < post.tags.length - 1">&nbsp;</span>
                </a>
              </span>
              <div v-html="post.shortDescription"></div>
              <!-- Use router-link to generate links based on post slug -->
              <router-link :to="{ name: 'post', params: { slug: post.slug } }">Read more</router-link>
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
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const formatDate = (unixTimestamp) => {
      const date = new Date(unixTimestamp);
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      };

      return date.toLocaleString('pl-PL', options);
    };

    return {
      formatDate,
      route,
    };
  },
};
</script>
