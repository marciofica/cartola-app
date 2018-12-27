<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <h6>Cadastrando jogador</h6>
                </div>
                <div class="card-body">
                    <b-row>
                        <b-col md="6">
                            <b-form-group>
                                <label for="nome">Nome</label>
                                <b-form-input v-focus v-model="jogador.first_name" type="text" id="nome" placeholder="Nome do jogador" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="3">
                            <b-form-group>
                                <label for="apelido">Apelido</label>
                                <b-form-input v-model="jogador.apelido" type="text" id="apelido" placeholder="Apelido(camisa)" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="3">
                            <b-form-group>
                                <label for="data_nascimento">Data de Nascimento</label>
                                <b-form-input v-model="jogador.data_nascimento" type="date" id="data_nascimento" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>                    
                    <b-row>
                        <b-col md="9">
                            <b-form-group>
                                <label for="email">E-mail</label>
                                <b-form-input v-model="jogador.email" type="email" id="email" placeholder="E-mail de contato" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="3">
                            <b-form-group>
                                <label for="telefone">Telefone</label>
                                <the-mask id="telefone" class="form-control" v-model="jogador.telefone" :mask="['(##) ####-####', '(##) #####-####']" autocomplete="off" />
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
import MaskedInput from 'vue-text-mask'

export default {
    name: 'JogadoresNovo',
    components: {
        MaskedInput
    },
    data: function () {
        return {
            jogador: {}
        }
    },
    created () {
        this.jogador.mensalista = true
    },
    methods: {
        salvar (){
            this.$http.post('jogadores',{
                first_name: this.jogador.first_name,
                apelido: this.jogador.apelido,
                email: this.jogador.email,
                username: this.jogador.email,
                telefone: this.jogador.telefone,
                data_nascimento: this.jogador.data_nascimento           
            }).then(response => {
                this.$toast.top('Jogador inserido com sucesso!');
                this.$router.push({ path: '/clubes/'+this.$route.params.id+'/jogadores' })
            }).catch(e => {
                this.erro = e.error;
            })
        }
    }
}
</script>

