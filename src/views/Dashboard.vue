<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="card-accent">
          <div slot="header">
              Confirmar presença?
              <div class="card-header-actions">
                <b-button-group size="sm">
                  <b-button variant="success"><i class="icon-like"></i></b-button>
                  <b-button variant="danger"><i class="icon-dislike"></i></b-button>
              </b-button-group>
              </div>
            </div>
          <b-card-body class="pb-0">
            <h4 class="mb-0">09/01/2019 18:30</h4>
            <p>Dingos Point Ball</p>
            <p>PokaBola</p>
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
     
    }
  },
  methods: {
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
