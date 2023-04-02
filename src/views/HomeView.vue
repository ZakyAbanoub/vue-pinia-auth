<template>
  <LoginComponent v-if="!isAuthenticated" />
  <AuthenticatedUser v-else />
</template>


<script>
//Import Store
import { useAuthStore } from '@/stores/auth'
import { mapState } from 'pinia';

//Import Components
import LoginComponent from '../components/LoginComponent.vue';
import AuthenticatedUser from '../components/AuthenticatedUser.vue';
export default {
  components: {
    LoginComponent,
    AuthenticatedUser
  },
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated"])
  }

}
</script>