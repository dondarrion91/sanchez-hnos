<template>
    <div>
        <b-form class="container">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <b-form-group id="dni" label="Dni:" label-for="dni">
                        <b-form-input
                            id="dni"
                            v-model="form.dni"
                            type="text"
                            placeholder="Introduce tu dni"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        class="mt-3"
                        id="password"
                        label="Contraseña:"
                        label-for="password"
                    >
                        <b-form-input
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="Contraseña"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        class="mt-3"
                        id="confirm-password"
                        label="Confirmar contraseña:"
                        label-for="confirm-password"
                    >
                        <b-form-input
                            id="confirm-password"
                            v-model="form.ConfirmPassword"
                            type="password"
                            placeholder="Confirmar contraseña"
                            required
                        ></b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6 mx-auto">
                    <b-button type="submit" variant="primary"
                        >Ingresar</b-button
                    >
                </div>

                <div class="col-md-12">
                    <div class="d-flex justify-content-center mt-4">
                        <router-link to="/" class="w-50"
                            >Ya tienes usuario? Ingresar</router-link
                        >
                    </div>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                dni: "",
                password: "",
                ConfirmPassword: "",
            },
        };
    },
};
</script>

<style scope="scss"></style>
