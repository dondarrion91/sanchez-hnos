<template>
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-table
                        id="data-table"
                        hover
                        :items="items"
                        :empty-text="emptyMessage"
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :dark="true"
                        @row-clicked="rowClicked"
                        responsive="sm"
                        show-empty
                    >
                        <template #empty="empty">
                            <b-spinner
                                v-if="showSpinner"
                                class="d-block mx-auto mt-3"
                                variant="primary"
                                type="grow"
                            ></b-spinner>
                            <p class="text-center mt-3">
                                {{ empty.emptyText }}
                            </p>
                        </template>
                    </b-table>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                    ></b-pagination>
                </b-col>
            </b-row>
        </b-container>

        <b-button
            v-if="showTour"
            class="fixed-top mx-3 mt-4"
            type="click"
            @click.prevent="$tours['myTour'].start()"
            variant="primary"
            >Mostrame como funciona</b-button
        >

        <v-tour name="myTour" :steps="steps">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                        v-if="tour.steps[tour.currentStep]"
                        :key="tour.currentStep"
                        :step="tour.steps[tour.currentStep]"
                        :previous-step="tour.previousStep"
                        :next-step="tour.nextStep"
                        :stop="tour.stop"
                        :skip="tour.skip"
                        :is-first="tour.isFirst"
                        :is-last="tour.isLast"
                        :labels="tour.labels"
                    >
                        <template>
                            <div slot="actions">
                                <button
                                    v-if="!tour.isFirst"
                                    @click="tour.previousStep"
                                    class="v-step__button v-step__button-previous"
                                >
                                    Anterior
                                </button>

                                <button
                                    v-if="!tour.isLast"
                                    @click="tour.nextStep"
                                    class="v-step__button v-step__button-next"
                                >
                                    Siguiente
                                </button>

                                <button
                                    @click="tour.stop"
                                    class="v-step__button v-step__button-next"
                                >
                                    Finalizar
                                </button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
    </div>
</template>

<script>
export default {
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            sortBy: "archivo",
            fields: [
                { key: "archivo", sortable: true },
                { key: "dni", sortable: true },
                { key: "fecha", sortable: true },
                { key: "numero", sortable: true },
                { key: "tipo", sortable: true },
            ],
            rows: 0,
            items: null,
            dni: "",
            clientType: "inquilinos",
            emptyMessage: "No hay archivos para mostrar",
            showSpinner: false,
            steps: [
                {
                    target: "#data-table",
                    header: {
                        title: "Lista de comprobantes",
                    },
                    content: `Aqui puedes visualizar y descargar tus comprobantes en formato pdf`,
                },
                {
                    target: "thead> tr:nth-child(1) > th:nth-child(1)",
                    header: {
                        title: "Archivo",
                    },
                    content: `Nombre completo del archivo`,
                },
                {
                    target: "thead > tr:nth-child(1) > th:nth-child(2)",
                    header: {
                        title: "Dni",
                    },
                    content: `DNI del propietario o inquilino`,
                },
                {
                    target: "thead > tr:nth-child(1) > th:nth-child(3)",
                    header: {
                        title: "Fecha",
                    },
                    content: `Fecha correspondiente al comprobante o archivo.`,
                },
                {
                    target: "thead > tr:nth-child(1) > th:nth-child(4)",
                    header: {
                        title: "Tipo",
                    },
                    content: `Numero de comprobante`,
                },
                {
                    target: "thead > tr:nth-child(1) > th:nth-child(5)",
                    header: {
                        title: "Tipo",
                    },
                    content: `Tipo de comprobante`,
                },
                {
                    target: "tbody > tr:nth-child(1)",
                    header: {
                        title: "Clickeame!",
                    },
                    content: `Haz click en una fila de la tabla para visualizar el comprobante!`,
                },
            ],
        };
    },

    computed: {
        showTour() {
            if (this.rows !== 0) {
                return true;
            }

            return false;
        },
    },

    created() {
        const clientData = JSON.parse(localStorage.getItem("clientData"));

        this.setClientData(clientData);

        this.getData(this.clientType);
    },

    methods: {
        setClientData(clientData) {
            this.dni = clientData.dni;
            this.clientType = clientData.type;
        },
        rowClicked(row) {
            window.open(
                "https://inmobiliaria-sanchezhnos.herokuapp.com/api/v1/" +
                    `downloadFiles?file=${row.archivo}&type=${this.clientType}`,
                "_blank"
            );
        },
        getData(clientType) {
            this.showSpinner = true;
            this.emptyMessage = "Cargando registros";

            fetch(
                "https://inmobiliaria-sanchezhnos.herokuapp.com/api/v1/" +
                    "files?type=" +
                    clientType +
                    "&dni=" +
                    this.dni
            )
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    this.showSpinner = false;
                    if (!data.files.length) {
                        this.emptyMessage = "No hay archivos para mostrar";
                    }

                    console.log(this.rows);

                    this.items = data.files;
                    this.rows = data.files.length;
                })
                .catch(error => {
                    console.log(error);
                    this.showSpinner = false;
                    this.emptyMessage =
                        "Ha ocurrido un error, intente más tarde";
                });
        },
        changeData(event) {
            this.clientType = event.target.value;

            this.getData(this.clientType);
        },
    },
};
</script>

<style scope="scss">
th span {
    display: none;
}

td {
    cursor: pointer;
}
</style>
