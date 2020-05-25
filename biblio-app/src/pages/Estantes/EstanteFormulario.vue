<template>
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
                                    <input type="text" id="numero" name="numero" class="form-control" v-model="formdata.numero">
                                </div>
                            </div>
                            <div class="col-md-9">
                                <label for="tipo_livro" style="margin-bottom: 0px; margin-top: 10px;">Tipos de Livros</label>
                                <div class="controls">
                                    <input type="text" id="tipo_livro" name="tipo_livro" class="form-control" v-model="formdata.tipo_livro">
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
</template>

<script>
    import Layout from '@/components/Layout';
    import axios from 'axios'

    export default {
        name: 'EstanteFormulario',
        components: {
            Layout
        },
        data () {
            return {
                formdata:{ numero: '', tipo_livro: '' }
            }
        },
        beforeCreate() {
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                axios.get("http://localhost:8000/api/estante/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(res => {
                    this.formdata.numero = res.data.numero;
                    this.formdata.tipo_livro = res.data.tipo_livro;
                })
                .catch(err => {
                    console.log(err);
                    alert("Falha ao realizar a busca de estantes.");
                });
            }
        },
        methods: {
            adicionar: function () {
                if(this.$route.params.id === undefined || this.$route.params.id === null){
                    axios.post('http://localhost:8000/api/estante', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        alert("Cadastro realizado com sucesso.");
                        this.$router.replace('/estantes');
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Falha ao realizar o cadastro.");
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/estante/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(res => {
                        console.log(res);
                        alert("Alteração realizada com sucesso.");
                        this.$router.replace('/estantes');
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
