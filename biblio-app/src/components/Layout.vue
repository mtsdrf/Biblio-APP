<template>
    <fragment>
        <div class="main-menu">
            <header class="header">
                <router-link to='/home'>
                    <a class="logo"><i class="ico ti-book"></i><strong>Biblio</strong></a>
                </router-link>
                <button type="button" class="button-close fa fa-times js__menu_close" v-on:click="abreMenu(false)"></button>
            </header>

            <div class="content">
                <div class="navigation">
                    <h5 class="title" style="background-color: #00962ed4; color: white; text-align: center;">Bem vindo {{ user }}!</h5>
                    <h5 class="title">Navegação</h5>
                    <ul class="menu js__accordion">

                        <li :class="[currentPage.includes('clientes') ? activeClass : '', 'nav-item']">
                            <router-link to='/clientes'><a class="waves-effect " ><i class="menu-icon ti-user"></i><span>Clientes</span></a></router-link>
                        </li>
                        <li :class="[currentPage.includes('livros') ? activeClass : '', 'nav-item']">
                            <router-link to='/livros'><a class="waves-effect  "><i class="menu-icon  ti-book"></i><span>Livros</span></a></router-link>
                        </li>
                        <li :class="[currentPage.includes('usuarios') ? activeClass : '', 'nav-item']">
                            <router-link to='/usuarios'><a class="waves-effect "><i class="menu-icon ti-bookmark"></i><span>Usuários</span></a></router-link>
                        </li>
                        <li :class="[currentPage.includes('emprestimos') ? activeClass : '', 'nav-item']">
                            <router-link to='/emprestimos'><a class="waves-effect"><i class="menu-icon ti-agenda"></i><span>Empréstimos</span></a></router-link>
                        </li>
                        <li>
                        <li :class="[currentPage.includes('corredores') ? activeClass : '', 'nav-item']">
                            <router-link to='/corredores'><a class="waves-effect"><i class="menu-icon  ti-layers-alt"></i><span>Corredores</span></a></router-link>
                        </li>
                        <li :class="[currentPage.includes('estantes') ? activeClass : '', 'nav-item']">
                            <router-link to='/estantes'><a class="waves-effect"><i class="menu-icon ti-direction-alt"></i><span>Estantes</span></a></router-link>
                        </li>
                        <li :class="[currentPage.includes('prateleiras') ? activeClass : '', 'nav-item']"> 
                            <router-link to='/prateleiras'><a class="waves-effect"><i class="menu-icon ti-view-list"></i><span>Prateleiras</span></a></router-link>
                        </li>
                    </ul>

                </div>
                <footer>
                    <div class="frm-footer text-center " style="margin-top:50%">Cocão Sistemas ©
                        {{ new Date().getFullYear() }}
                    </div>
                </footer>
            </div>
        </div>

        <div class="fixed-navbar">
            <div class="pull-left">
                <button type="button" style="background-color: #008629;" class="menu-mobile-button ti-menu js__menu_mobile" v-on:click="abreMenu(true)"></button>
            </div>
            <div class="pull-right">
                <div class="ico-item">
                    <i class="ti-user"></i>
                    <ul class="sub-ico-item">
                        <!--li><a href="#">Configurações</a></li-->
                        <li style="cursor: pointer"><a v-on:click="logout()">Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="wrapper">
            <div class="main-content">
                <slot></slot>
            </div>
        </div>
    </fragment>
</template>

<script>
import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import VueJwtDecode from 'vue-jwt-decode';

Vue.use(Plugin);

export default {
    name: 'Layout',
    data() {
        return {
            user: 'Usuário',
            activeClass: 'active current',     
        }
    },
    computed:{
        currentPage(){
            return this.$route.path;
        },
    },
    methods: {
        logout() {
            sessionStorage.clear();
            this.$router.replace('/');
        },

        abreMenu(option) {
            if(option === true)
                document.querySelector("html").className = "menu-active";
            else
                document.querySelector("html").className = "";
        }
    },
    created() {
        this.abreMenu(false);
        var tokenDecoded = VueJwtDecode.decode(sessionStorage.getItem("token"));
        tokenDecoded === null || tokenDecoded === undefined ? this.user = "Usuário" : this.user = tokenDecoded.name;
    },   
}
</script>

<style>
    @import '../assets/css/fonts/font-awesome/css/font-awesome.min.css';
    @import '../assets/css/bootstrap.min.css';
    @import '../assets/css/nprogress.css';
    @import '../assets/css/style.min.css';
    @import '../assets/css/fonts/themify/themify-icons.css';

.active{
    opacity:1;
    transition: all 0.25s;
}

.navigation .menu>li.active>a{
    background: "#f5f5f5"!important;
}

@media only screen and (max-width: 600px) {
    .frm-footer {
        margin-top: 80%!important;
    }

    #loading-content {
        left: 57%!important;
        top: 52%!important;
    }
}

</style>
