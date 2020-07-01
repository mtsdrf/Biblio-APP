<template>
    <div id="app" style="height: 100vh;">
        <div id="single-wrapper">
            <form class="frm-single" style="position: absolute;top: 42%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%);" @submit.prevent="submitform">
                <div class="inside">
                    <div class="title"><strong>Biblio</strong></div>
                    <div class="frm-title">Login<br></div>
        
                    <div class="frm-input">
                        <input type="email" placeholder="Email" v-model="formdata.email" class="frm-inp" autofocus>
                        <i class="fa fa-envelope frm-ico"></i>
                    </div>

                    <div class="frm-input">
                        <input type="password" placeholder="Senha" v-model="formdata.password" class="frm-inp">
                        <i class="fa fa-lock frm-ico"></i>
                    </div>
                    <!--<div class="clearfix margin-bottom-20">
                        <div class="pull-left">
                            <div class="checkbox primary">
                                <input type="checkbox" id="rememberme">
                                <label for="rememberme">Mantenha-me conectado</label>
                            </div>
                        </div>
                        <div class="pull-right">
                            <a href="#" class="a-link">
                                <i class="fa fa-unlock-alt"></i>Esqueci a senha?
                            </a>
                        </div>
                    </div>-->
                    <button type="submit" class="frm-submit">Entrar<i class="fa fa-arrow-circle-right"></i></button>
                    <hr>
                    <div class="text-center">Cocão Sistemas ©
                        {{ new Date().getFullYear() }}
                    </div>
                </div>
            </form>
        </div>
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
    import axios from 'axios'
    import Loader from '@/components/Loader';

    export default {
        name: 'Login',
        components: {
            Loader
        },
        data () {
            return {
                formdata:{ email: '', password: '' },
                isLoading: false
            }
        },
        methods: {
            mostra_modal_resposta: function (mensagem){
                this.mensagem_resposta = mensagem;
                this.$modal.show("modal-resposta");
            },

            submitform(){
                this.isLoading = true
                axios.post('http://localhost:8000/api/login', this.formdata )
                    .then(res => {
                        this.isLoading = false
                        sessionStorage.setItem('token', res.data.access_token);
                        this.$router.replace('/home');
                    }).catch((err) => {
                        this.isLoading = false;
                        if(err.response.status === 404)
                            this.mostra_modal_resposta("Falha ao realizar operação. Tente novamente mais tarde.");
                        else
                            this.mostra_modal_resposta(err.response.data.error);
                    });
            },
        }
    }
</script>

<style>

</style>
