<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <h6>Cadastrando time para o clube {{nomeClube}}</h6>
                </div>
                <div class="card-body">
                    <b-row>
                        <b-col md="2">
                            <b-form-group>
                                <label for="ano">Ano de criação</label>
                                <b-form-input v-model="time.ano" v-focus type="text" id="ano" placeholder="Ano" maxlength="4"></b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col md="9">
                            <b-form-group>
                                <label for="nome">Nome do time</label>
                                <b-form-input v-model="time.nome" type="text" id="nome" placeholder="Nome do time" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="1">
                            <label for="ativo">Ativo</label>
                            <c-switch 
                                    class="mx-1" 
                                    id="ativo" 
                                    color="primary" 
                                    name="ativo" 
                                    v-model="time.ativo" 
                                    :checked="time.ativo == 'S'"
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
    name: 'TimesNovo',
    components: {
        cSwitch
    },
    data: function(){
        return {
            idClube: 0,
            nomeClube: '',
            time: {}
        }
    },
    created () {
        this.time.ativo = 'S',
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
            this.$http.post('times',{
                nome: this.time.nome,
                ano: this.time.ano,
                ativo: this.time.ativo,
                clube: this.$route.params.id
            }).then(response => {
                this.$toast.top('Time inserido com sucesso!');
                this.$router.push({ path: '/clubes/'+this.$route.params.id+'/times' })
            }).catch(e => {
                this.erro = e.error;
            })
        }
    }
}
</script>
