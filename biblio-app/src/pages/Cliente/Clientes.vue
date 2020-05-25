<template>
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
                                        <button v-on:click="apagar(cliente.id)" type="button" class="btn btn-danger waves-effect waves-light">
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

            apagar: function (id) {
                    axios.delete("http://localhost:8000/api/cliente/" + id, {
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
                      axios.get("http://localhost:8000/api/cliente", {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                            }
                        }).then(res => {
                            console.log(res);
                            this.estantes = res.data;
                        })
                        .catch(err => {
                            console.log(err);
                            alert("Falha ao atualizar os Clientes.");
                        });
                            }
                }
    }


</script>

<style>

</style>