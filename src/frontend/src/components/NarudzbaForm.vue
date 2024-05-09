<template>
    <div class="form">
        <div v-for="(labela, index) in labele" :key="index" class="form-group">
            <label>{{ labela.displayName }}</label>
            <input
                v-if="labela.sqlName == 'datumstvaranja' || labela.sqlName == 'datumzaprimanja'"
                type="date"
                v-model="narudzbaMutable[labela.sqlName]"
            />
            <select
                v-if="labela.sqlName == 'status' || labela.sqlName == 'mbrreferenta'"
                v-model="narudzbaMutable[labela.sqlName]"
                required
            >
                <option v-for="mogucnost in mogucnosti[labela.plural]" :key="mogucnost">
                    {{ mogucnost }}
                </option>
            </select>
            <select v-if="labela.sqlName == 'iddobavljaca'" v-model="narudzbaMutable[labela.sqlName]" required>
                <option v-for="dobavljac in mogucnosti[labela.plural]" :key="dobavljac" :value="dobavljac.id">
                    {{ dobavljac.ime }}
                </option>
            </select>
        </div>
        <div class="form-buttons">
            <div class="form-button back-green" @click="azurirajNarudzbu">Spremi</div>
            <div class="form-button back-red" @click="obrisiNarudzbu">Obriši</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
//types
import { Narudzba } from "../types/Narudzba";
import { Zaglavlje } from "../types/Zaglavlje";

export default defineComponent({
    props: {
        narudzba: {
            type: Object as PropType<Narudzba>,
            required: true,
        },
        mogucnosti: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            narudzbaURL: "http://localhost:3000/narudzbe/" + this.narudzba.idnarudzbe,
            labele: [
                { displayName: "Datum stvaranja:", sqlName: "datumstvaranja" },
                { displayName: "Datum zaprimanja:", sqlName: "datumzaprimanja" },
                { displayName: "Status:", sqlName: "status", plural: "statusi" },
                { displayName: "Dobavljač:", sqlName: "iddobavljaca", plural: "dobavljaci" },
                { displayName: "MBR referenta nabave:", sqlName: "mbrreferenta", plural: "mbrreferanata" },
            ] as Zaglavlje[],
        };
    },
    computed: {
        narudzbaMutable(): Narudzba {
            return this.narudzba;
        },
    },
    methods: {
        async azurirajNarudzbu(): Promise<void> {
            try {
                // console.log(this.narudzbaMutable);
                let response = await fetch(this.narudzbaURL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.narudzbaMutable),
                });
                if (!response.ok) {
                    throw new Error("Greška kod ažuriranja narudžbe na poslužitelju");
                }
                this.narudzbaMutable = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
        async obrisiNarudzbu(): Promise<void> {
            try {
                let response = await fetch(this.narudzbaURL, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error("Greška kod brisanja narudžbe na poslužitelju");
                }
                this.$router.push("/narudzbe");
            } catch (error) {
                console.log(error);
            }
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
    margin: 1vh 2.5vw;
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
