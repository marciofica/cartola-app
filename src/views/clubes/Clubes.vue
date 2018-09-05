<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6" lg="3" v-for="item in registros" :key="item.id">
                <b-card no-body class="bg-primary">
                <b-card-body class="pb-0">
                    <b-dropdown class="float-right" variant="transparent p-0" right>
                    <template slot="button-content">
                        <i class="icon-settings"></i>
                    </template>
                    <b-dropdown-item>Editar</b-dropdown-item>
                    <b-dropdown-item>Times</b-dropdown-item>
                    <b-dropdown-item>Partidas</b-dropdown-item>
                    <b-dropdown-item>Jogadores</b-dropdown-item>
                    <b-dropdown-item disabled>Financeiro</b-dropdown-item>
                    <!-- b-dropdown-item disabled>Disabled action</b-dropdown-item -->
                    </b-dropdown>
                    <h4 class="mb-0">{{item.nome}}</h4>
                    <p>Data de fundação: {{item.fundacao | moment("DD/MM/YYYY")}}</p>
                    <!--p>4 times | 28 Atletas | 192 partidas</p -->
                </b-card-body>
                <!-- card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/ -->
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'Clubes',
    data () {
        return {
            registros: [],
            registro: {}
        }
    },
    created () {
        this.getAll();
    },
    methods: {
        getAll() {
            return this.$http.get('clubes/')
                .then(response => {
                    this.registros = response.data;
                });
        }
    }
}
</script>
