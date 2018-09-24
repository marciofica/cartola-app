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
                            <b-button variant="primary" @click="searchJogador">Buscar</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                    
                     <b-list-group>
                        <b-list-group-item v-for="item in jogadoresSearch" v-bind:key="item.id" href="#" class="flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{item.first_name}}</h5>
                            </div>
                            <small class="mb-1">Apelido: {{item.apelido}} | E-mail: {{item.email}}</small>
                        </b-list-group-item>
                     </b-list-group>
                </div>
            </div>
        </b-col>
        <b-col md="8">
            <div class="card">
                <div class="card-header">
                    <div class="align-middle">
                        <span>Jogadores do elenco</span> <span class="badge badge-success float-right">33 jogadores</span>
                    </div>
                </div>
                <div class="card-body">
                    <b-list-group>
                        <b-list-group-item href="#" class="flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Márcio Figueiredo Cardoso</h5>
                            <small>Membro desde 03/05/2015</small>
                            </div>
                            <p class="mb-1">Apelido: Márcio | Camisa: 55 | Posição: ZG | Nota: 7,9 </p>
                        </b-list-group-item>
                         <b-list-group-item href="#" class="flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Márcio Figueiredo Cardoso</h5>
                            <small>Membro desde 03/05/2015</small>
                            </div>
                            <p class="mb-1">Apelido: Márcio | Camisa: 55 | Posição: ZG | Nota: 7,9 </p>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
            <!--div class="card">
                <div class="card-header">
                    <div class="align-middle">
                        <span>Jogadores do clube: {{ nomeClube }}</span>
                        <router-link class="btn btn-square btn-sm btn-primary float-right" :to="{ path: 'novo'}"><i class="fa fa-plus"></i> Adicionar jogador</router-link>
                    </div>
                </div>
                <div class="card-body">
                    <h4 class="text-center" v-if="tableItems.length === 0">Nenhum jogador ainda cadastrado!</h4>
                    <b-table v-if="tableItems.length > 0" class="mb-0 table-outline" responsive="sm" hover :items="tableItems" :fields="tableFields" head-variant="light">
                        <div slot="acoes" slot-scope="data">
                            <b-dropdown id="ddown-sm" size="sm" right class="m-2" variant="light">
                                <template slot="button-content">
                                    <i class="fa fa-cogs"></i><span class="sr-only">Opções</span>
                                </template>
                                <b-dropdown-item-button @click="editar(data.item.id)">Editar</b-dropdown-item-button>
                                <b-dropdown-item-button @click="confirmaExclusao(data.item)">Excluir</b-dropdown-item-button>
                            </b-dropdown>                            
                        </div>
                    </b-table>
                    <b-modal id="modal1" ref="modal1" title="Confirmar exclusão" busy>
                        <p class="my-4">Confirma exclusão do jogador {{jogador.nome}}?</p>
                        <div slot="modal-footer" class="w-100">
                            <b-btn size="sm" class="float-right ml-2" variant="danger" @click="excluir">Sim</b-btn>
                            <b-btn size="sm" class="float-right" variant="secondary" @click="cancelarExclusao">Não</b-btn>                            
                        </div>
                    </b-modal>
                </div>
            </div -->
        </b-col>
    </b-row>
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
      jogadoresSearch: [],
      jogadoresClube: [],
      query: ''
    }
  },
  created() {
       this.idClube = this.$route.params.id
       this.getClube()
       this.getAll()
  },
  methods: {
    getAll(){
        return this.$http.get('jogadores/', {
            params: {
                clube: this.idClube
            }
        }).then(response => {
                this.tableItems = response.data;
        });
            
    },
    searchJogador(){
        return this.$http.get('jogadores/?search=' + this.query)
        .then(response => {
                this.jogadoresSearch = response.data;
        });  
    },
    getClube(){
        return this.$http.get('clubes/' + this.idClube + '/')
        .then(response => {
                this.nomeClube = response.data.nome;
        });
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
        this.$http.delete('jogadores/' + this.jogador.id + '/').then(response => {
            this.$toast.top('Jogador "' + this.jogador.nome + '" excluído com sucesso!');
            this.cancelarExclusao()
            this.getAll()
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
</style>
