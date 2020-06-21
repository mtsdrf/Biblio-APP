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
                                <div class="col-md-9">
                                    <label for="nome" style="margin-bottom: 0px; margin-top: 10px;">Nome</label>
                                    <div class="controls">
                                        <input type="text" id="nome" name="nome" class="form-control" v-model="formdata.nome" autofocus required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="autor" style="margin-bottom: 0px; margin-top: 10px;">Autor</label>
                                    <div class="controls">
                                        <input type="text" id="autor" name="autor" class="form-control" v-model="formdata.autor" required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="edicao" style="margin-bottom: 0px; margin-top: 10px;">Edição</label>
                                    <div class="controls">
                                        <input type="number" id="edicao" name="edicao" class="form-control" v-model="formdata.edicao" required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="local" style="margin-bottom: 0px; margin-top: 10px;">Local</label>
                                    <div class="controls">
                                        <input type="text" id="local" name="local" class="form-control" v-model="formdata.local" required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="editora" style="margin-bottom: 0px; margin-top: 10px;">Editora</label>
                                    <div class="controls">
                                        <input type="text" id="editora" name="editora" class="form-control" v-model="formdata.editora" required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="ano" style="margin-bottom: 0px; margin-top: 10px;">Ano</label>
                                    <div class="controls">
                                        <input type="number" id="ano" name="ano" class="form-control" v-model="formdata.ano" required>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <label for="identificador" style="margin-bottom: 0px; margin-top: 10px;">Identificador</label>
                                    <div class="controls">
                                        <input type="text" id="identificador" name="identificador" class="form-control" v-model="formdata.identificador" required>
                                        
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
                formdata:{ nome: '', autor: '', local: '', edicao: '', editora: '', ano: '', identificador: '' },
                isLoading: false
            }
        },
        created() {
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                this.isLoading = true;
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
                    console.log(err);
                    this.isLoading = false;
                    alert("Falha ao realizar a busca de livros.");
                });
            }
        },
        methods: {
            adicionar: function () {
                this.isLoading = true;
                if(this.$route.params.id === undefined || this.$route.params.id === null){
                    axios.post('http://localhost:8000/api/livro', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then((res) => {
                        this.isLoading = false;
                        console.log(res);
                        alert("Cadastro realizado com sucesso.");
                        this.$router.replace('/livros');
                    }).catch((err) => {
                        this.isLoading = false;
                        console.log(err);
                        alert("Falha ao realizar o cadastro.");
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/livro/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then((res) => {
                        this.isLoading = false;
                        console.log(res);
                        alert("Alteração realizada com sucesso.");
                        this.$router.replace('/livros');
                    }).catch((err) => {
                        this.isLoading = false;
                        console.log(err);
                        alert("Falha ao realizar a alteração dos dados.");
                    });
                }
            }
        }

    }
</script>
