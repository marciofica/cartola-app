<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <h6>({{nomeClube}}) Cadastrando partida</h6>
                </div>
                <div class="card-body">
                    <b-row>
                        <b-col md="3">
                            <b-form-group>
                                <label for="dh_partida">Data e hora da partida</label>
                                <b-form-input v-model="partida.dh_partida" v-focus type="datetime-local" id="dh_partida"></b-form-input>
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
                                    v-model="partida.time1">
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
                                    v-model="partida.time2">
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
                                        
                </div>
                <div class="card-footer">
                    <div class="text-left">
                        <b-button variant="primary" @click="salvar()"><i class="fa fa-save"></i> Salvar</b-button>
                    </div>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: "PartidasNovo",
    data: function(){
        return {
            idClube: 0,
            nomeClube: '',
            partida: {},
            times: []
        }
    },
    created () {
        this.idClube = this.$route.params.id
    },
    mounted () {
        this.getClube()
        this.getTimes()
    },
    methods: {
        getClube(){
            return this.$http.get('clubes/' + this.idClube + '/')
            .then(response => {
                    this.nomeClube = response.data.nome;
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
        convertTimes(data){            
            var arrayTimes = []
            data.forEach(element => {
                arrayTimes.push({value: + element.id , text: element.nome})
            })
            this.times = arrayTimes
        }
    }
}
</script>
