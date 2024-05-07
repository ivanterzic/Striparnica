<template>
    <div>
        <nav class="font-large back-light-gray">
            <div>Striparnica</div>
            <router-link to="/narudzbe">Narudžbe</router-link>
            <!-- <router-link to="/zaposlenici">Zaposlenici</router-link> -->
        </nav>
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
}
body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
nav {
    padding: 25px;
}

nav a {
    text-decoration: none;
    color: #333;
    padding: 8px 12px;
    margin-right: 10px;
    border-radius: 3px;
    transition: background-color 0.3s ease;
}

nav div {
    display: inline-block;
    color: #333;
    padding: 8px 12px;
    margin-right: 10px;
}

nav a:hover {
    background-color: #ddd;
}
.font-large {
    font-size: 20px;
}
.button-link {
    display: inline-block;
    padding: 15px;
    border-radius: 3px;
}
.button-link:hover {
    cursor: pointer;
}
</style>
