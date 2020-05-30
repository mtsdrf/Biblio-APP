<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 5px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Formulário de Clientes</h4>
                            </div>


                        </div>
                        <div class="form-group row">
                            <form @submit.prevent="adicionar">
                                <div class="col-md-9">
                                    <label for="nome" style="margin-bottom: 0px; margin-top: 10px;">Nome</label>
                                    <div class="controls">
                                        <input type="text" id="nome" name="nome" class="form-control" v-model="formdata.nome">
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="telefone" style="margin-bottom: 0px; margin-top: 10px;">Telefone</label>
                                    <div class="controls">
                                        <input type="text" id="telefone" name="telefone" class="form-control" v-model="formdata.telefone">
                                    </div>
                                </div>
    
                                <div class="col-md-9">
                                    <label for="cpf" style="margin-bottom: 0px; margin-top: 10px;">CPF</label>
                                    <div class="controls">
                                        <input type="text" id="cpf" name="cpf" class="form-control" v-model="formdata.cpf">
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="email" style="margin-bottom: 0px; margin-top: 10px;">E-mail</label>
                                    <div class="controls">
                                        <input type="text" id="email" name="email" class="form-control" v-model="formdata.email">
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="endereco" style="margin-bottom: 0px; margin-top: 10px;">Endereço</label>
                                    <div class="controls">
                                        <input type="text" id="endereco" name="endereco" class="form-control" v-model="formdata.endereco">
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
                isLoading: false
            }
        },
        created() {
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                axios.get("http://localhost:8000/api/cliente/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(res => {
                    this.formdata.nome = res.data.nome;
                    this.formdata.telefone = res.data.telefone;
                    this.formdata.cpf = res.data.cpf;
                    this.formdata.email= res.data.email;
                    this.formdata.endereco = res.data.endereco;
                })
                .catch(() => {
                    alert("Falha ao realizar a busca de clientes 2 .");
                });
            }
        },
        methods: {
            adicionar: function () {
                if(this.$route.params.id === undefined || this.$route.params.id === null){
                    axios.post('http://localhost:8000/api/cliente', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        alert("Cadastro realizado com sucesso.");
                        this.$router.replace('/clientes');
                    })
                    .catch(() => {
                        alert("Falha ao realizar o cadastro.");
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/cliente/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(() => {
                        alert("Alteração realizada com sucesso.");
                        this.$router.replace('/clientes');
                    })
                    .catch(() => {
                        alert("Falha ao realizar a alteração dos dados.");
                    });
                }
            }
        }

    }
</script>