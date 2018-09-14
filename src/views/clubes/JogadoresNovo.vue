<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <h6>Cadastrando jogador</h6>
                </div>
                <div class="card-body">
                    <b-row>
                        <b-col md="9">
                            <b-form-group>
                                <label for="nome">Nome</label>
                                <b-form-input v-focus v-model="jogador.nome" type="text" id="nome" placeholder="Nome do jogador" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="3">
                            <b-form-group>
                                <label for="nome">Nota</label>
                                <b-form-input v-model="jogador.nota" type="text" id="nota" placeholder="Nota" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="4">
                            <b-form-group>
                                <label for="nome">Apelido</label>
                                <b-form-input v-model="jogador.apelido" type="text" id="apelido" placeholder="Apelido(camisa)" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="4">
                            <b-form-group>
                                <label for="nome">Posição</label>
                                <b-form-input v-model="jogador.posicao" type="text" id="posicao" placeholder="Posição do jogador" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="4">
                            <b-form-group>
                                <label for="numCamisa">Núm.Camisa</label>
                                <b-form-input v-model="jogador.numero_camisa" type="text" id="numCamisa" placeholder="Número da camisa" autocomplete="off"></b-form-input>
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
                                <b-form-input v-model="jogador.telefone" type="text" id="telefone" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="3">
                            <c-switch 
                                    class="mx-1" 
                                    id="mensalista" 
                                    color="success" 
                                    name="mensalista" 
                                    v-model="jogador.mensalista" 
                                    :checked="jogador.mensalista"
                                    /> Mensalista?
                        </b-col>
                    </b-row>
                                        
                </div>
                <div class="card-footer">
                    <div class="text-center">
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
    name: 'JogadoresNovo',
    components: {
        cSwitch
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
            this.$http.post('jogadores/',{
                nome: this.time.nome,
                
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

