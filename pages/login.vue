<template>
    <h1>This is login page</h1>
    <form @submit.prevent="logIn()">
        <input v-model="email" placeholder="email" />
        <input v-model="password" placeholder="password" />
        <button type="submit">sign in</button>
        <p v-if="showMessage">welcome home user: {{me.id}}!</p>
    </form>
</template>

<script setup>
const email = ref("")
const password = ref("")
const showMessage = ref(false)
const me = ref()

const logIn = () => {
    localStorage.clear()
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
            token: res.token,
            name: res.name
        }
        localStorage.setItem('me', JSON.stringify(data))
        me.value = JSON.parse(localStorage.getItem('me'))
        showMessage.value = true
    })
}
</script>