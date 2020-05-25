<template>
    <layout>
        <div class="row small-spacing">
            <div class="col-lg-12 col-xs-12">
                <div class="box-content" style="padding: 15px">
                    <div class="row" style="margin-bottom: 15px;">
                        <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                            <h4>Livros</h4>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                            <router-link to='/livro-formulario'><button type="button" class="btn btn-primary waves-effect waves-light">Adicionar</button></router-link>
                        </div>
                    </div>
                    <div class="table-responsive" data-pattern="priority-columns">
                        <table id="example" class="table table-small-font table-bordered table-striped"
                            style="width:100%">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Editora</th>
                                    <th>Ano</th>
                                    <th>Autor</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody id="table-sgbds">
                               <tr v-for="livro in livros" :key="livro.id">
                                    <td>{{ livro.nome }}</td>
                                    <td>{{ livro.editora }}</td>
                                     <td>{{ livro.ano }}</td>
                                      <td>{{ livro.autor }}</td>
                                    <td style="text-align: center">
                                        <button v-on:click="editar(livro.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                            <i class="ico ti-pencil-alt"></i>
                                        </button>
                                        <button v-on:click="apagar(livro.id)" type="button" class="btn btn-danger waves-effect waves-light">
                                            <i class="ico ti-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
    import Layout from '@/components/Layout';
    import axios from 'axios'

    export default {
        name: 'Livros',
     components: {
            Layout
        },
        data () {
            return {
                livros: []
            }
        },
        beforeCreate() {
            axios.get("http://localhost:8000/api/livro", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res);
                this.livros = res.data;
            })
            .catch(err => {
                console.log(err);
                alert("Falha ao realizar a busca dos livros.");
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/livro-formulario/' + id);
            },

            apagar: function (id) {
                    axios.delete("http://localhost:8000/api/livro/" + id, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        alert("Deletado com sucesso.");    
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Falha ao Deletar.");
                    });
                    axios.get("http://localhost:8000/api/livro", {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                                }
                            }).then(res => {
                                console.log(res);
                                this.livros = res.data;
                            })
                            .catch(err => {
                                console.log(err);
                                alert("Falha ao Atualizar os livros.");
                            });
                }
        }
    } 

</script>

<style>

</style>