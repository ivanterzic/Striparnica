<template>
    <div class="form">
        <div v-for="(key, index) in Object.keys(narudzba)" :key="index" class="form-group">
            <label>{{ key }}</label>
            <input type="text" v-model="narudzba[key]" />
        </div>
        <div class="form-buttons">
            <div class="form-button back-green">Spremi</div>
            <div class="form-button back-red">Obriši</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Narudzba } from "../types/Narudzba";
export default defineComponent({
    props: {
        narudzba: {
            type: Object as PropType<Narudzba>,
            required: true,
        },
    },
});
</script>

<style scoped>
.form {
    width: 40vw;
    height: 40vh;
    background-color: yellow;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    margin: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.form-buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.form-button {
    padding: 10px;
    margin-right: 15px;
    border-radius: 5px;
}

.form-button:hover {
    cursor: pointer;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"] {
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>
