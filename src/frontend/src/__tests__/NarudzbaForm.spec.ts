import { shallowMount } from "@vue/test-utils";
import NarudzbaForm from "../components/NarudzbaForm.vue";
import { Narudzba } from "@/types/Narudzba";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

const narudzba: Narudzba = {
    idnarudzbe: 9,
    datumstvaranja: "2024-05-09",
    datumzaprimanja: "2024-05-10",
    status: "potvrdena",
    iddobavljaca: 1,
    mbrreferenta: "1006474746334",
};

const mogucnosti = {
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

describe("NarudzbaForm.vue", () => {
    it("Ispravno renderiranje", () => {
        const wrapper = shallowMount(NarudzbaForm, {
            props: { narudzba, mogucnosti },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("Navigaicja na /narudzbe nakon uspjesnog brisanja narudzbe", async () => {
        fetchMock.mockResponseOnce("", { status: 200 });

        const $router = {
            push: jest.fn(),
        };

        const wrapper = shallowMount(NarudzbaForm, {
            props: { narudzba, mogucnosti },
            global: {
                mocks: {
                    $router,
                },
            },
        });

        await wrapper.vm.obrisiNarudzbu();

        expect($router.push).toHaveBeenCalledWith(`/narudzbe`);
    });
});
