<template>
    <div>
        <NarudzbaForm :narudzba="filteredNarudzba" />
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
                status: "u tijeku",
                idDobavljaca: 4,
                MBRReferenta: "1006474746334",
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
