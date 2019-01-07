<template>
    <div>
        <b-row>
            <b-col md="12">
                <div class="card">
                    <div class="card-header">
                        <h6>({{nomeClube}}) Gerenciando partida</h6>
                    </div>
                    <div class="card-body-custom">
                        <b-tabs card pills vertical nav-wrapper-class="w-40" v-model="tabIndex[1]">
                            <b-tab active>
                                <template slot="title">
                                    <i class="fa fa-soccer-ball-o"></i> {{tabs[0]}}
                                </template>
                                    <b-row>
                                        <b-col md="3">
                                            <b-form-group>
                                                <label for="dh_partida">Data e hora da partida</label>
                                                <b-form-input v-model="partida.dh_partida" v-focus type="text" v-mask="'##/##/#### ##:##'" id="dh_partida"></b-form-input>
                                                
                                            </b-form-group>
                                        </b-col>
                                        <b-col md="9">
                                            <b-form-group>
                                                <label for="local">Local da partida</label>
                                                <b-form-input v-model="partida.local" type="text" id="local" maxlength="150"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col md="12">
                                            <b-form-group>
                                                <label for="descricao">Descrição da partida</label>
                                                <b-form-input v-model="partida.descricao" :textarea="true" :rows="6" id="descricao"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col md="6">
                                            <b-form-group>
                                                <label for="time1">Time 1</label>
                                                <b-form-select id="time1"
                                                    :plain="true"
                                                    :multiple="false"
                                                    :options="times"
                                                    v-model="partida.time1.id">
                                                </b-form-select>
                                            </b-form-group>
                                        </b-col>
                                        <b-col md="6">
                                            <b-form-group>
                                                <label for="time2">Time 2</label>
                                                <b-form-select id="time2"
                                                    :plain="true"
                                                    :multiple="false"
                                                    :options="times"
                                                    v-model="partida.time2.id">
                                                </b-form-select>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col md="3">
                                            <b-form-group>
                                                <label for="qtd_jogadores">Quantidade de jogadores</label>
                                                <b-form-input v-model="partida.qtd_jogadores" type="text" id="qtd_jogadores" maxlength="2"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col md="12">
                                            <div class="text-right">
                                                <b-button variant="primary" @click.prevent="salvar()"><i class="fa fa-save"></i> Salvar</b-button>
                                            </div>
                                        </b-col>
                                    </b-row>
                            </b-tab>
                            <b-tab @click="getJogadores()">
                                <template slot="title">
                                    <i class="fa fa-users"></i> {{tabs[1]}}
                                </template>
                                <b-row>
                                    <b-col sm="12" class="d-none d-md-block mb-2">
                                        <b-button variant="primary" class="float-right" @click="modalJogador"><i class="fa fa-plus"></i> Jogador</b-button>  
                                    </b-col>
                                </b-row>
                                <b-table class="mb-0 table-outline" responsive="sm" v-if="tableItems.length > 0" hover :items="tableItems" :fields="tableFields" head-variant="light">
                                    <div slot="confirmado" slot-scope="item">
                                        <span v-bind:class="{ 'badge badge-success': item.value == 'S',  'badge badge-danger': item.value != 'S' }">
                                            {{item.value == 'S'? 'Sim': 'Não'}}
                                        </span>
                                    </div>
                                    <div slot="dh_confirmacao" slot-scope="data">
                                        {{ frontEndDateFormat(data.item.dh_confirmacao) }}
                                    </div>
                                    <div slot="acoes" slot-scope="data">
                                        <b-dropdown id="ddown-sm" size="sm" right class="m-2" variant="light">
                                            <template slot="button-content">
                                                <i class="fa fa-cogs"></i><span class="sr-only">Opções</span>
                                            </template>
                                            <b-dropdown-item-button v-show="data.item.confirmado != 'S'" @click="confirmarParticipacao(data.item.id)">Confirmar</b-dropdown-item-button>
                                            <b-dropdown-item-button v-show="data.item.confirmado == 'S'" @click="cancelarParticipacao(data.item.id)">Cancelar</b-dropdown-item-button>
                                            <b-dropdown-item-button @click="excluiJogadorDaPartida(data.item.id)">Excluir</b-dropdown-item-button>
                                        </b-dropdown>                            
                                    </div>
                                </b-table>
                            </b-tab>

                            <b-tab @click="getIndicadores()">
                                <template slot="title">
                                    <i class="fa fa-line-chart"></i> {{tabs[2]}}
                                </template>
                                <b-row>
                                    <b-col sm="12" class="d-none d-md-block mb-2">
                                        <b-button variant="primary" class="float-right" @click="modalIndicador"><i class="fa fa-plus"></i> Indicador</b-button>  
                                    </b-col>
                                </b-row>
                                <b-table class="mb-0 table-outline" responsive="sm" v-if="indicadorItems.length > 0" hover :items="indicadorItems" :fields="indicadorFields" head-variant="light">
                                    <div slot="dh_validade" slot-scope="data">
                                        {{ frontEndDateFormat(data.item.dh_validade) }}
                                    </div>
                                    <div slot="acoes" slot-scope="data">
                                        <b-dropdown id="ddown-sm" size="sm" right class="m-2" variant="light">
                                            <template slot="button-content">
                                                <i class="fa fa-cogs"></i><span class="sr-only">Opções</span>
                                            </template>
                                            <b-dropdown-item-button @click="excluiIndicadorDaPartida(data.item.id)">Excluir</b-dropdown-item-button>
                                        </b-dropdown>                            
                                    </div>
                                </b-table>
                            </b-tab>

                        </b-tabs>                                        
                    </div>
                </div>
            </b-col>
        </b-row>


        <b-modal id="jogadorModal" ref="jogadorModal" title="Adicionar jogador" busy>
            <b-row class="mb-2">
                <b-col md="12">
                    <b-form-group label-for="elementsAppendButton">
                        <b-input-group>
                            <b-form-input id="elementsAppendButton" v-focus type="text"></b-form-input>
                            <b-input-group-append>
                            <b-button variant="secondary" @click="searchJogadorClube">Buscar</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <h5 class="text-center" v-if="jogadoresClube.length < 1">Localize o jogador</h5>
                    <div v-if="jogadoresClube.length > 0">
                        <b-list-group>
                            <b-list-group-item v-for="item in jogadoresClube" v-bind:key="item.id" class="flex-column align-items-start mao">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{item.jogador.usuario.first_name}}</h5>
                                    <b-button variant="success" size="sm" @click="adicionarJogadorPartida(item)">Adicionar</b-button>
                                </div>
                                <span class="badge badge-secondary mr-2">Apelido: {{item.jogador.apelido}}</span>
                                <span class="badge badge-secondary mr-2">Camisa: {{item.numero_camisa}}</span>
                                <span class="badge badge-secondary mr-2">Posição: {{item.posicao}}</span>
                                <span class="badge badge-secondary mr-2">Nota: {{item.nota}}</span>                            
                                <span class="badge badge-secondary" v-if="item.mensalista">Mensalista</span>
                            </b-list-group-item>
                        </b-list-group>
                    </div>                    
                </b-col>
            </b-row>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right ml-2" variant="primary" @click="closeModal">Fechar</b-btn>
            </div>
        </b-modal>


        <!-- Indicador modal -->
        <b-modal id="indicadorModal" ref="indicadorModal" title="Indicadores" busy>
            <b-row class="mb-2">
                <b-col md="12">
                    <b-form-group label-for="elementsAppendButton">
                        <b-input-group>
                            <b-form-input id="elementsAppendButton" v-focus type="text"></b-form-input>
                            <b-input-group-append>
                            <b-button variant="secondary" @click="searchIndicador">Buscar</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <h5 class="text-center" v-if="indicadoresList.length < 1">Localize o indicador</h5>
                    <div v-if="indicadoresList.length > 0">
                        <b-list-group>
                            <b-list-group-item v-for="item in indicadoresList" v-bind:key="item.id" class="flex-column align-items-start mao">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{item.nome}}</h5>
                                    <b-button variant="success" size="sm" @click="adicionarIndicador(item)">Adicionar</b-button>
                                </div>
                                <span>{{item.descricao}}</span>
                            </b-list-group-item>
                    </b-list-group>
                    </div>
                </b-col>
            </b-row>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right ml-2" variant="primary" @click="closeModalIndicador">Fechar</b-btn>
            </div>
        </b-modal>

    </div>
