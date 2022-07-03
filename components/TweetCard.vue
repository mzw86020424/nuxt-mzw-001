<template>
    <div v-if="isPublic(tweet)">
        <p>user:{{tweet.user_id}}</p>
        <p>tweet no.{{tweet.id}}</p>
        <p @click="addLike(tweet)">{{tweet.like_count}} likes</p>
        <p v-if="!editable" @click="toggleEdit()">{{tweet.text}}</p>

        <form @submit.prevent="updateText(tweet)" v-if="editable" >
            <input :placeholder="tweet.text" v-model="text" />
            <button type="submit">submit</button>
        </form>
        
        <button @click="deleteTweet(tweet)">delete</button>
        <p>------------------------------</p>
    </div>
</template>

<script setup>
let editable = ref(false)
const text = ref()
// 親から受け取る値
const props = defineProps({
    tweet: Object
})
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
        emit("refreshAll")
    })
}

const deleteTweet = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`, {
        method: 'DELETE'
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit("refreshAll")
    })
}

const addLike = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}/likes`, {
        method: 'POST'
    }).catch(e => {
        console.log(e)
    }).then(() => {
        emit("refreshAll")
    })
}

const isPublic = (tweet) => {
    return tweet.status != "public"
}

const toggleEdit = () => {
    editable.value = !editable.value
}
</script>