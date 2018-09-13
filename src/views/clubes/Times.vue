<template>
    <b-row>
        <b-col md="12">
            <div class="card">
                <div class="card-header">
                    <div class="h6">
                        Times do clube: {{ nomeClube }}
                        <router-link class="btn btn-square btn-sm btn-primary float-right" :to="{ path: 'novo'}"><i class="fa fa-plus"></i> Adicionar time</router-link>
                    </div>
                </div>
                <div class="card-body">
                    <b-table class="mb-0 table-outline" responsive="sm" hover :items="tableItems" :fields="tableFields" head-variant="light">
                        <div slot="ativo" slot-scope="item">
                            <span v-bind:class="{ 'badge badge-success': item.value,  'badge badge-secondary': !item.value }">
                                {{item.value? 'Ativo': 'Inativo'}}
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
                        <p class="my-4">Confirma exclusão do time {{time.nome}}?</p>
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
    name: 'Times',
    data: function () {
    return {
      idClube: 0,
      nomeClube: '',
      time: {},
      tableItems: [],
      tableFields: {
        nome: {
          label: 'Nome',
          sortable: true
        },
        ano: {
          label: 'Ano',
          sortable: true,
          tdClass: 'td-10'
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
        return this.$http.get('times/', {
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
        this.time = item
        this.$refs.modal1.show()
    },
    cancelarExclusao(){
        this.time = {}
        this.$refs.modal1.hide()
    },
    excluir() {
        this.$http.delete('times/' + this.time.id + '/').then(response => {
            this.$toast.top('Time "' + this.time.nome + '" excluído com sucesso!');
            this.cancelarExclusao()
            this.getAll()
        }).catch(e => {
            this.erro = e.error;
        })
    },
    editar(id) {
        const timeId = id
        this.$router.push({path: `${timeId}/editar`});
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
</style>