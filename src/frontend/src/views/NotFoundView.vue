<template>
    <div class="not-found">
        <h1>404 Not Found</h1>
        <p>Stranica nije pronađena. Pokušajte <router-link to="/narudzbe">ovdje</router-link></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    created() {
        if (this.$route.path == "/") {
            this.$router.push("/narudzbe");
        }
    },
});
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}
</style>
