<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 15px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Empréstimos</h4>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                                <router-link to='/emprestimo-formulario'><button type="button" class="btn btn-primary waves-effect waves-light">Adicionar</button></router-link>
                            </div>
                        </div>
                        <div class="table-responsive" data-pattern="priority-columns">
                            <table id="example" class="table table-small-font table-bordered table-striped"
                                style="width:100%">
                                <thead>
                                    <tr>
                                        <th>Empréstimo</th>
                                        <th>Devolução</th>
                                        <th>Cliente</th>
                                        <th>Email Cliente</th>
                                        <th>Livro</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="emprestimo in emprestimos" :key="emprestimo.id">
                                        <td>{{ emprestimo.dia_emprestimo }}</td>
                                        <td>{{ emprestimo.dia_devolucao }}</td>
                                        <td>{{ emprestimo.cliente_nome }}</td>
                                        <td>{{ emprestimo.cliente_email }}</td>
                                        <td>{{ emprestimo.livro_nome }}</td>
                                        <td style="text-align: center">
                                            <button v-on:click="editar(emprestimo.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                                <i class="ico ti-pencil-alt"></i>
                                            </button>
                                            <button v-on:click="mostra_modal_excluir('modal-excluir', emprestimo)" type="button" class="btn btn-danger waves-effect waves-light">
                                                <i class="ico ti-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!emprestimos.length" style="text-align:center">
                                        <td colspan="6">Sem registros</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </layout>
        <input type="hidden" id="id_emprestimo_deletar">
        <modal name="modal-excluir" width="400px" height="200px" @before-open="set_id_emprestimo">
            <div style="text-align:center">
                <h3>Confirmação...</h3>
            </div>
            <hr>
            <div style="margin-left: 15px">
                <p>Deseja excluir o empréstimo?</p>
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
        name: 'Emprestimos',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                emprestimos: [],
                isLoading: false
            }
        },
        created() {
            this.isLoading = true;
            axios.get("http://localhost:8000/api/emprestimo", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res);
                this.emprestimos = res.data;
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
                alert("Falha ao realizar a busca de empréstimos.");
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/emprestimo-formulario/' + id);
            },
            
            mostra_modal_excluir: function (modal_nome, emprestimo){
                this.$modal.show(modal_nome, { emprestimo });
            },

            set_id_emprestimo: function(event) {
                document.querySelector("#id_emprestimo_deletar").value = event.params.emprestimo.id;
            },

            apagar: function () {
                this.isLoading = true;
                this.$modal.hide('modal-excluir');
                var id = document.querySelector("#id_emprestimo_deletar").value;
                axios.delete("http://localhost:8000/api/emprestimo/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(() => {
                    axios.get("http://localhost:8000/api/emprestimo", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        this.emprestimos = res.data;
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
