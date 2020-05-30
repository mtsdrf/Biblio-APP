<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 15px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Estantes</h4>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                                <router-link to='/estante-formulario'><button type="button" class="btn btn-primary waves-effect waves-light">Adicionar</button></router-link>
                            </div>
                        </div>
                        <div class="table-responsive" data-pattern="priority-columns">
                            <table id="example" class="table table-small-font table-bordered table-striped"
                                style="width:100%">
                                <thead>
                                    <tr>
                                        <th>Número</th>
                                        <th>Tipos de Livro</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                <tbody id="table-sgbds">
                                    <tr v-for="estante in estantes" :key="estante.id">
                                        <td>{{ estante.numero }}</td>
                                        <td>{{ estante.tipo_livro }}</td>
                                        <td style="text-align: center">
                                            <button v-on:click="editar(estante.id)" type="button" class="btn btn-warning waves-effect waves-light" style="margin-right: 15px">
                                                <i class="ico ti-pencil-alt"></i>
                                            </button>
                                            <button v-on:click="mostra_modal_excluir('modal-excluir', estante)" type="button" class="btn btn-danger waves-effect waves-light">
                                                <i class="ico ti-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!estantes.length" style="text-align:center">
                                        <td colspan="3">Sem registros</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </layout>
        <input type="hidden" id="id_estante_deletar">
        <modal name="modal-excluir" width="400px" height="200px" @before-open="set_id_estante">
            <div style="text-align:center">
                <h3>Confirmação...</h3>
            </div>
            <hr>
            <div style="margin-left: 15px">
                <p>Deseja excluir a estante?</p>
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
        name: 'Estantes',
        components: {
            Layout
        },
        data () {
            return {
                estantes: []
            }
        },
        beforeCreate() {
            axios.get("http://localhost:8000/api/estante", {
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
                alert("Falha ao realizar a busca de Estantes.");
            });
        },
        methods: {
            editar: function(id) {
                this.$router.replace('/estante-formulario/' + id);
            },
            
            mostra_modal_excluir: function (modal_nome, estante){
                this.$modal.show(modal_nome, { estante });
            },

            set_id_estante: function(event) {
                document.querySelector("#id_estante_deletar").value = event.params.estante.id;
            },

            apagar: function () {
                this.$modal.hide('modal-excluir');
                var id = document.querySelector("#id_estante_deletar").value;
                axios.delete("http://localhost:8000/api/estante/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(res => {
                    console.log(res);
                    axios.get("http://localhost:8000/api/estante", {
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
                        alert("Falha ao atualizar as Estantes.");
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

<style>

</style>
