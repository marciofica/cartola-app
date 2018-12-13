<template>
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">({{nomeClube}}) Partidas</h4>
        </b-col>
        <b-col sm="7" class="d-none d-md-block mb-2">
          <b-button variant="primary" class="float-right" :to="{ path: 'novo'}"><i class="fa fa-plus"></i> Adicionar partida</b-button>  
        </b-col>
      </b-row>
      <b-row>
          <b-col sm="12" v-if="registros.length < 1">
              <h4 class="text-center">Nenhuma partida ainda cadastrada!</h4>
          </b-col>
            <b-col sm="6" lg="3" v-for="item in registros" :key="item.id">
                <b-card no-body>
                    <div slot="header">
                        <div class="card-header-actions">
                            <b-link @click.prevent="editar(item.id)" class="card-header-action btn-setting">
                                <i class="icon-settings"></i>
                            </b-link>
                        </div>
                        <span class="float-left">{{item.dh_partida | moment("DD/MM/YYYY HH:mm")}}</span>                        
                    </div>
                    <b-card-body>
                        <div class="mb-1"><i class="fa fa-angle-right"></i> {{item.time1.nome}}</div>
                        <div><i class="fa fa-angle-right"></i> {{item.time2.nome}}</div>
                        <p class="mb-1 text-right"><b-badge variant="secondary" class="float-right">Criada</b-badge></p>
                    </b-card-body>
                </b-card>
            </b-col>
            <!--b-col sm="6" lg="3">
                <b-card no-body>
                    <div slot="header">
                        <span class="float-left">Data: 26/08/2018 18:30</span>
                        <b-badge variant="warning" class="float-right">Confirmando</b-badge>
                    </div>
                    <b-card-body>
                        <p class="text-center">Local: Dingos´s Point Ball</p>
                        <p class="text-center">Time 1 x Time 2</p>
                    </b-card-body>
                    <div slot="footer">
                        <b-button variant="primary" class="btn-sm float-right"><i class="fa fa-cog"></i></b-button>
                    </div>
                </b-card>
            </b-col>
            <b-col sm="6" lg="3">
                <b-card no-body>
                    <div slot="header">
                        <span class="float-left">Data: 26/08/2018 18:30</span>
                        <b-badge variant="success" class="float-right">Confirmada</b-badge>
                    </div>
                    <b-card-body>
                        <p class="text-center">Local: Dingos´s Point Ball</p>
                        <p class="text-center">Time 1 x Time 2</p>
                    </b-card-body>
                    <div slot="footer">
                        <b-button variant="primary" class="btn-sm float-right"><i class="fa fa-cog"></i></b-button>
                    </div>
                </b-card>
            </b-col>
            <b-col sm="6" lg="3">
                <b-card no-body>
                    <div slot="header">
                        <span class="float-left">Data: 26/08/2018 18:30</span>
                        <b-badge variant="danger" class="float-right">Cancelada</b-badge>
                    </div>
                    <b-card-body>
                        <p class="text-center">Local: Dingos´s Point Ball</p>
                        <p class="text-center">Time 1 x Time 2</p>
                    </b-card-body>

                    <div slot="footer">
                        <b-button variant="primary" class="btn-sm float-right"><i class="fa fa-cog"></i></b-button>
                    </div>
                </b-card>
            </b-col>
            <b-col sm="6" lg="3">
                <b-card no-body>
                    <div slot="header">
                        <span class="float-left">Data: 26/08/2018 18:30</span>
                        <b-badge variant="secondary" class="float-right">Finalizada</b-badge>
                    </div>
                    <b-card-body>
                        <p class="text-center">Local: Dingos´s Point Ball</p>
                        <p class="text-center">Time 1 (6) x (4) Time 2</p>
                    </b-card-body>

                    <div slot="footer">
                        <b-button variant="primary" class="btn-sm float-right"><i class="fa fa-cog"></i></b-button>
                    </div>
                </b-card>
            </b-col -->
        </b-row>
    </b-card>
</template>
<script>
export default {
    name: "Partidas",
    data () {
        return {
            registros: [],
            idClube: 0,
            nomeClube: ''
        }
    },
    created () {
        this.idClube = this.$route.params.id
    },
    mounted () {
        this.getClube()
        this.getAll()
    },
    methods: {
        getClube(){
            return this.$http.get('clubes/' + this.idClube + '/')
            .then(response => {
                    this.nomeClube = response.data.nome;
            });
        },
        getAll() {
            return this.$http.get('partidas/')
                .then(response => {
                    this.registros = response.data;
                });
        },
        editar(id) {
            const param = id
            this.$router.push({path: `${param}/editar`});
        }
    }
}
</script>

