import { shallowMount } from "@vue/test-utils";
import NovaNarudzba from "../components/NovaNarudzba.vue";
import { Zaglavlje } from "@/types/Zaglavlje";
import { NarudzbaForm } from "@/types/Narudzba";
import { Mogucnosti } from "@/types/Mogucnosti";

const zaglavlja: Zaglavlje[] = [
    { displayName: "ID narudžbe", sqlName: "idnarudzbe" },
    { displayName: "Datum stvaranja", sqlName: "datumstvaranja" },
    { displayName: "Datum zaprimanja", sqlName: "datumzaprimanja" },
];

const mogucnosti: Mogucnosti = {
    mbrreferanata: ["1006474746334"],
    statusi: ["potvrdena", "u tijeku", "nepotpuna"],
    dobavljaci: [
        {
            id: 1,
            ime: "Kreativna Kolekcija d.o.o.",
        },
    ],
    narudzbe: [4, 5, 6],
};

const narudzba: NarudzbaForm = {
    datumstvaranja: "2022-20-01",
    datumzaprimanja: null,
    status: "u tijeku",
    iddobavljaca: 2,
    mbrreferenta: "8459263492865",
};

const showModal = true;

describe("NovaNarudzba.vue", () => {
    it("Ispravno renderiranje", () => {
        const wrapper = shallowMount(NovaNarudzba, {
            props: { showModal, zaglavlja, mogucnosti },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("Emitiranje dogadaja close na poziv funkcije emitFalse", async () => {
        const wrapper = shallowMount(NovaNarudzba, {
            props: { showModal, zaglavlja, mogucnosti },
        });

        await wrapper.vm.emitFalse();

        expect(wrapper.emitted("close")).toBeTruthy();
    });

    it("Praznjenje obrasca na poziv metode cleanForm", async () => {
        const wrapper = shallowMount(NovaNarudzba, {
            props: { showModal, zaglavlja, mogucnosti },
        });

        await wrapper.setData({
            narudzba: narudzba,
        });

        await wrapper.vm.cleanForm();

        expect(wrapper.vm.narudzba).toEqual({
            datumstvaranja: "",
            datumzaprimanja: "",
            status: "",
            iddobavljaca: null,
            mbrreferenta: "",
        });
    });
});
