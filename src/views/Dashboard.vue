<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12" v-if="registros.length < 1">
        Nenhuma partida aguardando confirmação!
      </b-col>
      <b-col sm="6" lg="4" v-if="registros.length > 0" v-for="item in registros" :key="item.id">
        <b-card no-body class="card-accent">
            <div slot="header">
              <strong>Jogo: {{frontEndDateFormat(item.partida.dh_partida)}}</strong>
              <b-badge variant="secondary" v-if="item.partida.status=='C'" class="float-right">Criada</b-badge>
              <b-badge variant="warning" v-if="item.partida.status=='A'" class="float-right">Aguardando confirmação</b-badge>
              <b-badge variant="warning" v-if="item.partida.status=='E'" class="float-right">Confirmação encerrada</b-badge>
              <b-badge variant="primary" v-if="item.partida.status=='I'" class="float-right">Aguardando indicadores</b-badge>
              <b-badge variant="primary" v-if="item.partida.status=='X'" class="float-right">Indicadores encerrados</b-badge>
              <b-badge variant="success" v-if="item.partida.status=='P'" class="float-right">Encerrada</b-badge>
            </div>
          <b-card-body class="pb-0">
              <table class="table table-sm">
                <tr>
                    <th scope="row">Local</th>
                    <td>{{item.partida.local}}</td>
                </tr>
                <tr>
                    <th scope="row">Vai jogar?</th>
                    <td>
                      {{item.confirmado == 'S'? 'Sim': 'Não'}} 
                      <b-button-group size="sm" v-if="item.partida.status == 'A'">
                        <b-button variant="ghost-success" v-if="item.confirmado != 'S' || item.dh_confirmacao == null" @click="confirmarPartida(item.id, 'S')"><i class="icon-like"></i> confirmar</b-button>
                        <b-button variant="ghost-danger" v-if="item.confirmado != 'N' || item.dh_confirmacao == null" @click="confirmarPartida(item.id, 'N')"><i class="icon-dislike"></i> desistir</b-button>
                    </b-button-group>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Confirmado:</th>
                    <td>{{frontEndDateFormat(item.dh_confirmacao)}}</td>
                </tr>
                <tr>
                    <th scope="row">Seu time:</th>
                    <td><small>(Aguardando sorteio)</small></td>
                </tr>
              </table>
            <footer class="text-right mt-2">
              <small><p>{{clube[0].nome}}</p></small>
            </footer>
          </b-card-body>
        </b-card>
      </b-col>
      
    </b-row>
    
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  components: {
  },
  data: function () {
    return {
      registros: [],
      clube: []
    }
  },
  mounted() {
    this.getAll()
    this.getClubeBySubdomain()

  },
  methods: {
    getAll() {
        return this.$http.get("partidas-confirmacao-user").then(response => {            
            this.registros = response.data;
        });
    },
    getClubeBySubdomain() {
      return this.$http.get('clubes-open?search=' + localStorage.getItem('clube')).then(response => {            
            this.clube = response.data;
        });
    },
    confirmarPartida(idPartida, status) {
      this.$http.patch('partidas-confirmacao-user/' + idPartida,{
          confirmado: status,
          dh_confirmacao: this.$moment()
      }).then(response => {
          this.$toast.top('Confirmação realizada!');
          this.getAll()
      }).catch(e => {
          this.$toast.top(e.error)
      })
    },
    frontEndDateFormat: function(date) {
        return this.$moment(date, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm')
    },
    backEndDateFormat: function(date) {
        return this.$moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
