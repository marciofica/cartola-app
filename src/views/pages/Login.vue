<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form v-on:submit="handleSubmit($event)">
                  <h1>Login</h1>
                  <p class="text-muted">Acessar o sistema</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Usuário" autocomplete="username email" v-model="user.email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Senha" autocomplete="current-password" v-model="user.password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" type="submit" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Registre-se</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    handleSubmit: function(e) {
      e.preventDefault()
      
      this.$auth.login({
        params: {client_id: 'n0eBCsMsrQUOdsvR8BXIY77mmwU2m58xK7YpInRr', grant_type: 'password', client_secret: '45vt8CBrAE18kit4Gk94YznLgayHRisy4vkFG8ozZQ9OVh4Cn7nBq6w5eBhglkA7nH5ToJMMmDUA1KYBzQWjtcfZuBGvgdXOtGF1GtPWYN15sZN4Tpl2iGrDAzByWH82', username: this.user.email, password: this.user.password},
        success: function (response) {
          console.log('xuxexo!')
          localStorage.setItem('token', response.data.access_token);
        },
        error: function () {
          console.log('Usuário ou senha inválidos')
        },
        rememberMe: true,
        fetchUser: false,
        redirect: '/dashboard'
      })

    }
  }
}
</script>
