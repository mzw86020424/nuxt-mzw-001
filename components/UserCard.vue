<template>
    <div v-if="authUser.id != user.id">
        <h1>{{user.name}}</h1>
        <h3>ツイート数 {{tweetCount}}</h3>
        <p>{{followeeCount}}フォロー  {{followerCount}}フォロワー</p>
        <button v-if="!followedByMe" @click="toggleFollow()">follow</button>
        <button v-if="followedByMe" @click="toggleFollow()">unfollow</button>
        <h6 v-if="followsMe">フォローされています</h6>
    </div>
</template>

<script setup>
const emit = defineEmits()
const props = defineProps({
    authUser: Object,
    user: Object,
    followsMe: Boolean,
    followedByMe: Boolean,
    followerCount: Number,
    followeeCount: Number,
    tweetCount: Number,
})

const toggleFollow = () => {
    const method = props.followedByMe ? "DELETE" : "POST";
    $fetch(`http://localhost:3000/api/v1/users/${props.authUser.id}/relationships`, {
        method: method,
        body: {followee_id: props.user.id},
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit('refreshAll')
    })
}

</script>