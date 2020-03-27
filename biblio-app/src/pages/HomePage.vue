<template>
    <layout>
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
    </layout>
</template>

<script>
    import Layout from '@/components/Layout';

    export default {
        name: 'HomePage',
        components: {
            Layout
        }
    }
</script>

<style>

</style>
