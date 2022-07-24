<template>
    <h1>User : {{ authUser.name }}</h1>
    <new-tweet :authUser="authUser" @refreshAll="getTweets()"></new-tweet>
    <div v-for="tweet in tweets" :key="tweet.id">
        <tweet-card
        :tweet="tweet.tweet"
        :liked_by_me="tweet.liked_by_me"
        :like_count="tweet.like_count"
        :authUser="authUser"
        :followed_by_me="tweet.followed_by_me"
        @refreshAll="getTweets()">
        </tweet-card>
    </div>
</template>

<script setup>
const authUser = ref({ id :"" })
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