<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 15px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Usuários</h4>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                                <router-link to='/usuario-formulario'><button type="button" class="btn btn-primary waves-effect waves-light">Adicionar</button></router-link>
                            </div>
                        </div>
                        <div class="table-responsive" data-pattern="priority-columns">
                            <table id="example" class="table table-small-font table-bordered table-striped"
                                style="width:100%">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>CPF</th>
                                        <th>RG</th>
                                        <th>Endereço</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="usuario in usuarios" :key="usuario.id">
                                        <td>{{ usuario.name }}</td>
                                        <td>{{ usuario.email }}</td>
                                        <td>{{ usuario.cpf }}</td>
                                        <td>{{ usuario.rg }}</td>
                                        <td>{{ usuario.endereco }}</td>
                                        <td style="text-align: center">
                                            <button v-on:click="editar(usuario.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                                <i class="ico ti-pencil-alt"></i>
                                            </button>
                                            <button v-on:click="mostra_modal_excluir('modal-excluir', usuario)" type="button" class="btn btn-danger waves-effect waves-light">
                                                <i class="ico ti-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!usuarios.length" style="text-align:center">
                                        <td colspan="5">Sem registros</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </layout>
        <input type="hidden" id="id_usuario_deletar">
        <modal name="modal-excluir" width="400px" height="200px" @before-open="set_id_usuario">
            <div style="text-align:center">
                <h3>Confirmação...</h3>
            </div>
            <hr>
            <div style="margin-left: 15px">
                <p>Deseja excluir o usuario?</p>
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
        name: 'Usuarios',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                usuarios: [],
                isLoading: false
            }
        },
        created() {
            this.isLoading = true;
            axios.get("http://localhost:8000/api/user", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res);
                this.usuarios = res.data;
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
                alert("Falha ao realizar a busca de usuários.");
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/usuario-formulario/' + id);
            },
            
            mostra_modal_excluir: function (modal_nome, usuario){
                this.$modal.show(modal_nome, { usuario });
            },

            set_id_usuario: function(event) {
                document.querySelector("#id_usuario_deletar").value = event.params.usuario.id;
            },

            apagar: function () {
                this.isLoading = true;
                this.$modal.hide('modal-excluir');
                var id = document.querySelector("#id_usuario_deletar").value;
                axios.delete("http://localhost:8000/api/user/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(() => {
                    axios.get("http://localhost:8000/api/user", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        this.usuarios = res.data;
                        this.isLoading = false;
                        alert("Deletado com sucesso.");
                    }).catch(err => {
                        console.log(err);
                        this.isLoading = false;
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
