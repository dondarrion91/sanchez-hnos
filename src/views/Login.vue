<template>
    <div class="container">
        <div class="row">
            <b-form class="needs-validation" ref="loginForm" novalidate>
                <div class="col-md-6 mx-auto">
                    <b-form-group id="dni" label="Dni:" label-for="dni">
                        <b-form-input
                            id="dni"
                            v-model="form.dni"
                            type="text"
                            placeholder="Introduce tu dni"
                            required
                        ></b-form-input>
                        <div class="invalid-feedback">
                            Por favor ingresar un dni.
                        </div>
                    </b-form-group>

                    <b-form-group class="mt-3">
                        <label for="exampleFormControlSelect1"
                            >Tipo de cliente</label
                        >
                        <select
                            class="form-control"
                            id="type"
                            v-model="form.type"
                            required
                        >
                            <option value="" disabled selected
                                >Seleccionar tipo de cliente</option
                            >
                            <option value="inquilinos">Inquilino</option>
                            <option value="PROPIETARIOS">Propietario</option>
                        </select>
                        <div class="invalid-feedback">
                            Por favor ingresar el tipo de cliente (inquilino o
                            propietario).
                        </div>
                    </b-form-group>
                </div>
            </b-form>
        </div>

        <div class="row mt-3">
            <div class="col-md-6 mx-auto">
                <b-button
                    type="button"
                    @click.prevent="loadFiles($event)"
                    variant="primary"
                    >Ingresar</b-button
                >
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mx-auto mt-2 mb-5">
                <p class="h6 mt-3">Instrucciones</p>
                <ul class="list-group">
                    <li class="list-group-item list-group-item-primary">
                        1 - ingresa con tu DNI
                    </li>
                    <li class="list-group-item list-group-item-primary">
                        2 - Selecciona que tipo de cliente que sos
                    </li>
                    <li class="list-group-item list-group-item-primary">
                        3 - El proceso puede demorar unos segundos, dependiendo
                        la cantidad de archivos que posea tu usuario.
                    </li>
                    <li class="list-group-item list-group-item-primary">
                        4 - Busca el archivo que necesites! Descargalo e
                        imprimilo, donde estés y cuando quieras, desde tu
                        computadora o celular.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router/index";
export default {
    data() {
        return {
            form: {
                dni: "",
                type: "",
            },
        };
    },
    methods: {
        loadFiles(event) {
            localStorage.setItem(
                "clientData",
                JSON.stringify({
                    dni: this.form.dni.trim(),
                    type: this.form.type,
                })
            );

            const form = this.$refs.loginForm;

            form.classList.add("was-validated");

            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            router.push("files");
        },
    },
};
</script>

<style scope="scss"></style>
