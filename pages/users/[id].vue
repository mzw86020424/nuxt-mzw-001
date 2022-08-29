<template>
    <div>
        <user-card
        :authUser="authUser"
        :user="user.user"
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
const route = useRoute();
const authUser = ref({ id :"" })
const user = ref({
    user:{},
    follows_me: false,
    followed_by_me: false,
    follower_count: 0,
    followee_count: 0,
    tweet_count: 0,
});

const getUser = () => {
    $fetch(`http://localhost:3000/api/v1/users/${route.params.id}`, {
        headers: {"Authorization" : `Bearer ${authUser.value.token}`}
    }).catch(e => {
        console.log(e)
    }).then((res) => {
        console.log(res)
        user.value = res
    })
}

onMounted( () => {
    authUser.value = JSON.parse(localStorage.getItem('me'));
    getUser();
})

</script>