import { shallowMount } from "@vue/test-utils";
import ArtikalForm from "../components/ArtikalForm.vue";
import { Artikal } from "@/types/Artikal";

const artikli: Artikal[] = [
    {
        idartikla: 1,
        naziv: "Batman: The Killing Joke",
        opis: "Klasik koji istražuje psihološki rat između Batmana i Jokera.",
        dostupnakolicina: 20,
        cijena: 9.99,
        pdv: 0.25,
        izdavac: "DC Comics",
        izdanje: "Klasično",
    },
    {
        idartikla: 2,
        naziv: "Watchmen",
        opis: "Sukob superjunaka i političkih intriga u alternativnom svijetu.",
        dostupnakolicina: 15,
        cijena: 9.99,
        pdv: 0.25,
        izdavac: "DC Comics",
        izdanje: "Specijalno",
    },
];

const showModal = true;

describe("ArtikalForm.vue", () => {
    it("Ispravno renderiranje", () => {
        const wrapper = shallowMount(ArtikalForm, {
            props: { showModal, sviArtikli: artikli },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("Emitiranje dogadaja close na poziv funkcije emitFalse", async () => {
        const wrapper = shallowMount(ArtikalForm, {
            props: { showModal, sviArtikli: artikli },
        });

        await wrapper.vm.emitFalse();

        expect(wrapper.emitted("close")).toBeTruthy();
    });

    it("Punjenje obrasca sa podacima artikla na poziv metode fillModal", async () => {
        const wrapper = shallowMount(ArtikalForm, {
            props: { showModal, sviArtikli: artikli },
        });

        const selectedArtikalId = 2;
        await wrapper.setData({ idartikla: selectedArtikalId });

        await wrapper.vm.fillModal();

        expect(wrapper.vm.artikal).toEqual(artikli[1]);
    });

    it("Praznjenje obrasca na poziv metode cleanForm", async () => {
        const wrapper = shallowMount(ArtikalForm, {
            props: { showModal, sviArtikli: artikli },
        });

        await wrapper.setData({
            idartikla: 1,
            kolicina: 10,
            artikal: artikli[0],
        });

        await wrapper.vm.cleanForm();

        expect(wrapper.vm.idartikla).toBeNull();
        expect(wrapper.vm.kolicina).toBeNull();
        expect(wrapper.vm.artikal).toEqual({
            idartikla: null,
            naziv: "",
            opis: "",
            dostupnakolicina: null,
            cijena: null,
            pdv: null,
            izdavac: "",
            izdanje: "",
        });
    });

    it("emits novi-artikal event with form data and resets form when dodajArtikal is called", async () => {
        const wrapper = shallowMount(ArtikalForm, {
            props: { showModal, sviArtikli: artikli },
        });

        await wrapper.setData({
            idartikla: 1,
            kolicina: 5,
            artikal: artikli[0],
        });

        await wrapper.vm.dodajArtikal();

        expect(wrapper.emitted("novi-artikal")).toBeTruthy();

        expect(wrapper.vm.idartikla).toBeNull();
        expect(wrapper.vm.kolicina).toBeNull();
        expect(wrapper.vm.artikal).toEqual({
            idartikla: null,
            naziv: "",
            opis: "",
            dostupnakolicina: null,
            cijena: null,
            pdv: null,
            izdavac: "",
            izdanje: "",
        });
    });
});
