<template>
    <div class="form">
        <div v-for="(key, index) in Object.keys(narudzba)" :key="index" class="form-group">
            <label>{{ key }}</label>
            <input v-if="key == 'datumStvaranja' || key == 'datumZaprimanja'" type="date" v-model="narudzba[key]" />
            <select v-else v-model="narudzba[key]">
                <option v-for="mogucnost in mogucnosti[key]" :key="mogucnost">
                    {{ mogucnost }}
                </option>
            </select>
        </div>
        <div class="form-buttons">
            <div class="form-button back-green" @click="updateNarudzba">Spremi</div>
            <div class="form-button back-red" @click="deleteNarudzba">Obriši</div>
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
        id: {
            type: Number,
            required: true,
        },
        mogucnosti: {
            type: Object,
            required: true,
        },
    },
    methods: {
        updateNarudzba(): void {
            console.log(this.narudzba);
        },
        deleteNarudzba(): void {
            console.log("brisem");
        },
    },
});
</script>

<style>
.form {
    width: 40vw;
    height: 40vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    margin: 25px;
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

input,
select {
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}
option {
    font-size: 14px;
}
</style>
