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

            <b-col sm="6" lg="3" v-if="isCreate || isUpdate">
                <b-card no-body class="bg-default">
                <b-card-body class="pb-0">
                    <b-btn v-if="isUpdate" class="float-right" right id="my-button" variant="transparent p-0"><i class="fa fa-trash text-dark"></i></b-btn>
                    <b-popover target="my-button" title="Confirma exclusão?">
                        <div class="text-center">
                            <b-button type="button" class="btn btn-sm btn-danger" @click="excluir">Remover</b-button>
                        </div>
                    </b-popover>
                    <b-form>
                        <b-form-group id="exampleInputGroup1"
                                        label="Nome"
                                        label-for="nome">
                            <b-form-input v-focus id="nome"
                                        type="text"
                                        v-model="registro.nome"
                                        required>
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup1"
                                        label="Subdomínio"
                                        label-for="subdominio">
                            <b-form-input id="subdominio"
                                        type="text"
                                        v-model="registro.subdominio"
                                        required>
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup2"
                                        label="Data de fundação"
                                        label-for="fundacao">
                            <b-form-input id="fundacao"
                                        type="date"
                                        v-model="registro.data_clube"
                                        required>
                            </b-form-input>
                        </b-form-group>
                        <div class="text-center">
                            <b-button type="button" variant="secondary" class="mb-3 mr-1" @click="cancel()">Cancelar</b-button>
                            <b-button type="button" variant="primary" class="mb-3" @click="salvar()" v-if="isCreate">Salvar</b-button>
                            <b-button type="button" variant="primary" class="mb-3" @click="atualizar()" v-if="isUpdate">Salvar</b-button>
                        </div>
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
                        <b-dropdown-item @click="editar(item)">Editar</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'Times', params: { id: item.id } }">Times</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'Jogadores', params: { id: item.id } }">Jogadores</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'Partidas', params: { id: item.id } }">Partidas</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'Indicadores', params: { id: item.id } }">Indicadores</b-dropdown-item>
                        <b-dropdown-item disabled>Financeiro</b-dropdown-item>
                    </b-dropdown>
                    <h4 class="mb-0">{{item.nome}}</h4>
                    <p>Data de fundação: {{item.data_clube | moment("DD/MM/YYYY")}}</p>
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
        clearFields() {
            this.registro = {}
        },
        cancel() {
            this.isCreate = false
            this.isUpdate = false
            this.clearFields()
        },
        adicionar() {
            this.isCreate = true
        },
        editar(item) {
            this.isUpdate = true
            this.registro = item
        },
        getAll() {
            return this.$http.get('clubes')
                .then(response => {
                    this.registros = response.data;
                });
        },
        salvar() {
            this.$http.post('clubes',{
                nome: this.registro.nome,
                data_clube: this.registro.data_clube,
                subdominio: this.registro.subdominio
            }).then(response => {
                this.registro = response.data;
                this.isCreate = false;
                this.registros.push(this.registro);
                this.clearFields()
                this.$toast.top('Clube inserido com sucesso!');
            }).catch(e => {
                this.$toast.top(e.error)
            })
        },
        atualizar() {
            this.$http.patch('clubes/' + this.registro.id,{
                nome: this.registro.nome,
                data_clube: this.registro.data_clube,
                subdominio: this.registro.subdominio
            }).then(response => {
                this.registro = response.data;
                this.isUpdate = false;
                this.$toast.top('Clube "' + this.registro.nome + '" alterado com sucesso!');
                this.clearFields()
                this.getAll()
            }).catch(e => {
                this.$toast.top(e.error)
            })
        },
        excluir() {
           this.$http.delete('clubes/' + this.registro.id).then(response => {
                this.isUpdate = false;
                this.$toast.top('Clube "' + this.registro.nome + '" excluído com sucesso!');
                this.clearFields()
                this.getAll()
            }).catch(e => {
                this.$toast.top(e.error)
            }) 
        }
        
    }
}
</script>
