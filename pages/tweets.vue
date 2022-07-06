<template>
    <h1 v-if="!formVisible" @click="toggleFormVisible()">+</h1>

    <form v-if="formVisible" @submit.prevent="createTweet()">
        <input v-model="text" />
        <button type="submit">submit</button>
    </form>

    <div v-for="tweet in tweets" :key="tweet.id">
        <tweet-card :tweet="tweet" :authUser="authUser" @refreshAll="refresh"></tweet-card>
    </div>
</template>

<script setup>
    // 仮でユーザー設定
const authUser = {
    id: 2,
    name: "hoge",
    email: "fuga@gmail",
}

const formVisible = ref(false)

const { data: tweets, refresh } = await useFetch(`http://localhost:3000/api/v1/tweets`)

const toggleFormVisible = () => {
    formVisible.value = !formVisible.value
}

const createTweet = () => {
    
}

</script>