<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 5px;">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <h4>Formulário de Clientes</h4>
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
                                    <label for="telefone" style="margin-bottom: 0px; margin-top: 10px;">Telefone</label>
                                    <div class="controls">
                                        <input type="text" id="telefone" name="telefone" class="form-control" v-model="formdata.telefone" v-mask="['(##) ####-####', '(##) #####-####']" required>
                                    </div>
                                </div>
    
                                <div class="col-md-12">
                                    <label for="cpf" style="margin-bottom: 0px; margin-top: 10px;">CPF</label>
                                    <div class="controls">
                                        <input type="text" id="cpf" name="cpf" class="form-control" v-model="formdata.cpf" v-mask="['###.###.###-##']" required minlength="14" maxlength="14">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="email" style="margin-bottom: 0px; margin-top: 10px;">E-mail</label>
                                    <div class="controls">
                                        <input type="email" id="email" name="email" class="form-control" v-model="formdata.email" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="endereco" style="margin-bottom: 0px; margin-top: 10px;">Endereço</label>
                                    <div class="controls">
                                        <input type="text" id="endereco" name="endereco" class="form-control" v-model="formdata.endereco" required>
                                    </div>
                                </div>
                                <div class="col-md-9 margin-bottom-0" style="margin-top: 15px">
                                    <div class="controls">
                                        <button class="btn btn-info btn-sm waves-effect waves-light">{{ this.$route.params.id !== undefined && this.$route.params.id !== null ? "Salvar" : "Cadastrar" }}</button>
                                        
                                        <router-link to='/clientes'><button style="margin-left:20px" class="btn btn-warning btn-sm waves-effect waves-light">Voltar</button></router-link>
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
        name: 'ClienteFormulario',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                formdata:{ nome: '', telefone: '', cpf: '', email: '', endereco: '' },
                isLoading: false,
                mensagem_resposta: ''
            }
        },
        created() {
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                this.isLoading = true;
                axios.get("http://localhost:8000/api/cliente/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then((res) => {
                    this.formdata.nome = res.data.nome;
                    this.formdata.telefone = res.data.telefone;
                    this.formdata.cpf = res.data.cpf;
                    this.formdata.email= res.data.email;
                    this.formdata.endereco = res.data.endereco;
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
                    axios.post('http://localhost:8000/api/cliente', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Cadastro realizado com sucesso.");
                        this.$router.replace('/clientes');
                    }).catch((err) => {
                        this.isLoading = false;
                        if(err.response.status === 404)
                            this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                        else
                            this.mostra_modal_resposta(err.response.data.status);
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/cliente/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Alteração realizada com sucesso.");
                        this.$router.replace('/clientes');
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