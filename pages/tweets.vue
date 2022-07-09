<template>
    <new-tweet :authUser="authUser" @refreshAll="refresh"></new-tweet>
    <div v-for="tweet in tweets" :key="tweet.id">
        <tweet-card :tweet="tweet" :authUser="authUser" @refreshAll="getTweets()"></tweet-card>
    </div>
</template>

<script setup>
const authUser = ref({id:"", token:""})
const tweets = ref()

const getTweets = () => {
    $fetch("http://localhost:3000/api/v1/tweets", {
        headers: {"Authorization" : `Bearer ${authUser.value.token}`}
    }).catch(e => {
        console.log(e)
    }).then((res) => {
        tweets.value = res
    })
}

onMounted(() => {
    authUser.value = JSON.parse(localStorage.getItem('me'));
    getTweets()
})
</script>