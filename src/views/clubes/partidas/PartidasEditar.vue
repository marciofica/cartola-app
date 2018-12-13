<template>
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
                            

                        </b-tab>
                    </b-tabs>                                        
                </div>
            </div>
        </b-col>
    </b-row>
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
            partida: {},
            times: []
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
            return this.$http.get('clubes/' + this.idClube + '/')
            .then(response => {
                    this.nomeClube = response.data.nome;
            });
        },
        getPartida() {
            return this.$http.get('partidas/' + this.idPartida + '/')
            .then(response => {
                    this.partida = response.data;
                    this.partida.dh_partida = this.frontEndDateFormat(this.partida.dh_partida);
            });
        },
        salvar (){
            this.$http.post('partidas/',{
                clube: this.$route.params.id,
                dh_partida: this.partida.dh_partida,
                local: this.partida.local,
                descricao: this.partida.descricao,
                time1: this.partida.time1,
                time2: this.partida.time2,
                status: "C",
                qtd_jogadores: this.partida.qtd_jogadores
            }).then(response => {
                this.$toast.top('Partida inserida com sucesso!');
                this.$router.push({ path: '/clubes/'+this.$route.params.id+'/partidas' })
            }).catch(e => {
                this.$toast.top(e);
            })
        },
        getTimes () {
            return this.$http.get('times/?search=true')
            .then(response => {
                this.convertTimes(response.data)
            })
        },
        getJogadores(){
             return this.$http.get('partidas-confirmacao/?search=' + this.idPartida)
            .then(response => {
                console.log(response.data)
            })
        },
        convertTimes(data){
            console.log(data)            
            var arrayTimes = []
            data.forEach(element => {
                arrayTimes.push({value: + element.id , text: element.nome})
            })
            this.times = arrayTimes
        },
        frontEndDateFormat: function(date) {
            return this.$moment(date, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm');
        },
        backEndDateFormat: function(date) {
            return this.$moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
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
