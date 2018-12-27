<template>
    <div>
        <b-row>
        <b-col md="4">
            <div class="card">
                <div class="card-header">
                    <div class="align-middle">
                        <span>Localizar jogadores</span>
                        <router-link class="btn btn-square btn-sm btn-primary float-right" :to="{ path: 'novo'}"><i class="fa fa-plus"></i></router-link>
                    </div>
                </div>
                <div class="card-body">
                    <b-form-group label-for="elementsAppendButton" description="Localize o jogador para vincular ao elenco.">
                        <b-input-group>
                            <b-form-input id="elementsAppendButton" v-focus v-model="query" type="text"></b-form-input>
                            <b-input-group-append>
                            <b-button variant="secondary" @click="searchJogador">Buscar</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                     <b-list-group>
                        <b-list-group-item v-for="item in jogadoresSearch" v-bind:key="item.id" href="#" class="flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{item.usuario.first_name}}</h5>
                                <b-button variant="success" @click="prepararVinculo(item)"><i class="fa fa-arrow-right"></i></b-button>
                            </div>
                            <small class="mb-1">Apelido: {{item.apelido}} | E-mail: {{item.usuario.email}}</small>
                        </b-list-group-item>
                     </b-list-group>
                </div>
            </div>
        </b-col>
        <b-col md="8">
            <div class="card">
                <div class="card-header">
                    <div class="align-middle">
                        <span>Jogadores do elenco</span> <!--span class="badge badge-success float-right">33 jogadores</span -->
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="text-center" v-if="jogadoresClube.length < 1">Nenhum jogador no elenco!</h5>
                    <b-list-group>
                        <b-list-group-item v-if="jogadoresClube.length > 0" v-for="item in jogadoresClube" v-bind:key="item.id" @click="editarJogadorClube(item)" class="flex-column align-items-start mao">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{item.jogador.usuario.first_name}}</h5>
                            <small>{{nomeClube}} - Membro desde {{item.data_membro | moment("DD/MM/YYYY") }}</small>
                            </div>
                            <span class="badge badge-secondary mr-2">Apelido: {{item.jogador.apelido}}</span>
                            <span class="badge badge-secondary mr-2">Camisa: {{item.numero_camisa}}</span>
                            <span class="badge badge-secondary mr-2">Posição: {{item.posicao}}</span>
                            <span class="badge badge-secondary mr-2">Nota: {{item.nota}}</span>                            
                            <span class="badge badge-secondary" v-if="item.mensalista">Mensalista</span>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
        </b-col>
    </b-row>
    
        <!--b-dropdown-item-button @click="editar(data.item.id)">Editar</b-dropdown-item-button>
        <b-dropdown-item-button @click="confirmaExclusao(data.item)">Excluir</b-dropdown-item-button -->
        <!--b-modal id="modal1" ref="modal1" title="Confirmar exclusão" busy>
            <p class="my-4">Confirma exclusão do jogador {{jogador.nome}}?</p>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right ml-2" variant="danger" @click="excluir">Sim</b-btn>
                <b-btn size="sm" class="float-right" variant="secondary" @click="cancelarExclusao">Não</b-btn>                            
            </div>
        </b-modal -->

        <!-- Modal de iclusão de jogador no clube -->
        <b-modal id="vinculoModal" ref="vinculoModal" title="Vincular jogador" busy>
            <b-row class="mb-2">
                <b-col md="12">
                    <h6>Jogador: {{jogador.first_name}} </h6>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="4">
                    <b-form-group>
                        <label for="posicao">Posição</label>
                        <b-form-select id="posicao"
                            :plain="true"
                            :multiple="false"
                            :options="[
                                { text: 'Goleiro', value: 'GO' },
                                { text: 'Zagueiro', value: 'ZG' },
                                { text: 'Lateral', value: 'LT' }, 
                                { text: 'Meio', value: 'MC' }, 
                                { text: 'Atacante', value: 'AT'}, 
                            ]"
                            v-focus v-model="jogadorClube.posicao">
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group>
                        <label for="nome">Camisa</label>
                        <b-form-input v-model="jogadorClube.numero_camisa" type="text" autocomplete="off"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group>
                        <label for="nome">Nota</label>
                        <b-form-input v-model="jogadorClube.nota" type="text" autocomplete="off"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-checkbox id="checkbox1"
                                        v-model="jogadorClube.mensalista"
                                        value="true"
                                        unchecked-value="false">
                        Mensalista
                    </b-form-checkbox>
                </b-col>
            </b-row>
            
            <div slot="modal-footer" class="w-100">
                <b-btn v-if="jogadorClube.id == null" size="sm" class="float-right ml-2" variant="primary" @click="salvarVinculo">Salvar</b-btn>
                <b-btn v-if="jogadorClube.id > 0" size="sm" class="float-right ml-2" variant="warning" @click="updateVinculo">Salvar</b-btn>
                <b-btn size="sm" class="float-right" variant="secondary" @click="cancelarVinculo">Cancelar</b-btn>                            
            </div>
        </b-modal>
    </div>
