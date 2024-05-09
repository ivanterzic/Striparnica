<template>
    <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click.self="emitFalse"></div>
        <div class="modal-content">
            <div class="element">
                <label>ID artikla:</label>
                <select @change="fillModal" v-model="idartikla">
                    <option v-for="artikal in sviArtikli" :key="artikal" :value="artikal.idartikla">
                        {{ artikal.naziv }}
                    </option>
                </select>
            </div>
            <div v-for="zaglavlje in zaglavlja" :key="zaglavlje" class="element">
                <label>{{ zaglavlje.displayName }}:</label>
                <input type="text" v-model="artikal[zaglavlje.sqlName]" disabled />
            </div>
            <div class="element">
                <label>Količina:</label>
                <input type="number" v-model="kolicina" />
            </div>
            <div class="artikal-button back-green" @click="dodajArtikal">Spremi</div>
            <div class="artikal-button back-red" @click="odbaci">Odbaci</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Artikal, ArtikalForm } from "../types/Artikal";

export default defineComponent({
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        sviArtikli: {
            type: Array as PropType<Artikal[]>,
            required: true,
        },
    },
    data() {
        return {
            idartikla: null as number | null,
            kolicina: null as number | null,
            artikal: {
                idartikla: null,
                naziv: "",
                opis: "",
                dostupnakolicina: null,
                cijena: null,
                pdv: null,
                izdavac: "",
                izdanje: "",
            } as ArtikalForm,
            zaglavlja: [
                { displayName: "Opis artikla", sqlName: "opis" },
                { displayName: "Cijena", sqlName: "cijena" },
                { displayName: "PDV", sqlName: "pdv" },
                { displayName: "Izdavač", sqlName: "izdavac" },
                { displayName: "Izdanje", sqlName: "izdanje" },
                { displayName: "Količina (skladište)", sqlName: "dostupnakolicina" },
            ],
        };
    },
    methods: {
        emitFalse() {
            this.$emit("close");
        },
        fillModal() {
            this.artikal = this.sviArtikli.filter((artikal: Artikal) => {
                return artikal.idartikla == this.idartikla;
            })[0];
        },
        dodajArtikal() {
            if (!this.kolicina || !this.idartikla) return;
            this.artikal.kolicina = this.kolicina;
            this.$emit("novi-artikal", this.artikal);
        },
        odbaci() {
            this.$emit("close");
            this.idartikla = null;
            this.kolicina = null;
            this.artikal = {
                idartikla: null,
                naziv: "",
                opis: "",
                dostupnakolicina: null,
                cijena: null,
                pdv: null,
                izdavac: "",
                izdanje: "",
            };
        },
    },
});
</script>

<style scoped>
.element {
    margin: 10px;
}
.modal {
    display: none;
    z-index: 2;
}

.modal.is-active {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-content {
    width: 30vw;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 3;
}
.artikal-button {
    display: inline-block;
    margin: 10px;
    margin-top: 15px;
    border-radius: 5px;
    padding: 10px;
}
.artikal-button:hover {
    cursor: pointer;
}
</style>
