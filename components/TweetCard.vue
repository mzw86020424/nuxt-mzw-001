<template>
    <div>
        <p>------------------------------</p>
        <h1 v-if="!isMine">{{tweet.text}}</h1>
        <h1 v-if="isMine&&!editable" @click="startEdit()">{{tweet.text}}</h1>
        <form v-if="editable" @submit.prevent="updateText()">
            <input v-model="newText"/>
            <button type="submit">submit</button>
        </form>

        <p>
            user:{{tweet.user_id}}
            <a v-if="followed_by_me&&!isMine">☆</a>
        </p>
        <button v-if="!followed_by_me&&!isMine" @click="toggleFollow()">follow</button>
        <button v-if="followed_by_me&&!isMine" @click="toggleFollow()">unfollow</button>

        <p>{{like_count ? like_count : 0}} likes</p>
        <p v-if="!isMine&&!liked_by_me" @click="toggleLike()">🤍</p>
        <p v-if="!isMine&&liked_by_me" @click="toggleLike()">💜</p>

        <button v-if="isMine" @click="deleteTweet()">delete</button>
    </div>
</template>

<script setup>
// 親が購読している値
const emit = defineEmits()

const props = defineProps({
    tweet: Object,
    like_count: Number,
    liked_by_me: Boolean,
    followed_by_me: Boolean,
    authUser: Object
})

const editable = ref(false)
const newText = ref(props.tweet.text)

const updateText = () => {
    $fetch(`http://localhost:3000/api/v1/tweets/${props.tweet.id}`, {
        method: 'PUT',
        body: {text: newText.value},
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        endEdit()
        emit("refreshAll")
    })
}

const deleteTweet = () => {
    $fetch(`http://localhost:3000/api/v1/tweets/${props.tweet.id}`, {
        method: 'DELETE',
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit('refreshAll')
    })
}

const toggleLike = () => {
    const method = props.liked_by_me ? "DELETE" : "POST";
    $fetch(`http://localhost:3000/api/v1/tweets/${props.tweet.id}/likes`, {
        method: method,
        body: {user_id: props.authUser.id},
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit('refreshAll')
    })
}

const toggleFollow = () => {
    const method = props.followed_by_me ? "DELETE" : "POST";
    $fetch(`http://localhost:3000/api/v1/users/${props.authUser.id}/relationships`, {
        method: method,
        body: {followee_id: props.tweet.user_id},
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit('refreshAll')
    })
}

const startEdit = (()=>{
    editable.value = true
})

const endEdit = (()=>{
    editable.value = false
})

const isMine = computed(()=>{
    return props.authUser.id == props.tweet.user_id
})
</script>