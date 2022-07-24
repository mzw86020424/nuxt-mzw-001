<template>
    <h1> welcome {{ authUser.name }}</h1>
    <div v-for="user in users" :key="user.id">
        <p>----------------------------------</p>
        <p>{{user.name}}</p>
            <!-- <tweet-card
            :tweet="tweet.tweet"
            :authUser="authUser"
            :followed_by_me="tweet.followed_by_me"
            @refreshAll="getTweets()">
            </tweet-card> -->
    </div>
</template>

<script setup>
const authUser = ref({ id :"" })
const users = ref()

const getUsers = () => {
    $fetch("http://localhost:3000/api/v1/users", {
        headers: {"Authorization" : `Bearer ${authUser.value.token}`}
    }).catch(e => {
        console.log(e)
    }).then((res) => {
        users.value = res
    })
}

onMounted(() => {
    authUser.value = JSON.parse(localStorage.getItem('me'));
    getUsers()
})
</script>