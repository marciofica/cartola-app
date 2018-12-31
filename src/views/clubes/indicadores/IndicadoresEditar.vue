<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <h6>Editando o indicador</h6>
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
                                    :checked="indicador.ativo == 'S' ? true: false"
                                    />
                        </b-col>
                    </b-row>
                                        
                </div>
                <div class="card-footer">
                    <div class="text-left">
                        <b-button variant="primary" @click="atualizar()"><i class="fa fa-save"></i> Salvar</b-button>
                    </div>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'

export default {
    name: 'IndicadoresEditar',
    components: {
        cSwitch
    },
    data: function(){
        return {
            indicador: {},
            idIndicador: 0
        }
    },
    created () {
        this.indicador.ativo = true
        this.idIndicador = this.$route.params.indicador
        this.getIndicador()
    },
    methods: {
        salvar (){
            this.$http.post('indicadores',{
                nome: this.indicador.nome,
                descricao: this.indicador.descricao,
                ativo: this.indicador.ativo
            }).then(response => {
                this.$toast.top('Clube inserido com sucesso!');
                this.$router.push({ path: '/clubes/'+this.$route.params.id+'/indicadores' })
            }).catch(e => {
                this.erro = e.error;
            })
        },
        getIndicador(){
            return this.$http.get('indicadores/' + this.idIndicador)
            .then(response => {
                    this.indicador = response.data;
            });
        },
        atualizar() {
            this.$http.put('indicadores/' + this.indicador.id,{
                id: this.indicador.id,
                nome: this.indicador.nome,
                ativo: this.indicador.ativo,
                descricao: this.indicador.descricao
            }).then(response => {
                this.$toast.top('Indicador "' + this.indicador.nome + '" alterado com sucesso!');
                this.$router.push({ path: '/clubes/'+this.$route.params.id+'/indicadores' })
            }).catch(e => {
                this.$toast.top(e.error);
            })
        }
    }
}
</script>
