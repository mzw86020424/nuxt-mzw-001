<template>
    <new-tweet :authUser="authUser" @refreshAll="refresh"></new-tweet>
    <div v-for="tweet in tweets" :key="tweet.id">
        <tweet-card :tweet="tweet" :authUser="authUser" @refreshAll="refresh"></tweet-card>
    </div>
</template>

<script setup>
    // 仮でユーザー設定
const authUser = {
    id: 1
}
const { data: tweets, refresh } = await useFetch(`http://localhost:3000/api/v1/tweets`)

</script>