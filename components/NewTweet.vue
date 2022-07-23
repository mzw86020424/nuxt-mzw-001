<template>
    <div>
        <h1 v-if="!formVisible" @click="toggleFormVisible()">+</h1>
        <form v-if="formVisible" @submit.prevent="createTweet()">
            <input v-model="text" placeholder="text here" />
            <button type="submit">tweet</button>
        </form>
    </div>
</template>

<script setup>
// 親から受け取る値
const props = defineProps({
    authUser: {}
})
const text = ref("")
const formVisible = ref(false)

// 親が購読している値
const emit = defineEmits()

const createTweet = () => {
    $fetch(`http://localhost:3000/api/v1/tweets`, {
        method: 'POST',
        body: {
            user_id: props.authUser.id,
            text: text.value,
            status: "public"
            },
        headers: {"Authorization" : `Bearer ${props.authUser.token}`}
    }).catch(e => {
        console.log(e)
    }).then(() => {
        toggleFormVisible();
        emit('refreshAll');
        text.value = "";
    })
}

const toggleFormVisible = () => {
    formVisible.value = !formVisible.value
}
</script>