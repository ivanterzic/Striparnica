<template>
    <div>
        <div class="form-button nav-button back-blue">Prethodna</div>
        <div class="form-button nav-button back-blue">Sljedeća</div>
        <NarudzbaForm :narudzba="filteredNarudzba" :id="narudzba.idNarudzbe" />
        <h2>Lista artikala</h2>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { Strip } from "../types/Strip";
import { Collectible } from "../types/Collectible";
import NarudzbaForm from "../components/NarudzbaForm.vue";

export default defineComponent({
    components: { NarudzbaForm },
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            narudzba: {
                idNarudzbe: 3,
                datumStvaranja: "2023-03-08",
                datumZaprimanja: null,
                status: {
                    trenutno: "u tijeku",
                    moguce: ["potvrdena", "u tijeku", "nepotvrdena"],
                },
                idDobavljaca: {
                    trenutno: 4,
                    moguce: [2, 3, 4],
                },
                MBRReferenta: {
                    trenutno: "1006474746334",
                    moguce: ["1006474746334", "3824629348629", "..."],
                },
                stripovi: [],
                collectibles: [],
            },
        };
    },
    computed: {
        filteredNarudzba() {
            let pairs = Object.entries(this.narudzba).filter(
                ([key, value]) => key !== "idNarudzbe" && key !== "stripovi" && key != "collectibles"
            );
            return Object.fromEntries(pairs);
        },
    },
});
</script>

<style scoped>
.nav-button {
    display: inline-block;
    margin-top: 25px;
    margin-left: 25px;
    margin-right:0
}
</style>
