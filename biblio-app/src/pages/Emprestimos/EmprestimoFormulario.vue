<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 5px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Formulário de Empréstimos</h4>
                            </div>
                        </div>
                        <div class="form-group row">
                            <form @submit.prevent="adicionar">
                                <div class="col-md-12">
                                    <label for="dia_emprestimo" style="margin-bottom: 0px; margin-top: 10px;">Data de Empréstimo</label>
                                    <div class="controls">
                                        <input type="date" id="dia_emprestimo" name="dia_emprestimo" class="form-control" v-model="formdata.dia_emprestimo" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="dia_devolucao" style="margin-bottom: 0px; margin-top: 10px;">Data de Devolução</label>
                                    <div class="controls">
                                        <input type="date" id="dia_devolucao" name="dia_devolucao" class="form-control" v-model="formdata.dia_devolucao" required>
                                    </div>
                                </div>
                                <div class="col-md-12" style="margin-bottom: 0px; margin-top: 10px;">
                                    <label for="id_cliente">Cliente</label>
                                    <div class="controls">
                                        <v-select class="form-control" :options="this.clientes" :reduce="cliente => cliente.id" label="nome" v-model="formdata.id_cliente" required></v-select>
                                    </div>
                                </div>
                                <div class="col-md-12" style="margin-bottom: 0px; margin-top: 10px;">
                                    <label for="id_livro">Livro</label>
                                    <div class="controls">
                                        <v-select class="form-control" :options="this.livros" :reduce="livro => livro.id" label="nome" v-model="formdata.id_livro" required></v-select>
                                    </div>
                                </div>
                                
                                <div class="col-md-9 margin-bottom-0" style="margin-top: 15px">
                                    <div class="controls">
                                        <button class="btn btn-info btn-sm waves-effect waves-light">{{ this.$route.params.id !== undefined && this.$route.params.id !== null ? "Salvar" : "Cadastrar" }}</button>
                                        
                                        <router-link to='/emprestimos'><button style="margin-left:20px" class="btn btn-warning btn-sm waves-effect waves-light">Voltar</button></router-link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </layout>
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
        name: 'EmprestimoFormulario',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                livros: [],
                clientes: [],
                formdata:{ dia_devolucao: '', dia_emprestimo: '', id_cliente: '', id_livro: '' },
                isLoading: false,
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
            }).catch((err) => {
                if(err.response.status === 404)
                    this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                else
                    this.mostra_modal_resposta(err.response.data.status);
            });

            axios.get("http://localhost:8000/api/livro", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then((res) => {
                this.livros = res.data.livros_disponiveis;
                this.isLoading = false;
            }).catch((err) => {
                this.isLoading = false;
                if(err.response.status === 404)
                    this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                else
                    this.mostra_modal_resposta(err.response.data.status);
            });
            
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                axios.get("http://localhost:8000/api/emprestimo/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then((res) => {
                    this.formdata.dia_devolucao = res.data.dia_devolucao;
                    this.formdata.dia_emprestimo = res.data.dia_emprestimo;
                    this.formdata.id_cliente = res.data.id_cliente;
                    this.formdata.id_livro = res.data.id_livro;
                    this.isLoading = false;
                })
                .catch((err) => {
                    this.isLoading = false;
                    if(err.response.status === 404)
                        this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                    else
                        this.mostra_modal_resposta(err.response.data.status);
                });
            }
        },
        methods: {
            mostra_modal_resposta: function (mensagem){
                this.mensagem_resposta = mensagem;
                this.$modal.show("modal-resposta");
            },
            
            adicionar: function () {
                this.isLoading = true;
                if(this.$route.params.id === undefined || this.$route.params.id === null){
                    axios.post('http://localhost:8000/api/emprestimo', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Cadastro realizado com sucesso.");
                        this.$router.replace('/emprestimos');
                    }).catch((err) => {
                        this.isLoading = false;
                        if(err.response.status === 404)
                            this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                        else
                            this.mostra_modal_resposta(err.response.data.status);
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/emprestimo/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Alteração realizada com sucesso.");
                        this.$router.replace('/emprestimos');
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
    }
</script>
