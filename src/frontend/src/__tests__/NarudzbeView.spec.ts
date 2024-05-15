import { mount } from "@vue/test-utils";
import NarudzbeView from "../views/NarudzbeView.vue";

const narudzbe = [
    {
        idnarudzbe: 1,
        datumstvaranja: "2024-05-10",
        datumzaprimanja: null,
        status: "u tijeku",
        iddobavljaca: 5,
        mbrreferenta: "1006474746334",
    },
    {
        idnarudzbe: 2,
        datumstvaranja: "2023-05-18",
        datumzaprimanja: "2023-05-22",
        status: "potvrdena",
        iddobavljaca: 5,
        mbrreferenta: "1006474746334",
    },
];

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

it("fetches narudzbe successfully", async () => {
    const wrapper = mount(NarudzbeView);

    await wrapper.setData({
        narudzbe,
        mogucnosti,
    });

    const searchInput = wrapper.findAll(".search-field")[0]; // Find input using data-testid
    await searchInput.setValue("status"); // Simulate user input
    const statusSelect = wrapper.findAll(".search-field")[1]; // Find input using data-testid
    await statusSelect.setValue("potvrdena");
    // console.log(wrapper.html());
    const tableRows = wrapper.findAll("tbody tr"); // Adjust this selector based on your actual DOM structure
    expect(tableRows.length).toBe(1);
});
