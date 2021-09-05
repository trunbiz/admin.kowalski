<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{'navbar-dark': type === 'default'}"
  >
    <a href="#" aria-current="page" class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"> {{$route.name}} </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
      <li class="nav-item d-sm-none">
        <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
        <b-form class="navbar-search form-inline mr-sm-3"
            :class="{'navbar-search-dark': type === 'default', 'navbar-search-light': type === 'light'}"
            id="navbar-search-main">
        <b-form-group class="mb-0">
          <b-input-group class="input-group-alternative input-group-merge">
            <b-form-input placeholder="Search" type="text"> </b-form-input>

            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
            </div>
          </b-input-group>
        </b-form-group>
      </b-form>
      <base-dropdown menu-on-right
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link pr-0">
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img v-if="infoUser.avatar === null" alt="Image placeholder" src="img/theme/team-4.jpg">
                    <img v-else alt="Image placeholder" v-bind:src= "infoUser.avatar">
                  </span>
            <b-media-body class="ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{infoUser.username}}</span>
            </b-media-body>
          </b-media>
        </a>

        <template>

          <b-dropdown-header class="noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </b-dropdown-header>
          <b-dropdown-item href="#!">
            <i class="ni ni-single-02"></i>
            <span>My profile</span>
          </b-dropdown-item>
          <b-dropdown-item href="#!">
            <i class="ni ni-settings-gear-65"></i>
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item href="#!">
            <i class="ni ni-calendar-grid-58"></i>
            <span>Activity</span>
          </b-dropdown-item>
          <b-dropdown-item href="#!">
            <i class="ni ni-support-16"></i>
            <span>Support</span>
          </b-dropdown-item>
          <div class="dropdown-divider"></div>
          <b-dropdown-item v-on:click="clickLogout()">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </b-dropdown-item>

        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import httpErp from '@/service/http-erp';
import VueNotification from "@kugatsu/vuenotification";
import Vue from 'vue';
Vue.use(VueNotification, {
  timer: 3
});

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
    httpErp
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
    }
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      infoUser: {
        'username': null,
        'avatar': null
      }
    };
  },
  created() {
    this.checkLogin(),
    this.getInfoUser()
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    getInfoUser(){
      // this.$notification.new("hello world", {  timer: 5 });
      let infoUser = JSON.parse(localStorage.getItem('infoUser'))
      if (infoUser === null){
        this.$notification.warning('Bạn chưa đăng nhập', {  timer: 5 });
      }else {
        this.infoUser = infoUser
      }
    },
    clickLogout(){
      httpErp.logout().then(e => {
        if (e.data.data.success){
          this.$notification.success(e.data.data.message, {  timer: 5 });
          localStorage.removeItem('infoUser');
          localStorage.removeItem('token');
          window.location.href = 'login'
        } else{
          this.$notification.error(e.data.data.message, {  timer: 5 });
        }
      })
    },
    checkLogin(){
      httpErp.getInfoUser().then(e => {
        if (e.data.success){
          localStorage.setItem('infoUser', JSON.stringify(e.data.data.infoUser));
          localStorage.setItem('token', e.data.data.token);
          this.$notification.success(e.data.message, {  timer: 5 });
        } else{
          this.$notification.error(e.data.message, {  timer: 5 });
          localStorage.removeItem('infoUser');
          localStorage.removeItem('token');
        }
      })
    }
  }
};
</script>
