<template>
    <div class="not-found">
        <h1>404 Not Found</h1>
        <p>Stranica nije pronađena. Pokušajte <router-link to="/narudzbe">ovdje</router-link></p>
        <!-- You can add more styling or content here as needed -->
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}
</style>
