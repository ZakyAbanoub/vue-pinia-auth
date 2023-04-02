<template>
    <div class="flex justify-center items-center h-screen">
        <h1>Hello {{ `${user.first_name} - ${user.last_name}` }} </h1>
    </div>
</template>
<script>
//Import Store
import { useAuthStore } from '../stores/auth';
import { mapState } from 'pinia';

export default {
    computed: {
        ...mapState(useAuthStore, ["user"])
    }

}
</script>