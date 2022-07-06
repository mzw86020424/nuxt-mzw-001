<template>
    <div v-if="isPublic(thisTweet)">
        <p>user:{{thisTweet.user_id}}</p>
        <p>tweet no.{{thisTweet.id}}</p>
        <a @click="toggleLike(thisTweet)">{{thisTweet.like_count}} likes     </a>
        <a v-if="!liked">☆</a>
        <a v-if="liked">★</a>
        <p v-if="!editable" @click="toggleEdit()">{{thisTweet.text}}</p>

        <form @submit.prevent="updateText(thisTweet)" v-if="editable" >
            <input :placeholder="thisTweet.text" v-model="text" />
            <button type="submit">submit</button>
        </form>
        
        <button @click="deleteTweet(thisTweet)">delete</button>
        <p>------------------------------</p>
    </div>
</template>

<script setup>
const editable = ref(false)
const liked = ref(false)
const text = ref()
const thisTweet = ref(props.tweet)
// 親から受け取る値
const props = defineProps({
    tweet: Object,
    authUser: Object
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
    if (liked.value) {
        $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}/likes`, {
            method: 'DELETE',
            body: {user_id: props.authUser.id}
        }).catch(e => {
            console.log(e)
        }).then(() => {
            liked.value = !liked.value
            refreshTweet(tweet)
        })
    } else {
        $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}/likes`, {
            method: 'POST',
            body: {user_id: props.authUser.id}
        }).catch(e => {
            console.log(e)
        }).then(() => {
            liked.value = !liked.value
            refreshTweet(tweet)
        })
    }
}

const refreshTweet = (tweet) => {
    $fetch(`http://localhost:3000/api/v1/tweets/${tweet.id}`)
    .catch(e => {
        console.log(e)
    }).then((res) => {
        thisTweet.value = res
    })
}

const isPublic = (tweet) => {
    return tweet.status != "public"
}

const toggleEdit = () => {
    editable.value = !editable.value
}

onMounted(() => {
    liked.value = props.tweet.user_id == props.authUser.id
})
</script>