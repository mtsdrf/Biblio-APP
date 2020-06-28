<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 5px;">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <h4>Formulário de Usuários</h4>
                            </div>
                        </div>
                        <div class="form-group row">
                            <form @submit.prevent="adicionar">
                                <div class="col-md-12">
                                    <label for="name" style="margin-bottom: 0px; margin-top: 10px;">Nome</label>
                                    <div class="controls">
                                        <input type="text" id="name" name="name" class="form-control" v-model="formdata.name" required>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="cpf" style="margin-bottom: 0px; margin-top: 10px;">CPF</label>
                                    <div class="controls">
                                        <input type="text" id="cpf" name="cpf" class="form-control" v-model="formdata.cpf" v-mask="['###.###.###-##']" required minlength="14" maxlength="14">
                                    </div>
                                </div>
                                <div class="col-md-12" style="margin-bottom: 0px; margin-top: 10px;">
                                    <label for="rg">RG</label>
                                    <div class="controls">
                                        <input type="text" id="rg" name="rg" class="form-control" v-model="formdata.rg" required minlength="9" maxlength="9">
                                    </div>
                                </div>
                                <div class="col-md-12" style="margin-bottom: 0px; margin-top: 10px;">
                                    <label for="data_nascimento">Data de Nascimento</label>
                                    <div class="controls">
                                        <input type="date" id="data_nascimento" name="data_nascimento" class="form-control" v-model="formdata.data_nascimento" required>
                                    </div>
                                </div>
                                <div class="col-md-12" style="margin-bottom: 0px; margin-top: 10px;">
                                    <label for="endereco">Endereço</label>
                                    <div class="controls">
                                        <input type="text" id="endereco" name="endereco" class="form-control" v-model="formdata.endereco" required>
                                    </div>
                                </div>
                                <div class="col-md-12" style="margin-bottom: 0px; margin-top: 10px;">
                                    <label for="email">Email</label>
                                    <div class="controls">
                                        <input type="email" id="email" name="email" class="form-control" v-model="formdata.email" required>
                                    </div>
                                </div>
                                <div class="col-md-12" style="margin-bottom: 0px; margin-top: 10px;">
                                    <label for="password">Senha</label>
                                    <div class="controls">
                                        <input type="password" id="password" name="password" class="form-control" v-model="formdata.password" required>
                                    </div>
                                </div>
                                
                                <div class="col-md-9 margin-bottom-0" style="margin-top: 15px">
                                    <div class="controls">
                                        <button class="btn btn-info btn-sm waves-effect waves-light">{{ this.$route.params.id !== undefined && this.$route.params.id !== null ? "Salvar" : "Cadastrar" }}</button>
                                        
                                        <router-link to='/usuarios'><button style="margin-left:20px" class="btn btn-warning btn-sm waves-effect waves-light">Voltar</button></router-link>
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
        name: 'UsuarioFormulario',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                formdata:{ name: '', cpf: '', rg: '', data_nascimento: '', endereco: '', email: '', password: '' },
                isLoading: false,
                mensagem_resposta: ''
            }
        },
        created() {
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                axios.get("http://localhost:8000/api/user/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then((res) => {
                    this.formdata.name = res.data.name;
                    this.formdata.cpf = res.data.cpf;
                    this.formdata.rg = res.data.rg;
                    this.formdata.data_nascimento = res.data.data_nascimento;
                    this.formdata.endereco = res.data.endereco;
                    this.formdata.email = res.data.email;
                    this.formdata.password = res.data.password;
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
                    axios.post('http://localhost:8000/api/user', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Cadastro realizado com sucesso.");
                        this.$router.replace('/usuarios');
                    }).catch((err) => {
                        this.isLoading = false;
                        if(err.response.status === 404)
                            this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                        else
                            this.mostra_modal_resposta(err.response.data.status);
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/user/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        this.isLoading = false;
                        this.mostra_modal_resposta("Alteração realizada com sucesso.");
                        this.$router.replace('/usuarios');
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
