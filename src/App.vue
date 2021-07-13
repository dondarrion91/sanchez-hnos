<template>
    <div id="app" class="app-background">
        <h1 class="text-center my-4 d-none">Sánchez Hmnos</h1>
        <img
            class="d-block mx-auto"
            id="app-logo"
            src="./assets/logo.jpeg"
            alt="sanchez hnos"
        />
        <p class="h3 text-center mb-4">Autogestión</p>
        <router-view />
    </div>
</template>

<style scope="scss">
html,
.app-background {
    background: #0a1531 !important;
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
