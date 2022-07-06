<template>
    <div v-for="tweet in tweets" :key="tweet.id">
        <tweet-card :tweet="tweet" :authUser="authUser" @refreshAll="refresh"></tweet-card>
    </div>
</template>

<script setup>
const { data: tweets, refresh } = await useFetch('http://localhost:3000/api/v1/tweets')
// 仮でユーザー設定
const authUser = {
    id: 2,
    name: "hoge",
    email: "fuga@gmail",
}
</script>