<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <h6>Cadastrando indicador para o clube {{nomeClube}}</h6>
                </div>
                <div class="card-body">
                    <b-row>
                        <b-col md="12">
                            <b-form-group>
                                <label for="nome">Nome do indicador</label>
                                <b-form-input v-focus v-model="indicador.nome" type="text" id="nome" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="12">
                            <b-form-group>
                                <label for="descricao">Descrição</label>
                                <b-form-input v-model="indicador.descricao" type="text" id="indicador" :textarea="true"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="1">
                            <label for="ativo">Ativo</label>
                            <c-switch 
                                    class="mx-1" 
                                    id="ativo" 
                                    color="primary" 
                                    name="ativo" 
                                    v-model="indicador.ativo" 
                                    :checked="indicador.ativo == 'S'"
                                    />
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
import { Switch as cSwitch } from '@coreui/vue'

export default {
    name: 'IndicadoresNovo',
    components: {
        cSwitch
    },
    data: function(){
        return {
            idClube: 0,
            nomeClube: '',
            indicador: {}
        }
    },
    created () {
        this.indicador.ativo = 'S',
        this.idClube = this.$route.params.id
        this.getClube()
    },
    methods: {
        getClube(){
            return this.$http.get('clubes/' + this.idClube)
            .then(response => {
                    this.nomeClube = response.data.nome;
            });
        },
        salvar (){
            this.$http.post('indicadores',{
                nome: this.indicador.nome,
                descricao: this.indicador.descricao,
                ativo: this.indicador.ativo ? 'S': 'N'
            }).then(response => {
                this.$toast.top('Indicador inserido com sucesso!');
                this.$router.push({ path: '/clubes/'+this.$route.params.id+'/indicadores' })
            }).catch(e => {
                 this.$toast.top(e.error);
            })
        }
    }
}
</script>
