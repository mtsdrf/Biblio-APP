<template>
    <div>
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
                                        <th>Edição</th>
                                        <th>Local</th>
                                        <th>Ano</th> 
                                        <th>Autor</th>
                                       <th>Identificador</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                <tbody id="table-sgbds">
                                    <tr v-for="livro in livros" :key="livro.id">
                                        <td>{{ livro.nome }}</td>
                                        <td>{{ livro.editora }}</td>
                                        <td>{{ livro.edicao }}</td>
                                        <td>{{ livro.local }}</td>
                                        <td>{{ livro.ano }}</td>
                                        <td>{{ livro.autor }}</td>
                                        <td>{{ livro.identificador }}</td>
                                        <td style="text-align: center">
                                            <button v-on:click="editar(livro.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                                <i class="ico ti-pencil-alt"></i>
                                            </button>
                                            <button v-on:click="mostra_modal_excluir('modal-excluir', livro)" type="button" class="btn btn-danger waves-effect waves-light">
                                                <i class="ico ti-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!livros.length" style="text-align:center">
                                        <td colspan="5">Sem registros</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </layout>
        <input type="hidden" id="id_livro_deletar">
        <modal name="modal-excluir" width="400px" height="200px" @before-open="set_id_livro">
            <div style="text-align:center">
                <h3>Confirmação...</h3>
            </div>
            <hr>
            <div style="margin-left: 15px">
                <p>Deseja excluir o livro?</p>
            </div>
            <hr>
            <div style="text-align: right; margin-right: 15px">
                <button @click="$modal.hide('modal-excluir')" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                    Não
                </button>
                <button @click="apagar()" type="button" class="btn btn-danger waves-effect waves-light">
                    Sim
                </button>
            </div>
        </modal>
        <Loader :is-visible="isLoading"></Loader>
    </div>
</template>

<script>
    import Layout from '@/components/Layout';
    import axios from 'axios'
    import Loader from '@/components/Loader';

    export default {
        name: 'Livros',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                livros: [],
                isLoading: false
            }
        },
        created() {
            this.isLoading = true;
            axios.get("http://localhost:8000/api/livro", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res);
                this.livros = res.data;
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
                alert("Falha ao realizar a busca de livros.");
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/livro-formulario/' + id);
            },
            
            mostra_modal_excluir: function (modal_nome, livro){
                this.$modal.show(modal_nome, { livro });
            },

            set_id_livro: function(event) {
                document.querySelector("#id_livro_deletar").value = event.params.livro.id;
            },

            apagar: function () {
                this.isLoading = true;
                this.$modal.hide('modal-excluir');
                var id = document.querySelector("#id_livro_deletar").value;
                axios.delete("http://localhost:8000/api/livro/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(() => {
                    axios.get("http://localhost:8000/api/livro", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        this.livros = res.data;
                        this.isLoading = false;
                        alert("Deletado com sucesso.");
                    }).catch(err => {
                        this.isLoading = false;
                        console.log(err);
                        alert("Deletado com sucesso, porém houve uma falha na busca dos dados atualizados.");
                    });
                }).catch(err => {
                    console.log(err);
                    this.isLoading = false;
                    alert("Falha ao Deletar.");
                });
            }
        }
    } 

</script>

<style>

</style>