<template>
    <div id="app" style="height: 100vh;">
        <div class="main-menu">
            <header class="header">
                <a href="home.html" class="logo"><i class="ico ti-book"></i><strong>Biblio</strong></a>
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
                            <a class="waves-effect" href="clientes.html"><i class="menu-icon ti-user"></i><span>Clientes</span></a>
                        </li> 
                        <li>
                            <a class="waves-effect" href="livros.html"><i class="menu-icon ti-layers-alt"></i><span>Livros</span></a>
                        </li>
                        <li>
                            <a class="waves-effect" href="estantes.html"><i class="menu-icon ti-map"></i><span>Estantes</span></a>
                        </li>
                        <!-- <li>
                            <a class="waves-effect" href="prateleiras.html"><i class="menu-icon ti-map-alt"></i><span>Prateleiras</span></a>
                        </li> -->
                        <li>
                            <a class="waves-effect" href="usuarios.html"><i class="menu-icon ti-user"></i><span>Usuários</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="fixed-navbar">
            <div class="pull-right">
                <div class="ico-item">
                    <i class="ti-user"></i>
                    <ul class="sub-ico-item">
                        <li><a href="#">Configurações</a></li>
                        <li><a href="/logout">Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="wrapper">
            <div class="main-content">
                <div class="row small-spacing">
                    <div class="col-lg-6 col-md-6 col-sm-5 col-xs-5">
                        <div class="box-content">
                            <div class="statistics-box">
                                <p class="text">Livros</p>
                                <h2 class="counter">80k</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7">
                        <div class="box-content">
                            <div class="statistics-box">
                                <p class="text">Usuários</p>
                                <h2 class="counter">200</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row small-spacing">
                    <div class="col-lg-6 col-sm-12 col-xs-12">
                        <div class="box-content">
                            <h4 class="box-title">Livros por Categoria</h4>
                            <div id="livros-categoria"></div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12 col-xs-12">
                        <div class="box-content">
                            <h4 class="box-title">Livros por Status</h4>
                            <div id="livros-status"></div>
                        </div>
                    </div>
                </div>

                <footer class="footer">
                    <div class="frm-footer text-center">Cocão Sistemas ©
                        {{ new Date().getFullYear() }}
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login'
    }
</script>

<style>
    @import '../assets/css/fonts/font-awesome/css/font-awesome.min.css';
    @import '../assets/css/bootstrap.min.css';
    @import '../assets/css/nprogress.css';
    @import '../assets/css/style.min.css';
</style>