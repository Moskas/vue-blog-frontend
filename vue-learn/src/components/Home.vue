<template>
    <main>
        <h1>Hello there!</h1>
        <img src="https://moskas.github.io/IMG/kitty.png" class="img-paragraph" alt="Avatar of a white cat">
        <p>
            I'm Moskas, a hobbyist computer programmer from Poland. The website has
            no particular topic other than being mostly tech related. It's mainly a
            place for me to write some thoughts or list my programming or rhythm
            game projects.
        </p>
        <h1>Featured projects</h1>
        <p>
            <a href="https://github.com/Moskas/mpd-notify-rs">mpd notification daemon</a>
            - Simple notification daemon for mpd, it fetches metadata: album,
            artist, title and cover of the album and sends a notification about
            status, song changes etc. Works across all platforms that are supported
            by Rust and mpd.
        </p>
        <p>
            <a href="https://github.com/Moskas/vibepy">vibepy</a> - Small cli
            application written in Python that scrapes YouTube channel/playlist and
            plays random video from given channel/playlist. As name implies it's for
            "vibing" so it's for background noise while you work or relax.
        </p>
        <p>
            <a href="https://github.com/Moskas/wh-dl">wh-dl</a> - Cli application
            written in Rust for querying links for wallpapers from wallhaven.cc
            using it's api and async Rust.
        </p>
        <p>
            <a href="https://github.com/Moskas/nixos-config">Nixos configs</a> - Not
            exacly a programming project, more of a DevOps one. List of
            configurations for systems and services written in Nix programming
            language for reproducable installs and development enviroments across
            all my devices. Even this site has some nix in it!
        </p>
        <h1>Recent blog posts</h1>
        <div class="post">
            <ApolloQuery :query="gql => gql`
      query { latestPosts {
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
                    <div v-else-if="data && data.latestPosts.length > 0" class="result apollo">
                        <div v-for="post in data.latestPosts" :key="post.slug">
                            <div class="post-compact">
                                <router-link :to="{ name: 'post', params: { slug: post.slug } }"> {{ post.title
                                }}</router-link>
                                <span class="post-info"> :: {{ formatDate(post.publishDate) }} by {{
                                    post.author.user.username.charAt(0).toUpperCase() + post.author.user.username.slice(1)
                                }},
                                    tags:
                                    <a v-for="(tag, index) in post.tags" :key="index">#{{ tag.name }}<span
                                            v-if="index < post.tags.length - 1">&nbsp;</span>
                                    </a>
                                </span>
                                <!-- Use router-link to generate links based on post slug -->
                            </div>
                        </div>
                    </div>
                    <!-- No result -->
                    <div v-else class="no-result apollo">No result :(</div>
                </template>
        </ApolloQuery>
        </div>
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
