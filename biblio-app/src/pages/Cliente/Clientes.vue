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
                        <div class="table-responsive" data-pattern="priority-columns">
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
                        </div>
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
    </div>
</template>

<script>
    import Layout from '@/components/Layout';
    import axios from 'axios'

    export default {
        name: 'Clientes',
        components: {
            Layout
        },
        data () {
            return {
                clientes: []
            }
        },
        beforeCreate() {
            axios.get("http://localhost:8000/api/cliente", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res);
                this.clientes = res.data;
            })
            .catch(err => {
                console.log(err);
                alert("Falha ao realizar a busca de Clientes 1 .");
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/cliente-formulario/' + id);
            },

            mostra_modal_excluir: function (modal_nome, cliente){
                this.$modal.show(modal_nome, { cliente });
            },

            set_id_cliente: function(event) {
                document.querySelector("#id_cliente_deletar").value = event.params.cliente.id;
            },

            apagar: function () {
                this.$modal.hide('modal-excluir');
                var id = document.querySelector("#id_cliente_deletar").value;
                axios.delete("http://localhost:8000/api/cliente/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(res => {
                    console.log(res);
                    axios.get("http://localhost:8000/api/cliente", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        this.clientes = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Falha ao atualizar os Clientes.");
                    });
                    alert("Deletado com sucesso.");
                })
                .catch(err => {
                    console.log(err);
                    alert("Falha ao Deletar.");
                });
            }
        }
    }
</script>