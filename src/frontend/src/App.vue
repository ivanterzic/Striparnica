<template>
    <div>
        <nav class="font-large back-light-gray">
            <div class="nav-element">Striparnica</div>
            <router-link to="/narudzbe" :class="{ 'back-dark-gray': $route.path === '/narudzbe' }" class="nav-element"
                >Narudžbe</router-link
            >
            <!-- <router-link to="/zaposlenici">Zaposlenici</router-link> -->
        </nav>
        <router-view />
    </div>
</template>

<style>
nav {
    height: 10vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 25px;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 1;
}
nav a {
    border-radius: 3px;
    transition: background-color 0.3s ease;
    border: 2px solid black;
}
nav div {
    display: inline-block;
    border: 2px solid red;
    font-weight: 700;
}
nav a:hover {
    background-color: #ddd;
}
.nav-element {
    text-decoration: none;
    color: black;
    padding: 8px;
    margin-right: 15px;
}
.font-large {
    font-size: 20px;
}
.button-link {
    display: inline-block;
    padding: 10px;
    border-radius: 3px;
}
.button-link:hover {
    cursor: pointer;
}
</style>
