<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-12 col-xs-12">
                    <div class="box-content" style="padding: 15px">
                        <div class="row" style="margin-bottom: 5px;">
                            <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                                <h4>Formulário de Prateleiras</h4>
                            </div>
                        </div>
                        <div class="form-group row">
                            <form @submit.prevent="adicionar">
                                <div class="col-md-9">
                                    <label for="numero" style="margin-bottom: 0px; margin-top: 10px;">Número</label>
                                    <div class="controls">
                                        <input type="number" id="numero" name="numero" class="form-control" v-model="formdata.numero" autofocus required>
                                    </div>
                                </div>
                                <div class="col-md-9 margin-bottom-0" style="margin-top: 15px">
                                    <div class="controls">
                                        <button class="btn btn-info btn-sm waves-effect waves-light">{{ this.$route.params.id !== undefined && this.$route.params.id !== null ? "Salvar" : "Cadastrar" }}</button>
                                        
                                        <router-link to='/prateleiras'><button style="margin-left:20px" class="btn btn-warning btn-sm waves-effect waves-light">Voltar</button></router-link>
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
    import 'vue-select/dist/vue-select.css';

    export default {
        name: 'PrateleiraFormulario',
        components: {
            Layout,
            Loader
        },
        data () {
            return {
                formdata:{ numero: ''},
                isLoading: false
            }
        },
        created() {
            if(this.$route.params.id !== undefined && this.$route.params.id !== null){
                this.isLoading = true;
                axios.get("http://localhost:8000/api/prateleira/" + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then((res) => {
                    this.formdata.numero = res.data.numero;
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    alert("Falha ao realizar a busca de prateleiras.");
                });
            }
        },
        methods: {
            adicionar: function () {
                this.isLoading = true;
                if(this.$route.params.id === undefined || this.$route.params.id === null){
                    axios.post('http://localhost:8000/api/prateleira', this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then((res) => {
                        this.isLoading = false;
                        console.log(res);
                        alert("Cadastro realizado com sucesso.");
                        this.$router.replace('/prateleiras');
                    }).catch((err) => {
                        this.isLoading = false;
                        console.log(err);
                        alert("Falha ao realizar o cadastro.");
                    });
                } else if (this.$route.params.id !== undefined && this.$route.params.id !== null) {
                    axios.put('http://localhost:8000/api/prateleira/' + this.$route.params.id, this.formdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then((res) => {
                        this.isLoading = false;
                        console.log(res);
                        alert("Alteração realizada com sucesso.");
                        this.$router.replace('/prateleiras');
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

<style>
    .vs__dropdown-toggle {
        border: 0px solid rgba(60,60,60,.26)!important
    }

    .vs__selected {
        margin: 0px!important;
        padding: 0px!important;
    }
</style>