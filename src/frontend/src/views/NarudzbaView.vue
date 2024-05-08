<template>
    <div>
        <div class="form-button nav-button back-blue">Prethodna</div>
        <div class="form-button nav-button back-blue">Sljedeća</div>
        <NarudzbaForm :narudzba="filteredNarudzba" :id="narudzba.idNarudzbe" :mogucnosti="mogucnosti" />
        <h2>Lista artikala</h2>
        <Table :zaglavlja="zaglavlja" :retci="narudzba.artikli" :content="'artikli'" />
    </div>
</template>

<script>
import { defineComponent } from "vue";
import NarudzbaForm from "../components/NarudzbaForm.vue";
import Table from "../components/Table.vue";
import { Artikal } from "../types/Artikal";

export default defineComponent({
    components: { NarudzbaForm, Table },
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            narudzbaBaseURL: "http://localhost:3000/",
            mogucnostiURL: "http://localhost:3000/mogucnosti",
            zaglavlja: [
                { displayName: "ID artikla", sqlName: "idArtikla" },
                { displayName: "Naziv artikla", sqlName: "naziv" },
                { displayName: "Opis artikla", sqlName: "opis" },
                { displayName: "Dostupna količina", sqlName: "dostupnaKolicina" },
                { displayName: "Cijena", sqlName: "cijena" },
                { displayName: "PDV", sqlName: "PDV" },
                { displayName: "Izdavač", sqlName: "izdavac" },
                { displayName: "Izdanje", sqlName: "izdanje" },
            ],
            narudzba: {
                idNarudzbe: 3,
                datumStvaranja: "2023-03-08",
                datumZaprimanja: null,
                status: "u tijeku",
                idDobavljaca: 4,
                MBRReferenta: "1006474746334",
                artikli: [],
            },
            mogucnosti: {
                status: ["potvrdena", "u tijeku", "nepotvrdena"],
                idDobavljaca: [2, 3, 4],
                MBRReferenta: ["1006474746334", "3824629348629", "..."],
            },
        };
    },
    computed: {
        filteredNarudzba() {
            let pairs = Object.entries(this.narudzba).filter(
                ([key, value]) => key !== "idNarudzbe" && key !== "artikli"
            );
            return Object.fromEntries(pairs);
        },
        narudzbaURL() {
            return this.narudzbaBaseURL + this.id;
        },
    },
    mounted() {
        for (let i = 0; i < 25; i++) {
            this.narudzba.artikli.push({
                idArtikla: 2,
                naziv: "strip",
                opis: "opis",
                dostupnaKolicina: 4,
                cijena: 7,
                PDV: 0.34,
                izdavac: "dinamo",
                izdanje: "prvo",
                edit: false,
            });
        }
        // this.getNarudzba();
        // this.getMogucnosti();
    },
    methods: {
        async getNarudzba() {
            try {
                let response = await fetch(this.narudzbaURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Server problem");
                }
                this.narudzba = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
        async getMogucnosti() {
            try {
                let response = await fetch(this.mogucnostiURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Server problem");
                }
                this.mogucnosti = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
    },
});
</script>

<style scoped>
.nav-button {
    display: inline-block;
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 0;
}
</style>
