<template>
    <h1>This is login page</h1>
    <form @submit.prevent="logIn()">
        <input v-model="email" placeholder="email" />
        <input v-model="password" placeholder="password" />
        <button type="submit">sign in</button>
        <p v-if="showMessage">succeed!</p>
    </form>
</template>

<script setup>
const email = ref("")
const password = ref("")
const showMessage = ref(false)

const logIn = () => {
    $fetch(`http://localhost:3000/api/v1/login/login`, {
        method: 'POST',
        body: {
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
        console.log(JSON.parse(localStorage.getItem('me')))
        showMessage.value = true
    })
}
</script>