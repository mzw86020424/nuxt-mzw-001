<template>
    <h1> welcome {{ authUser.name }}</h1>
    <div v-for="user in users" :key="user.user.id">
        <user-card
        :user="user.user"
        :authUser="authUser"
        :followsMe="user.follows_me"
        :followedByMe="user.followed_by_me"
        :followerCount="user.follower_count"
        :followeeCount="user.followee_count"
        :tweetCount="user.tweet_count"
        @refreshAll="getUsers()">
        </user-card>
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