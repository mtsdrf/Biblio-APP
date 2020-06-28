<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 5px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Formulário de Estantes</h4>
                            </div>
                        </div>
                        <div class="form-group row">
                            <form @submit.prevent="adicionar">
                                <div class="col-md-9">
                                    <label for="numero" style="margin-bottom: 0px; margin-top: 10px;">Numero</label>
                                    <div class="controls">
                                        <input type="number" id="numero" name="numero" class="form-control" v-model="formdata.numero" autofocus required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="tipo_livro" style="margin-bottom: 0px; margin-top: 10px;">Tipos de Livros</label>
                                    <div class="controls">
                                        <input type="text" id="tipo_livro" name="tipo_livro" class="form-control" v-model="formdata.tipo_livro" required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="id_corredor" style="margin-bottom: 0px; margin-top: 10px;">Corredor</label>
                                    <div class="controls">
                                        <v-select class="form-control" :options="this.corredores" :reduce="corredor => corredor.id" label="letra" v-model="formdata.id_corredor" required></v-select>
                                    </div>
                                </div>
                                <div class="col-md-9 margin-bottom-0" style="margin-top: 15px">
                                    <div class="controls">
                                        <button class="btn btn-info btn-sm waves-effect waves-light">{{ this.$route.params.id !== undefined && this.$route.params.id !== null ? "Salvar" : "Cadastrar" }}</button>
                                        
                                        <router-link to='/estantes'><button style="margin-left:20px" class="btn btn-warning btn-sm waves-effect waves-light">Voltar</button></router-link>
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
        name: 'EstanteFormulario',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                corredores: [],
                formdata:{ numero: '', tipo_livro: '', id_corredor: '' },
                isLoading: false,
                mensagem_resposta: ''
            }
        },
        created() {
            axios.get("http://localhost:8000/api/corredor", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then((res) => {
                this.corredores = res.data;
            }).catch((err) => {
                this.mostra_modal_resposta(err.response.data.status);
            });
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                this.isLoading = true;
                axios.get("http://localhost:8000/api/estante/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then((res) => {
                    this.formdata.numero = res.data.numero;
                    this.formdata.tipo_livro = res.data.tipo_livro;
                    this.formdata.id_corredor = res.data.id_corredor;
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
                    axios.post('http://localhost:8000/api/estante', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Cadastro realizado com sucesso.");
                        this.$router.replace('/estantes');
                    }).catch((err) => {
                        this.isLoading = false;
                        this.mostra_modal_resposta(err.response.data.status);
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/estante/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Alteração realizada com sucesso.");
                        this.$router.replace('/estantes');
                    }).catch((err) => {
                        this.isLoading = false;
                        this.mostra_modal_resposta(err.response.data.status);
                    });
                }
            }
        }
    }
</script>
