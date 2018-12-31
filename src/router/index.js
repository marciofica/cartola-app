import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

//Clubes
const Clubes = () => import('@/views/clubes/Clubes')

//Times
const Times = () => import('@/views/clubes/times/Times')
const TimesNovo = () => import('@/views/clubes/times/TimesNovo')
const TimesEditar = () => import('@/views/clubes/times/TimesEditar')

//Jogadores
const Jogadores = () => import('@/views/clubes/jogadores/Jogadores')
const JogadoresNovo = () => import('@/views/clubes/jogadores/JogadoresNovo')

//Partidas
const Partidas = () => import('@/views/clubes/partidas/Partidas')
const PartidasNovo = () => import('@/views/clubes/partidas/PartidasNovo')
const PartidasEditar = () => import('@/views/clubes/partidas/PartidasEditar')

//Indicadores
const Indicadores = () => import('@/views/clubes/indicadores/Indicadores')
const IndicadoresNovo = () => import('@/views/clubes/indicadores/IndicadoresNovo')
const IndicadoresEditar = () => import('@/views/clubes/indicadores/IndicadoresEditar')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {auth: true}
        },
        {
          path: 'clubes',
          redirect: '/clubes/list',
          name: 'Clubes',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            { path: 'list', name: 'Lista de clubes', component: Clubes, meta: {auth: true} },
            { 
              path: '/clubes/:id/times',
              redirect: '/clubes/:id/times/list', 
              name:'Times', 
              component: {
                render (c) { return c('router-view') }
              }, 
              meta: {auth: true} ,
              children: [
                { path: 'list', name:'Lista de times', component: Times, meta: {auth: true} },
                { path: 'novo', name:'Cadastrar time', component: TimesNovo, meta: {auth: true} },
                { path: ':time/editar', name:'Editar time', component: TimesEditar, meta: {auth: true} },
              ]
            },
            { 
              path: '/clubes/:id/indicadores',
              redirect: '/clubes/:id/indicadores/list', 
              name:'Indicadores', 
              component: {
                render (c) { return c('router-view') }
              }, 
              meta: {auth: true} ,
              children: [
                { path: 'list', name:'Lista de indicadores', component: Indicadores, meta: {auth: true} },
                { path: 'novo', name:'Cadastrar indicador', component: IndicadoresNovo, meta: {auth: true} },
                { path: ':indicador/editar', name:'Editar indicador', component: IndicadoresEditar, meta: {auth: true} },
              ]
            },
            {
              path: '/clubes/:id/jogadores',
              redirect: '/clubes/:id/jogadores/list',
              name: 'Jogadores',
              component: {
                render (c) { return c('router-view') }
              },
              meta: {auth: true},
              children: [
                { path: 'list', name:'Lista de jogadores', component: Jogadores, meta: {auth: true} },
                { path: 'novo', name:'Cadastrar jogador', component: JogadoresNovo, meta: {auth: true} }
              ]
            },
            {
              path: '/clubes/:id/partidas',
              redirect: '/clubes/:id/partidas/list',
              name: 'Partidas',
              component: {
                render (c) { return c('router-view') }
              },
              meta: {auth: true},
              children: [
                { path: 'list', name:'Lista de partidas', component: Partidas, meta: {auth: true} },
                { path: 'novo', name:'Cadastrar partida', component: PartidasNovo, meta: {auth: true} },
                { path: ':partida/editar', name:'Gerenciar partida', component: PartidasEditar, meta: {auth: true} }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {auth: false}
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})