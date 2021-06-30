<template>
    <div id="app">
        <h1 class="text-center my-4 d-none">Sánchez Hmnos</h1>
        <img class="d-block mx-auto" id="app-logo" src="./assets/logo.jpeg" alt="sanchez hnos">
        <router-view />
    </div>
</template>

<style scope="scss">
html,
#app {
    background: #0A1531;
}

h1,
h2,
h3,
h4,
h5,
h6,
label,
p {
    color: #fff;
}

#app-logo {
    width: 350px;
}
</style>
