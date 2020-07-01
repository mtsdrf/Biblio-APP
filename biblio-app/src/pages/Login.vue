<template>
    <div id="app" style="height: 100vh;">
        <div id="single-wrapper">
            <form class="frm-single" style="position: absolute;top: 42%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%);" @submit.prevent="submitform">
                <div class="inside">
                    <div class="title"><strong>Biblio</strong></div>
                    <div class="frm-title">Login<br></div>
        
                    <div class="frm-input">
                        <input type="text" placeholder="Email" v-model="formdata.email" class="frm-inp" autofocus>
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
            submitform(){
                this.isLoading = true
                axios.post('http://localhost:8000/api/login', this.formdata )
                    .then(res => {
                        this.isLoading = false
                        sessionStorage.setItem('token', res.data.access_token);
                        this.$router.replace('/home');
                    })
                    .catch(err => {
                        this.isLoading = false
                        alert("erro: " + err);
                    })
            },
        }
    }
</script>

<style>

</style>
