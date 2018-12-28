<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <div class="h6">
                        ({{ nomeClube }}) Lista de indicadores
                        <router-link class="btn btn-square btn-sm btn-primary float-right" :to="{ path: 'novo'}"><i class="fa fa-plus"></i> Adicionar</router-link>
                    </div>
                </div>
                <div class="card-body">
                    <h4 class="text-center" v-if="tableItems.length < 1">Nenhum indicador ainda cadastrado!</h4>
                    <b-table class="mb-0 table-outline" responsive="sm" v-if="tableItems.length > 0" hover :items="tableItems" :fields="tableFields" head-variant="light">
                        <div slot="ativo" slot-scope="item">
                            <span v-bind:class="{ 'badge badge-success': item.value == 'S',  'badge badge-secondary': item.value == 'N' }">
                                {{item.value == 'S'? 'Ativo': 'Inativo'}}
                            </span>
                        </div>
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
                        <p class="my-4">Confirma exclusão do indicador {{indicador.nome}}?</p>
                        <div slot="modal-footer" class="w-100">
                            <b-btn size="sm" class="float-right ml-2" variant="danger" @click="excluir">Sim</b-btn>
                            <b-btn size="sm" class="float-right" variant="secondary" @click="cancelarExclusao">Não</b-btn>                            
                        </div>
                    </b-modal>
                </div>
            </div>
        </b-col>
    </b-row>
</template>
<script>
export default {
    name: 'Indicadores',
    data: function () {
    return {
      idClube: 0,
      nomeClube: '',
      indicador: {},
      tableItems: [],
      tableFields: {
        nome: {
          label: 'Nome',
          tdClass: 'td-20'
        },
        descricao: {
          label: 'Descrição',
          sortable: true,
          
        },
        ativo: {
          label: 'Ativo',
          class: 'text-center',
          sortable: true,
          tdClass: 'td-5'
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
        return this.$http.get('indicadores', {
            
        }).then(response => {
                this.tableItems = response.data;
        });
            
    },
    getClube(){
        return this.$http.get('clubes/' + this.idClube)
        .then(response => {
                this.nomeClube = response.data.nome;
        });
    },
    confirmaExclusao(item){
        this.time = item
        this.$refs.modal1.show()
    },
    cancelarExclusao(){
        this.time = {}
        this.$refs.modal1.hide()
    },
    excluir() {
        this.$http.delete('indicadores/' + this.indicador.id).then(response => {
            this.$toast.top('Indicador "' + this.indicador.nome + '" excluído com sucesso!');
            this.cancelarExclusao()
            this.getAll()
        }).catch(e => {
            this.erro = e.error;
        })
    },
    editar(id) {
        const indicadorId = id
        this.$router.push({path: `${indicadorId}/editar`});
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
  .td-20 {
    width: 20%;
  }
</style>