</template>
<script>
export default {
    name: 'Jogadores',
    data: function () {
    return {
      idClube: 0,
      nomeClube: '',
      jogador: {},
      jogadorClube: {mensalista:true},
      jogadoresSearch: [],
      jogadoresClube: [],
      query: ''
    }
  },
  created() {
       this.idClube = this.$route.params.id
       this.getClube()
       this.searchJogadorClube()
  },
  methods: {
    searchJogador(){
        return this.$http.get('jogadores-search?search=' + this.query)
        .then(response => {
                this.jogadoresSearch = response.data;
        });  
    },
    searchJogadorClube(){
        return this.$http.get('jogadores-clubes')
        .then(response => {
                this.jogadoresClube = response.data;
        });  
    },
    getClube(){
        return this.$http.get('clubes/' + this.idClube)
        .then(response => {
                this.nomeClube = response.data.nome;
        });
    },
    prepararVinculo(item){
        this.jogador = item
        this.$refs.vinculoModal.show()
    },
    salvarVinculo(){
        this.jogadorClube.clube = this.idClube
        this.jogadorClube.jogador = this.jogador.id
        this.$http.post('jogadores-clubes',{
                mensalista: this.jogadorClube.mensalista,
                numero_camisa: this.jogadorClube.numero_camisa,
                posicao: this.jogadorClube.posicao,
                nota: this.jogadorClube.nota,
                clube: this.idClube,
                jogador: this.jogador.id
            }).then(response => {
                this.$toast.top('Vínculo inserido com sucesso!');
                this.searchJogadorClube()
                this.cancelarVinculo()
            }).catch(e => {
                this.$toast.top('Erro inserindo vínculo: ' + e.error);
            })
    },
    updateVinculo(){
        this.jogadorClube.clube = this.idClube
        this.jogadorClube.usuario = this.jogador.id
        this.$http.put('jogadores-clubes/'+ this.jogadorClube.id ,{
                id: this.jogadorClube.id,
                mensalista: this.jogadorClube.mensalista,
                numero_camisa: this.jogadorClube.numero_camisa,
                posicao: this.jogadorClube.posicao,
                nota: this.jogadorClube.nota,
                clube: this.idClube,
                usuario: this.jogador.id
            }).then(response => {
                this.$toast.top('Jogador alterado com sucesso!');
                this.searchJogadorClube()
                this.cancelarVinculo()
            }).catch(e => {
                this.$toast.top('Erro alterando jogador: ' + e.error);
            })
    },
    editarJogadorClube(item){
        this.jogadorClube = item
        this.jogador = item.usuario
        this.$refs.vinculoModal.show()
    },
    cancelarVinculo(){
        this.jogadorClube = {mensalista: true}
        this.$refs.vinculoModal.hide()
    },
    confirmaExclusao(item){
        this.jogador = item
        this.$refs.modal1.show()
    },
    cancelarExclusao(){
        this.jogador = {}
        this.$refs.modal1.hide()
    },
    excluir() {
        this.$http.delete('jogadores/' + this.jogador.id).then(response => {
            this.$toast.top('Jogador "' + this.jogador.first_name + '" excluído com sucesso!');
            this.cancelarExclusao()
            this.searchJogadorClube()
        }).catch(e => {
            this.erro = e.error;
        })
    },
    editar(id) {
        const jogadorId = id
        this.$router.push({path: `${jogadorId}/editar`});
    }
  }
}
</script>

<style>
  .td-5 {
    width: 5%;
  }
  .td-10 {
    width: 10%;
  }
  .td-25 {
      width: 25%;
  }
  .mao {
      cursor: pointer;
  }
</style>
