<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 5px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Formulário de Livros</h4>
                            </div>
                        </div>
                        <div class="form-group row">
                            <form @submit.prevent="adicionar">
                                <div class="col-md-12">
                                    <label for="nome" style="margin-bottom: 0px; margin-top: 10px;">Nome</label>
                                    <div class="controls">
                                        <input type="text" id="nome" name="nome" class="form-control" v-model="formdata.nome" autofocus required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="autor" style="margin-bottom: 0px; margin-top: 10px;">Autor</label>
                                    <div class="controls">
                                        <input type="text" id="autor" name="autor" class="form-control" v-model="formdata.autor" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="edicao" style="margin-bottom: 0px; margin-top: 10px;">Edição</label>
                                    <div class="controls">
                                        <input type="number" id="edicao" name="edicao" class="form-control" v-model="formdata.edicao" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="local" style="margin-bottom: 0px; margin-top: 10px;">Local</label>
                                    <div class="controls">
                                        <input type="text" id="local" name="local" class="form-control" v-model="formdata.local" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="editora" style="margin-bottom: 0px; margin-top: 10px;">Editora</label>
                                    <div class="controls">
                                        <input type="text" id="editora" name="editora" class="form-control" v-model="formdata.editora" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="ano" style="margin-bottom: 0px; margin-top: 10px;">Ano</label>
                                    <div class="controls">
                                        <input type="number" id="ano" name="ano" class="form-control" v-model="formdata.ano" required>
                                    </div>
                                    <br>
                                </div>
                                <div class="col-md-12">
                                    <h4 style="margin-bottom: 0px; margin-top: 10px;">Localização</h4>
                                    <br>
                                    <label for="corredor" style="margin-bottom: 0px; margin-top: 10px;">Corredor</label>
                                    <div class="controls">
                                        <v-select class="form-control" :options="this.corredores" :reduce="corredor => corredor.id" label="letra" v-model="formdata.id_corredor" required></v-select>
                                    </div>
                                    <label for="estante" style="margin-bottom: 0px; margin-top: 10px;">Estante</label>
                                    <div class="controls">
                                        <v-select class="form-control" :options="this.estantes" :reduce="estante => estante.id" label="numero" v-model="formdata.id_estante" required></v-select>
                                    </div>
                                    <label for="prateleira" style="margin-bottom: 0px; margin-top: 10px;">Prateleira</label>
                                    <div class="controls">
                                        <v-select class="form-control" :options="this.prateleiras" :reduce="prateleira => prateleira.id" label="numero" v-model="formdata.id_prateleira" required></v-select>
                                    </div>
                                </div>
                                <div class="col-md-9 margin-bottom-0" style="margin-top: 15px">
                                    <div class="controls">
                                        <button class="btn btn-info btn-sm waves-effect waves-light">{{ this.$route.params.id !== undefined && this.$route.params.id !== null ? "Salvar" : "Cadastrar" }}</button>
                                        
                                        <router-link to='/livros'><button style="margin-left:20px" class="btn btn-warning btn-sm waves-effect waves-light">Voltar</button></router-link>
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
    import axios from 'axios';
    import Loader from '@/components/Loader';

    export default {
        name: 'LivroFormulario',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                corredores: [],
                estantes: [],
                prateleiras: [],
                formdata:{ nome: '', autor: '', local: '', edicao: '', editora: '', ano: '', identificador: '', id_corredor:'', id_estante:'', id_prateleira:'', },
                isLoading: false,
                mensagem_resposta: ''
            }
        },
        created() {
            this.isLoading = true;
            axios.get("http://localhost:8000/api/corredor", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then((res) => {
                this.corredores = res.data;
            }).catch(() => {
                alert("Falha ao realizar a busca de livros.");
            });
            axios.get("http://localhost:8000/api/estante", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then((res) => {
                this.estantes = res.data;
            }).catch(() => {
                alert("Falha ao realizar a busca de clientes.");
            });
            axios.get("http://localhost:8000/api/prateleira", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then((res) => {
                this.prateleiras = res.data;
                this.isLoading = false;
            }).catch(() => {
                alert("Falha ao realizar a busca de clientes.");
                this.isLoading = false;
            });

            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                axios.get("http://localhost:8000/api/livro/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then((res) => {
                    this.formdata.nome = res.data.nome;
                    this.formdata.autor = res.data.autor;
                    this.formdata.local = res.data.local;
                    this.formdata.edicao = res.data.edicao;
                    this.formdata.editora = res.data.editora;
                    this.formdata.ano = res.data.ano;
                    this.formdata.identificador = res.data.identificador;
                    this.isLoading = false;
                })
                .catch((err) => {
                    this.isLoading = false;
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
                    this.formdata.identificador = this.formdata.corredor + "-" + this.formdata.estante + "." + this.formdata.prateleira;
                    axios.post('http://localhost:8000/api/livro', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Cadastro realizado com sucesso.");
                        this.$router.replace('/livros');
                    }).catch((err) => {
                        this.isLoading = false;
                        this.mostra_modal_resposta(err.response.data.status);
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/livro/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Alteração realizada com sucesso.");
                        this.$router.replace('/livros');
                    }).catch((err) => {
                        this.isLoading = false;
                        this.mostra_modal_resposta(err.response.data.status);
                    });
                }
            }
        }

    }
</script>
