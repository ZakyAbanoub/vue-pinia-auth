<template>
    <div class="flex justify-center items-center h-screen">
        <form class="w-[500px] flex flex-col items-center">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" class="input input-bordered w-full" v-model="username" />
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Password:</span>
                </label>
                <input type="password" class="input input-bordered w-full" v-model="password" />
            </div>
            <div v-if="errorMessage" class="text-error">
                {{ errorMessage }}
            </div>
            <div class="form-control w-full mt-6">
                <button :disabled="isLoginButtonDisabled" type="button" class="btn btn-primary"
                    @click="doLogin">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import axios from 'axios'
export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        async doLogin() {
            const authStore = useAuthStore();
            try {
                const { data: userData } = await axios.get("http://localhost:3000/users")
                let isUserExists = userData.map((user) => user.username).includes(this.username)
                if (!isUserExists) {
                    throw new Error('User is not exists, please insert a valid username')
                }
                let user = userData.find(user => user.username === this.username)
                if (this.password !== user.password) {
                    throw new Error('Please insert a valid password!')
                }
                const { data: userInfo } = await axios.get(`http://localhost:3000/users-info/${user.id}`)
                authStore.setToken(userInfo.token)
                authStore.setUserInfo(userInfo)
            } catch (e) {
                this.errorMessage = e.message
            }
        }
    },
    computed: {
        isLoginButtonDisabled() {
            return this.username === '' || this.password === ''
        }
    },
    watch: {
        username(oldVal, newVal) {
            if (oldVal !== newVal) {
                this.errorMessage = ''
            }
        },
        password(oldVal, newVal) {
            if (oldVal !== newVal) {
                this.errorMessage = ''
            }
        }
    }
}
</script>

<style></style>