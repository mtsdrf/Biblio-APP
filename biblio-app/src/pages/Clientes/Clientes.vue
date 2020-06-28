<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 15px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Clientes</h4>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                                <router-link to='/cliente-formulario'><button type="button" class="btn btn-primary waves-effect waves-light">Adicionar</button></router-link>
                            </div>
                        </div>
                        <div class="table-responsive text-center">
                            <vue-good-table
                                :columns="columns"
                                :rows="rows"
                                :fixed-header="true"
                                :search-options="{
                                  enabled: true
                                }">
                                <template slot="table-row" slot-scope="props">
                                    <span v-if="props.column.field == 'opcoes'">
                                      <button v-on:click="editar(cliente.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                            <i class="ico ti-pencil-alt"></i>
                                        </button>
                                        <button v-on:click="mostra_modal_excluir('modal-excluir', cliente)" type="button" class="btn btn-danger waves-effect waves-light">
                                            <i class="ico ti-trash"></i>
                                        </button>
                                    </span>
                                </template>
                                <div slot="emptystate">
                                  Sem registros.
                                </div>
                            </vue-good-table>
                        </div>


                        <!--<div class="table-responsive" data-pattern="priority-columns">
                            <table id="example" class="table table-small-font table-bordered table-striped"
                                style="width:100%">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Telefone</th>
                                        <th>CPF</th>
                                        <th>E-mail</th>
                                        <th>Endereço</th>        
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                <tbody id="table-sgbds">
                                    <tr v-for="cliente in clientes" :key="cliente.id">
                                        <td>{{ cliente.nome }}</td>
                                        <td>{{ cliente.telefone }}</td>
                                        <td>{{ cliente.cpf }}</td>
                                        <td>{{ cliente.email }}</td>
                                        <td>{{ cliente.endereco }}</td>
                                        <td style="text-align: center">
                                            <button v-on:click="editar(cliente.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                                <i class="ico ti-pencil-alt"></i>
                                            </button>
                                            <button v-on:click="mostra_modal_excluir('modal-excluir', cliente)" type="button" class="btn btn-danger waves-effect waves-light">
                                                <i class="ico ti-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!clientes.length" style="text-align:center">
                                        <td colspan="6">Sem registros</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>-->
                    </div>
                </div>
            </div>
        </layout>
        <input type="hidden" id="id_cliente_deletar">
        <modal name="modal-excluir" width="400px" height="200px" @before-open="set_id_cliente">
            <div style="text-align:center">
                <h3>Confirmação...</h3>
            </div>
            <hr>
            <div style="margin-left: 15px">
                <p>Deseja excluir o cliente?</p>
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
        <modal name="modal-resposta" width="400px" height="200px">
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
        name: 'Clientes',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                isLoading: false,
                columns: [
                    {
                        label: 'Nome', 
                        field: 'nome'
                    },
                    {
                        label: 'Telefone',
                        field: 'telefone'
                    },
                    {
                        label: 'CPF', 
                        field: 'cpf'
                    },
                    {
                        label: 'E-mail', 
                        field: 'email'
                    },
                    {
                        label: 'Endereço', 
                        field: 'endereco'
                    },
                    {
                        label: 'Opções',
                        field: 'opcoes',
                        sortable: false,
                        html: true,
                    }
                ],
                rows: [{
                    opcoes: '<button v-on:click="editar(cliente.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px"><i class="ico ti-pencil-alt"></i></button><button v-on:click="mostra_modal_excluir("modal-excluir", cliente)" type="button" class="btn btn-danger waves-effect waves-light"><i class="ico ti-trash"></i></button>'
                }],
                clientes: [],
                mensagem_resposta: ''
            }
        },
        created() {
            this.isLoading = true;
            axios.get("http://localhost:8000/api/cliente", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then((res) => {
                this.clientes = res.data;
                this.isLoading = false;
            }).catch((err) => {
                this.isLoading = false;
                if(err.response.status === 404)
                    this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                else
                    this.mostra_modal_resposta(err.response.data.status);
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/cliente-formulario/' + id);
            },

            mostra_modal_excluir: function (modal_nome, cliente){
                this.$modal.show(modal_nome, { cliente });
            },

            mostra_modal_resposta: function (mensagem){
                this.mensagem_resposta = mensagem;
                this.$modal.show("modal-resposta");
            },

            set_id_cliente: function(event) {
                document.querySelector("#id_cliente_deletar").value = event.params.cliente.id;
            },

            apagar: function () {
                this.isLoading = true;
                this.$modal.hide('modal-excluir');
                var id = document.querySelector("#id_cliente_deletar").value;
                axios.delete("http://localhost:8000/api/cliente/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(() => {
                    axios.get("http://localhost:8000/api/cliente", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then((res) => {
                        this.clientes = res.data;
                        this.isLoading = false;
                        this.mostra_modal_resposta("Deletado com sucesso.");
                    }).catch((err) => {
                        this.isLoading = false;
                        if(err.response.status === 404)
                            this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                        else
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