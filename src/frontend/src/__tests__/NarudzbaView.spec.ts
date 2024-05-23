import fetchMock from "jest-fetch-mock";
import { mount, flushPromises } from "@vue/test-utils";
import NarudzbaView from "../views/NarudzbaView.vue";
import router from "../router/index";
import { Mogucnosti } from "@/types/Mogucnosti";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

const narudzba = {
    narudzba: {
        idnarudzbe: 4,
        datumstvaranja: "2024-05-10",
        datumzaprimanja: null,
        status: "u tijeku",
        iddobavljaca: 5,
        mbrreferenta: "1006474746334",
    },
    artikli: [
        {
            idartikla: 11,
            naziv: "Superman: Red Son",
            opis: "Alternativna stvarnost u kojoj je Superman odrastao u Sovjetskom Savezu.",
            dostupnakolicina: 10,
            cijena: 5.99,
            pdv: 0.25,
            izdavac: "DC Comics",
            izdanje: "Kolekcionarsko",
            kolicina: 5,
        },
    ],
    nextId: 5,
};

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

const artikli = [
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

const count = {
    count: 2,
};

describe("NarudzbaView.vue", () => {
    it("Ispravan dohvat narudzbe i mogucnosti", async () => {
        fetchMock.mockResponses(JSON.stringify(narudzba), JSON.stringify(mogucnosti));

        const wrapper = mount(NarudzbaView, {
            props: { id: "4" },
            global: {
                plugins: [router],
            },
        });

        await flushPromises();

        expect(wrapper.vm.narudzba).toEqual(narudzba.narudzba);
        expect(wrapper.vm.mogucnosti).toEqual(mogucnosti);
    });

    it("Ispravno dodavanje artikla u narudžbu", async () => {
        fetchMock.mockResponses(JSON.stringify(narudzba), JSON.stringify(mogucnosti), JSON.stringify(artikli));

        const wrapper = mount(NarudzbaView, {
            props: { id: "4" },
            global: {
                plugins: [router],
            },
        });

        await flushPromises();

        const button = wrapper.findAll("#toggle-artikal-div")[0];
        await button.trigger("click");

        await flushPromises();
        const options = wrapper.find("#naziv-artikla").findAll("option");
        expect(options.length).toEqual(artikli.length);
    });
});
