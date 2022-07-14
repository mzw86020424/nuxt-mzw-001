<template>
    <div>
        <p>------------------------------</p>
        <h1 v-if="!editable && isMine" @click="toggleEdit()">{{tweet.text}}</h1>
        <h1 v-if="!editable && !isMine">{{tweet.text}}</h1>

        <form v-if="editable" @submit.prevent="updateText(tweet)">
            <input v-model="text" />
            <button type="submit">submit</button>
        </form>

        <p>user:{{tweet.user_id}}</p>

        <p>{{tweet.like_count}} likes     </p>
        <div v-if="!isMine" @click="toggleLike(tweet)">
            <a v-if="liked">★</a>
            <a v-if="!liked">☆</a>
        </div>

        <button v-if="isMine" @click="deleteTweet(tweet)">delete</button>
    </div>
</template>

<script setup>
// 親から受け取る値
const props = defineProps({
    tweet: {},
    authUser: {}
})
// 親が購読している値
const emit = defineEmits()

const thisTweet = ref(props.tweet)
const editable = ref(false)
const liked = ref(props.tweet.liked_by_me)
const text = ref(props.tweet.text)
const isMine = props.tweet.user_id == props.authUser.id

const updateText = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`, {
        method: 'PUT',
        body: {text: text.value},
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        toggleEdit()
        refreshTweet(tweet) 
    })
}

const deleteTweet = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`, {
        method: 'DELETE',
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit('refreshAll')
    })
}

const toggleLike = (tweet) => {
    console.log(liked.value ? 'DELETE':'POST')
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}/likes`, {
        method: liked.value ? 'DELETE':'POST', // likeされているか否かで分岐
        body: {user_id: props.authUser.id},
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        liked.value = !liked.value
        refreshTweet(tweet)
    })
}

const refreshTweet = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`, {
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    })
    .catch(e => {
        console.log(e)
    }).then((res) => {
        // TODO: 更新時にthisTweetに中身が入らない問題
        console.log(res.tweet)
        thisTweet.value = res.tweet
    })
}

const toggleEdit = () => {
    editable.value = !editable.value
}
</script>