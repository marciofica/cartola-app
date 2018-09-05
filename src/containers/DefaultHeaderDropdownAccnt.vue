<template>
  <AppHeaderDropdown right>
    <template slot="header">
      <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>Opções</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Perfil</b-dropdown-item>
      <!--b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item -->
      <b-dropdown-item v-on:click="logout($event)"><i class="fa fa-lock" /> Sair</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods: {
    logout: function(e) {
      e.preventDefault()      
      this.$auth.logout({
        makeRequest: true,
        params: {
          client_id: 'n0eBCsMsrQUOdsvR8BXIY77mmwU2m58xK7YpInRr',
          token: localStorage.getItem('default_auth_token')
        },
        success: function (response) { },
        error: function () {
          
        },
        redirect: '/pages/login'
      })
    }
  }
}
</script>
