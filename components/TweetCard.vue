<template>
    <div>
        <h1 v-if="!editable && isMine" @click="toggleEdit()">{{thisTweet.text}}</h1>
        <h1 v-if="!editable && !isMine">{{thisTweet.text}}</h1>

        <form v-if="editable" @submit.prevent="updateText(thisTweet)">
            <input v-model="text" />
            <button type="submit">submit</button>
        </form>

        <p>user:{{thisTweet.user_id}}</p>

        <p>{{thisTweet.like_count}} likes     </p>
        <div v-if="!isMine" @click="toggleLike(thisTweet)">
            <a v-if="liked">★</a>
            <a v-if="!liked">☆</a>
        </div>

        <button v-if="isMine" @click="deleteTweet(thisTweet)">delete</button>
        <p>------------------------------</p>
    </div>
</template>

<script setup>
// 親から受け取る値
const props = defineProps({
    tweet: Object,
    authUser: Object
})

const editable = ref(false)
const thisTweet = ref(props.tweet)
const liked = ref(thisTweet.value.liked_by_me) // 誰にライクされたかを初期値に持ってこないといけない
const text = ref(thisTweet.value.text)

const isMine = props.tweet.user_id == props.authUser.id

// 親が購読している値
const emit = defineEmits()

const updateText = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`, {
        method: 'PUT',
        body: {text: text.value}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        toggleEdit()
        refreshTweet(tweet) 
    })
}

const deleteTweet = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`, {
        method: 'DELETE'
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit('refreshAll')
    })
}

const toggleLike = (tweet) => {
    if (isMine) {
        return
    }
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}/likes`, {
        method: liked.value ? 'DELETE':'POST', // likeされているか否かで分岐
        body: {user_id: props.authUser.id}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        liked.value = !liked.value
        refreshTweet(tweet)
    })
}

const refreshTweet = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`)
    .catch(e => {
        console.log(e)
    }).then((res) => {
        thisTweet.value = res
    })
}

const toggleEdit = () => {
    if (isMine) {
    editable.value = !editable.value
    }
}
</script>