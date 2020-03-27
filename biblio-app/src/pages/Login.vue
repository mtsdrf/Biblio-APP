<template>
    <div id="app" style="height: 100vh;">
        <div id="single-wrapper">
            <form class="frm-single" @submit.prevent="submitform">
                <div class="inside">
                    <div class="title"><strong>Biblio</strong></div>
                    <div class="frm-title">Login<br></div>
        
                    <div class="frm-input">
                        <input type="text" placeholder="Email" v-model="formdata.email" class="frm-inp">
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
                    
                    <div class="frm-footer text-center">Cocão Sistemas ©
                        {{ new Date().getFullYear() }}
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data () {
            return {
                formdata:{ email: '', password: '' }
            }
        },
        methods: {
            submitform(){
                axios.post('http://localhost:8000/api/login', this.formdata )
                    .then(res => {
                        sessionStorage.setItem('token', res.data.access_token);
                        this.$router.replace('/home');
                    })
                    .catch(err => {
                        alert("erro: " + err);
                    })
            },
        }
    }
</script>

<style>

</style>
