import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    userInfo: null
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    user(state) {
      return state.userInfo
    }
  }
})
