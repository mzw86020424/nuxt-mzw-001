<template>
    <h1>This is signup page</h1>
    <form @submit.prevent="signUp()">
        <input v-model="name" placeholder="name" />
        <input v-model="email" placeholder="email" />
        <input v-model="password" placeholder="password" />
        <button type="submit">sign up</button>
        <p v-if="showMessage">succeed!</p>
    </form>
</template>

<script setup>
const name = ref("")
const email = ref("")
const password = ref("")
const showMessage = ref(false)

const signUp = () => {
    $fetch(`http://localhost:3000/api/v1/users`, {
        method: 'POST',
        body: {
            name: name.value,
            email: email.value,
            password: password.value
        }
    }).catch(e => {
        console.log(e)
    }).then((res) => {
        const data = {
            id: res.id,
            token: res.token
        }
        localStorage.setItem('me', JSON.stringify(data))
        showMessage.value = true
    })
}
</script>