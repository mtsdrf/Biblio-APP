<template>
    <layout>
        <div class="row small-spacing">
            <div class="col-lg-12 col-xs-12">
                <div class="box-content" style="padding: 15px">
                    <div class="row" style="margin-bottom: 5px;">
                        <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                            <h4>Formulário de Usuários</h4>
                        </div>
                    </div>
                    <div class="form-group row">
                        <form @submit.prevent="adicionar">
                            <div class="col-md-9">
                                <label for="name" style="margin-bottom: 0px; margin-top: 10px;">Nome</label>
                                <div class="controls">
                                    <input type="text" id="name" name="name" class="form-control" v-model="formdata.name">
                                </div>
                            </div>
                            <div class="col-md-9">
                                <label for="cpf" style="margin-bottom: 0px; margin-top: 10px;">CPF</label>
                                <div class="controls">
                                    <input type="text" id="cpf" name="cpf" class="form-control" v-model="formdata.cpf">
                                </div>
                            </div>
                            <div class="col-md-9" style="margin-bottom: 0px; margin-top: 10px;">
                                <label for="rg">RG</label>
                                <div class="controls">
                                    <input type="text" id="rg" name="rg" class="form-control" v-model="formdata.rg">
                                </div>
                            </div>
                            <div class="col-md-9" style="margin-bottom: 0px; margin-top: 10px;">
                                <label for="data_nascimento">Data de Nascimento</label>
                                <div class="controls">
                                    <input type="text" id="data_nascimento" name="data_nascimento" class="form-control" v-model="formdata.data_nascimento">
                                </div>
                            </div>
                            <div class="col-md-9" style="margin-bottom: 0px; margin-top: 10px;">
                                <label for="endereco">Endereço</label>
                                <div class="controls">
                                    <input type="text" id="endereco" name="endereco" class="form-control" v-model="formdata.endereco">
                                </div>
                            </div>
                            <div class="col-md-9" style="margin-bottom: 0px; margin-top: 10px;">
                                <label for="email">Email</label>
                                <div class="controls">
                                    <input type="email" id="email" name="email" class="form-control" v-model="formdata.email">
                                </div>
                            </div>
                            <div class="col-md-9" style="margin-bottom: 0px; margin-top: 10px;">
                                <label for="password">Senha</label>
                                <div class="controls">
                                    <input type="password" id="password" name="password" class="form-control" v-model="formdata.password">
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
</template>

<script>
    import Layout from '@/components/Layout';
    import axios from 'axios'

    export default {
        name: 'UsuarioFormulario',
        components: {
            Layout
        },
        data () {
            return {
                formdata:{ name: '', cpf: '', rg: '', data_nascimento: '', endereco: '', email: '', password: '' }
            }
        },
        beforeCreate() {
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                axios.get("http://localhost:8000/api/user/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(res => {
                    this.formdata.name = res.data.name;
                    this.formdata.cpf = res.data.cpf;
                    this.formdata.rg = res.data.rg;
                    this.formdata.data_nascimento = res.data.data_nascimento;
                    this.formdata.endereco = res.data.endereco;
                    this.formdata.email = res.data.email;
                    this.formdata.password = res.data.password;
                })
                .catch(err => {
                    console.log(err);
                    alert("Falha ao realizar a busca dos usuários.");
                });
            }
        },
        methods: {
            adicionar: function () {
                if(this.$route.params.id === undefined && this.$route.params.id === null){
                    axios.post('http://localhost:8000/api/user', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        alert("Cadastro realizado com sucesso.");
                        this.$router.replace('/usuarios');
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Falha ao realizar o cadastro.");
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/user/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        alert("Alteração realizada com sucesso.");
                        this.$router.replace('/usuarios');
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Falha ao realizar a alteração dos dados.");
                    });
                }
            }
        }
    }
</script>
