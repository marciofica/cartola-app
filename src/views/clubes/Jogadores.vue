<template>
    <div>
        <b-row>
        <b-col md="12">
            <div class="card">
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
            </div>
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
      tableItems: [],
      tableFields: {
          nome: {
              label: 'Nome',
              sortable: true
          },
          apelido: {
              label: 'Apelido',
              tdClass: 'td-25'
          },
          nota: {
              label: 'Nota',
              sortable: true,
              tdClass: 'td-5 text-right'
          },
          posicao: {
              label: 'Posição',
              tdClass: 'td-5 text-center'
          },
          numero_camisa: {
              label: 'Camisa',
              tdClass: 'td-5 text-center'
          },
          acoes: {
                label: '',
                class: 'text-center',
                tdClass: 'td-5'
           }
      }
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
