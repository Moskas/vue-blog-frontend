<template>
    <ApolloQuery :query="gql => gql`
    query GetPostBySlug ($slug: String) 
        { postBySlug (slug: $slug) {
            title
            author {
                user {
                    username
                }
            }
            publishDate
            body
        }
    }
    `" :variables="{ slug }">
        <template v-slot="{ result: { loading, error, data } }">
            <!-- Loading -->
            <div v-if="loading" class="loading apollo">Loading...</div>
            <!-- Error -->
            <div v-else-if="error" class="error apollo">An error occurred</div>
            <!-- Result -->
            <div v-else-if="data" class="result apollo">
                <div class="content">
                    <h1>{{ data.postBySlug.title }}</h1>
                    <span class="post-info">Posted on: {{ formatDate(data.postBySlug.publishDate) }} by {{
                        data.postBySlug.author.user.username }}</span>
                    <div v-html="data.postBySlug.body"></div>
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
    data() {
        return {
            slug: 'org-mode-support'
        }
    }
};
</script>