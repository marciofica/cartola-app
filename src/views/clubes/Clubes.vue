<template>
    <div class="animated fadeIn">
        <b-row>

            <b-col sm="6" lg="3">
                <b-card no-body class="bg-default">
                <b-card-body class="pb-0">
                    <h4 class="mb-1">Adicionar um clube</h4>
                    <p>Criando um clube você poderá criar times, vincular jogadores, gerenciar as mensalidades e criar partidas.</p>
                    <div class="text-center">
                        <b-button variant="primary" class="mb-3" @click="adicionar"><i class="fa fa-plus"></i> Adicionar</b-button>
                    </div>
                </b-card-body>              
                </b-card>
            </b-col>

            <b-col sm="6" lg="3" v-if="isCreate">
                <b-card no-body class="bg-default">
                <b-card-body class="pb-0">
                    
                    <b-form @submit="salvar">
                        <b-form-group id="exampleInputGroup1"
                                        label="Nome"
                                        label-for="nome">
                            <b-form-input id="nome"
                                        type="text"
                                        v-model="registro.nome"
                                        required>
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup2"
                                        label="Data de fundação"
                                        label-for="fundacao">
                            <b-form-input id="fundacao"
                                        type="date"
                                        v-model="registro.fundacao"
                                        required>
                            </b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary" class="mb-3">Salvar</b-button>
                    </b-form>
                </b-card-body>              
                </b-card>
            </b-col>

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
            registro: {},
            isCreate: false,
            isUpdate: false
        }
    },
    created () {
        this.getAll();
    },
    methods: {
        adicionar(){
            this.isCreate = true;
        },
        getAll() {
            return this.$http.get('clubes/')
                .then(response => {
                    this.registros = response.data;
                });
        },
        salvar(evt) {
            evt.preventDefault()
            this.$http.post('clubes/',{
                nome: this.registro.nome,
                fundacao: this.registro.fundacao
            }).then(response => {
                this.registro = response.data;
                this.isCreate = false;
                this.registros.push(this.registro);
            }).catch(e => {
                this.erro = e.error;
            })
        }
    }
}
</script>
