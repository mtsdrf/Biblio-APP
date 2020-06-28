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
                        <div class="table-responsive text-center">
                            <vue-good-table
                                :columns="columns"
                                :rows="rows"
                                :fixed-header="true"
                                :search-options="{
                                  placeholder: 'Pesquisar...',
                                  enabled: true
                                }">
                                <template slot="table-row" slot-scope="props">
                                    <span v-if="props.column.field == 'emprestado' && props.row.emprestado === 1">
                                        <button type="button" class="btn btn-danger btn-block"><i class="menu-icon ti-close"></i></button>
                                    </span>
                                    <span v-else-if="props.column.field == 'emprestado' && props.row.emprestado === 0">
                                        <button type="button" class="btn btn-success btn-block disbled"><i class="menu-icon ti-check-box"></i></button>
                                    </span>
                                    <span v-else>
                                        {{props.formattedRow[props.column.field]}}
                                    </span>
                                    <span v-if="props.column.field == 'opcoes'">
                                      <button v-on:click="editar(props.row.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                            <i class="ico ti-pencil-alt"></i>
                                        </button>
                                        <button v-on:click="mostra_modal_excluir('modal-excluir', props.row)" type="button" class="btn btn-danger waves-effect waves-light">
                                            <i class="ico ti-trash"></i>
                                        </button>
                                    </span>
                                </template>
                                <div slot="emptystate">
                                  Sem registros.
                                </div>
                            </vue-good-table>
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
        <modal name="modal-resposta" width="400px" height="230px">
            <div style="text-align:center">
                <h3>Atenção!</h3>
            </div>
            <hr>
            <div style="margin-left: 15px">
                <p>{{ mensagem_resposta }}</p>
            </div>
            <hr>
            <div style="text-align: right; margin-right: 15px">
                <button @click="$modal.hide('modal-resposta')" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                    Fechar
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
                columns: [
                    {
                        label: 'Nome', 
                        field: 'nome'
                    },
                    {
                        label: 'Editora',
                        field: 'editora'
                    },
                    {
                        label: 'Edição', 
                        field: 'edicao'
                    },
                    {
                        label: 'Ano', 
                        field: 'ano'
                    },
                    {
                        label: 'Autor', 
                        field: 'autor'
                    },
                    {
                        label: 'Localização', 
                        field: (ele) => { return `${ele.corredor}-${ele.prateleira}.${ele.prateleira}`}
                    },
                    {
                        label: 'Disponibilidade', 
                        field: 'emprestado',
                        html: true
                    },
                    {
                        label: 'Opções',
                        field: 'opcoes',
                        sortable: false,
                        html: true,
                    }
                ],
                rows: [],
                isLoading: false,
                mensagem_resposta: ''
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
                this.rows = res.data.livros;
                this.isLoading = false;
            }).catch(err => {
                this.mostra_modal_resposta(err.response.data.status);
                this.isLoading = false;
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/livro-formulario/' + id);
            },
            
            mostra_modal_excluir: function (modal_nome, livro){
                this.$modal.show(modal_nome, { livro });
            },

            mostra_modal_resposta: function (mensagem){
                this.mensagem_resposta = mensagem;
                this.$modal.show("modal-resposta");
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
                        this.rows = res.data.livros;
                        this.isLoading = false;
                        this.mostra_modal_resposta("Deletado com sucesso.");
                    }).catch((err) => {
                        this.isLoading = false;
                        this.mostra_modal_resposta(err.response.data.status);
                    });
                }).catch((err) => {
                    this.isLoading = false;
                    if(err.response.status === 404)
                        this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                    else
                        this.mostra_modal_resposta(err.response.data.status);
                });
            }
        }
    } 

</script>

<style>

</style>