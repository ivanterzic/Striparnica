<template>
    <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click.self="emitFalse"></div>
        <div class="modal-content modal-width">
            <div v-for="(zaglavlje, index) in filteredZaglavlja" :key="index" class="element">
                <label>{{ zaglavlje.displayName }}</label>
                <input
                    v-if="zaglavlje.sqlName == 'datumstvaranja' || zaglavlje.sqlName == 'datumzaprimanja'"
                    type="date"
                    v-model="narudzba[zaglavlje.sqlName]"
                />
                <select
                    v-if="zaglavlje.sqlName == 'status' || zaglavlje.sqlName == 'mbrreferenta'"
                    v-model="narudzba[zaglavlje.sqlName]"
                    required
                >
                    <option v-for="mogucnost in mogucnosti[zaglavlje.plural]" :key="mogucnost">
                        {{ mogucnost }}
                    </option>
                </select>
                <select v-if="zaglavlje.sqlName == 'iddobavljaca'" v-model="narudzba[zaglavlje.sqlName]" required>
                    <option v-for="dobavljac in mogucnosti[zaglavlje.plural]" :key="dobavljac" :value="dobavljac.id">
                        ID: {{ dobavljac.id }} - {{ dobavljac.ime }}
                    </option>
                </select>
            </div>
            <div class="artikal-button back-green" @click="dodajNarudzbu">Spremi</div>
            <div class="artikal-button back-red" @click="odbaci">Odbaci</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
//types
import { NarudzbaForm } from "../types/Narudzba";
import { Zaglavlje } from "../types/Zaglavlje";

export default defineComponent({
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        zaglavlja: {
            type: Object as PropType<Zaglavlje[]>,
            required: true,
        },
        mogucnosti: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            narudzbaURL: "http://localhost:3000/narudzbe",
            narudzba: {
                datumstvaranja: "",
                datumzaprimanja: "",
                status: "",
                iddobavljaca: null,
                mbrreferenta: "",
            } as NarudzbaForm,
        };
    },
    computed: {
        filteredZaglavlja(): Zaglavlje[] {
            return this.zaglavlja.filter((zaglavlje: Zaglavlje) => zaglavlje.sqlName != "idnarudzbe");
        },
    },
    methods: {
        emitFalse() {
            this.$emit("close");
        },
        cleanForm() {
            this.narudzba = {
                datumstvaranja: "",
                datumzaprimanja: "",
                status: "",
                iddobavljaca: null,
                mbrreferenta: "",
            };
        },
        async dodajNarudzbu(): Promise<void> {
            try {
                let response = await fetch(this.narudzbaURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.narudzba),
                });
                if (response.ok) {
                    let id = (await response.json()).idnarudzbe;
                    this.$router.push(`/narudzbe/${id}`);
                } else if (response.status === 400) {
                    let error = (await response.json()).error;
                    alert(error);
                } else {
                    throw new Error("Greška kod dodavanja narudžbe");
                }
            } catch (error) {
                console.log(error);
            }
        },
        odbaci() {
            this.emitFalse();
            this.cleanForm();
        },
    },
});
</script>

<style scoped>
.modal-width {
    width: 20vw;
}
</style>
