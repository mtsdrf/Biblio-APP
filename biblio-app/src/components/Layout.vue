<template>
    <fragment>
        <div class="main-menu">
            <header class="header">
                <router-link to='/home'>
                    <a class="logo"><i class="ico ti-book"></i><strong>Biblio</strong></a>
                </router-link>
                <button type="button" class="button-close fa fa-times js__menu_close"></button>
            </header>

            <div class="content">
                <div class="navigation">
                    <h5 class="title" style="background-color: #00962ed4; color: white; text-align: center;">Bem vindo Usuário!</h5>
                    <h5 class="title">Navegação</h5>
                    <ul class="menu js__accordion">
                        <!-- <li>
                            <a class="waves-effect" href="autores.html"><i class="menu-icon ti-user"></i><span>Autores</span></a>
                        </li>-->
                        <li>
                            <router-link to='/clientes'><a class="waves-effect"><i class="menu-icon ti-layers-alt"></i><span>Clientes</span></a></router-link>
                        </li> 
                        <li>
                            <router-link to='/livros'><a class="waves-effect"><i class="menu-icon ti-layers-alt"></i><span>Livros</span></a></router-link>
                        </li>
                        <li>
                            <router-link to='/estantes'><a class="waves-effect"><i class="menu-icon ti-map"></i><span>Estantes</span></a></router-link>
                        </li>
                        <!-- <li>
                            <a class="waves-effect" href="prateleiras.html"><i class="menu-icon ti-map-alt"></i><span>Prateleiras</span></a>
                        </li> -->
                        <li>
                            <router-link to='/usuarios'><a class="waves-effect"><i class="menu-icon ti-user"></i><span>Usuários</span></a></router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="fixed-navbar">
            <!--<div class="pull-left">
                <button type="button" style="background-color: #008629;" class="menu-mobile-button glyphicon glyphicon-menu-hamburger js__menu_mobile"></button>
            </div>-->
            <div class="pull-right">
                <div class="ico-item">
                    <i class="ti-user"></i>
                    <ul class="sub-ico-item">
                        <li><a href="#">Configurações</a></li>
                        <li><a v-on:click="logout()">Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="wrapper">
            <div class="main-content">

                <slot></slot>

                <footer class="footer">
                    <div class="frm-footer text-center">Cocão Sistemas ©
                        {{ new Date().getFullYear() }}
                    </div>
                </footer>
            </div>
        </div>
    </fragment>
</template>

<script>
import Vue from 'vue';
import { Plugin } from 'vue-fragment';

Vue.use(Plugin);

export default {
    name: 'Layout',
    methods: {
        logout() {
            sessionStorage.clear();
            this.$router.replace('/');
        }
    }
}

</script>

<style>

    @import '../assets/css/fonts/font-awesome/css/font-awesome.min.css';
    @import '../assets/css/bootstrap.min.css';
    @import '../assets/css/nprogress.css';
    @import '../assets/css/style.min.css';
    @import '../assets/css/fonts/themify/themify-icons.css';

</style>
