<template>
    <new-tweet :authNUser="authNUser" @refreshAll="refresh"></new-tweet>
    <div v-for="tweet in tweets" :key="tweet.id">
        <tweet-card :tweet="tweet" :authNUser="authNUser" @refreshAll="refresh"></tweet-card>
    </div>
</template>

<script setup>
const authNUser = ref({id:""})
const { data: tweets, refresh } = await useFetch(`http://localhost:3000/api/v1/tweets`)

onMounted(() => {
    authNUser.value = JSON.parse(localStorage.getItem('me'));
})
</script>