</template>

<script>
export default {
    name: "PartidasEditar",
    data: function(){
        return {
            tabIndex: [0, 0],
            tabs: [
                'Partida',
                'Jogadores',
                'Indicadores'
            ],
            idClube: 0,
            idPartida: 0,
            nomeClube: '',
            partida: {
                time1: {},
                time2:{}
            },
            times: [],
            jogadoresClube:[],
            indicadoresList: [],
            tableItems: [],
            tableFields: {
                apelido: {
                    key: 'jogador.apelido',
                    label: 'Apelido',
                    tdClass: 'td-5'
                },
                posicao: {
                    key: 'jogador.jogadorclube[0].posicao',
                    label: 'Posição',
                    tdClass: 'td-2'
                },
                nota: {
                    key: 'jogador.jogadorclube[0].nota',
                    label: 'Nota',
                    class: 'text-center',
                    tdClass: 'td-2'
                },
                confirmado: {
                    key: 'confirmado',
                    label: 'Confirmado?',
                    class: 'text-center',
                    sortable: true,
                    tdClass: 'td-2'
                },
                dh_confirmacao: {
                    key: 'dh_confirmacao',
                    label: 'Hora conf.',
                    class: 'text-center',
                    sortable: true,
                    tdClass: 'td-5'
                },
                acoes: {
                    label: '',
                    class: 'text-center',
                    tdClass: 'td-2'
                }
            },
            indicadorItems: [],
            indicadorFields: {
               nome: {
                    key: 'indicador.nome',
                    label: 'Nome'
                },
                descricao: {
                    key: 'indicador.descricao',
                    label: 'Descrição'
                },
                dh_validade: {
                    key: 'dh_validade',
                    label: 'Válido até'
                },
                acoes: {
                    label: '',
                    class: 'text-center',
                    tdClass: 'td-2'
                }
            }
        }
    },
    created () {
        this.idClube = this.$route.params.id
        this.idPartida = this.$route.params.partida
    },
    mounted () {
        this.getClube()
        this.getPartida()
        this.getTimes()
    },
    methods: {
        getClube(){
            return this.$http.get('clubes/' + this.idClube)
            .then(response => {
                    this.nomeClube = response.data.nome;
            });
        },
        getPartida() {
            return this.$http.get('partidas/' + this.idPartida)
            .then(response => {
                    this.partida = response.data;
                    this.partida.dh_partida = this.frontEndDateFormat(this.partida.dh_partida);
            });
        },
        salvar (){
            this.$http.put('partidas/'+this.idPartida,{
                clube: this.$route.params.id,
                dh_partida: this.backEndDateFormat(this.partida.dh_partida),
                local: this.partida.local,
                descricao: this.partida.descricao,
                time1: this.partida.time1.id,
                time2: this.partida.time2.id,
                status: this.partida.status,
                qtd_jogadores: this.partida.qtd_jogadores
            }).then(response => {
                this.$toast.top('Partida alterada com sucesso!');
                this.$router.push({ path: '/clubes/'+this.$route.params.id+'/partidas' })
            }).catch(e => {
                this.$toast.top(e);
            })
        },
        convertTimes(data){
            var arrayTimes = []
            data.forEach(element => {
                arrayTimes.push({value: + element.id , text: element.nome})
            })
            this.times = arrayTimes
        },
        getTimes () {
            return this.$http.get('times?search=S')
            .then(response => {
                this.convertTimes(response.data)
            })
        },
        getJogadores(){
             return this.$http.get('partidas-confirmacao?search=' + this.idPartida)
            .then(response => {
                this.tableItems = response.data;
            })
        },
        excluiJogadorDaPartida(id){
            this.$http.delete('partidas-confirmacao/' + id).then(response => {
                this.$toast.top('Jogador excluído com sucesso!')
                this.getJogadores()
            }).catch(e => {
                this.$toast.top(e.error)
            })
        },
        confirmarParticipacao(id){
            this.$http.patch('partidas-confirmacao/' + id,{
                confirmado: 'S',
                dh_confirmacao: this.$moment()
            }).then(response => {
                this.$toast.top('Confirmação feita com sucesso!');
                this.getJogadores()
            }).catch(e => {
                this.$toast.top(e);
            })
        },
        cancelarParticipacao(id){
            this.$http.patch('partidas-confirmacao/' + id,{
                confirmado: 'N',
                dh_confirmacao: this.$moment()
            }).then(response => {
                this.$toast.top('Cancelamento feito com sucesso!');
                this.getJogadores()
            }).catch(e => {
                this.$toast.top(e);
            })
        },
        modalJogador(){
            this.$refs.jogadorModal.show()
        },
        searchJogadorClube(){
            return this.$http.get('jogadores-clubes')
            .then(response => {
                    this.jogadoresClube = response.data;
            });
        },
        adicionarJogadorPartida(data) {
            this.$http.post('partidas-confirmacao',{
                jogador: data.jogador.id,
                partida: this.idPartida
            }).then(response => {
                this.$toast.top('Atleta inserido com sucesso!');
                this.getJogadores()
            }).catch(e => {
                this.$toast.top(e);
            })
        },
        closeModal(){
            this.jogadoresClube = []
            this.$refs.jogadorModal.hide()
        },
        getIndicadores(){
            return this.$http.get('partidas-indicador?search=' + this.idPartida)
            .then(response => {
                this.indicadorItems = response.data;
            })
        },
        excluiIndicadorDaPartida(id){
            this.$http.delete('partidas-indicador/' + id).then(response => {
                this.$toast.top('Indicador excluído com sucesso!')
                this.getIndicadores()
            }).catch(e => {
                this.$toast.top(e.error)
            })
        },
        searchIndicador(){
            return this.$http.get('indicadores-modal?search=S&partida='+this.idPartida)
            .then(response => {
                    this.indicadoresList = response.data;
            });
        },
        modalIndicador(){
            this.$refs.indicadorModal.show()
        },
        closeModalIndicador(){
            this.indicadoresList = []
            this.$refs.indicadorModal.hide()
        },
        adicionarIndicador(data) {
            this.$http.post('partidas-indicador',{
                indicador: data.id,
                partida: this.idPartida,
                dh_validade: this.$moment().add(5, "days")
            }).then(response => {
                this.$toast.top('Indicador inserido com sucesso!')
                this.getIndicadores()
            }).catch(e => {
                this.$toast.top(e)
            })
        },
        frontEndDateFormat: function(date) {
            return this.$moment(date, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm')
        },
        backEndDateFormat: function(date) {
            return this.$moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
        }
    }
}
</script>
<style>
    .card-body-custom {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        /* padding: 1.25rem; */
}
</style>
