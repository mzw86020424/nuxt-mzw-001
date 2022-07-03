<template>
    <div v-for="tweet in tweets" :key="tweet.id">
        <tweet-card :tweet="tweet" @refreshAll="refresh"></tweet-card>
    </div>
</template>

<script setup>
const { data: tweets, refresh } = await useFetch('http://localhost:3000/api/v1/tweets')
</script>