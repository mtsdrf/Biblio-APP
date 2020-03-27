<template>
    <layout>
        <div class="row small-spacing">
            <div class="col-lg-12 col-xs-12">
                <div class="box-content" style="padding: 15px">
                    <div class="row" style="margin-bottom: 15px;">
                        <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
                            <h4>Livros</h4>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                            <button type="button" class="btn btn-primary waves-effect waves-light" onclick="adicionar()">Adicionar</button>
                        </div>
                    </div>
                    <div class="table-responsive" data-pattern="priority-columns">
                        <table id="example" class="table table-small-font table-bordered table-striped"
                            style="width:100%">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Editora</th>
                                    <th>Ano</th>
                                    <th>Autor</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody id="table-sgbds">
                                <tr>
                                    <td>O poder do hábito</td>
                                    <td>Objetiva</td>
                                    <td>2015</td>
                                    <td>Charles Duhigg</td>
                                    <td style="text-align: center">
                                        <button type="button" class="btn btn-warning waves-effect waves-light" onclick="editar(this)">
                                            <i class="ico ti-pencil-alt"></i>
                                        </button>
                                        <button type="button" class="btn btn-danger waves-effect waves-light" onclick="deletar(this)">
                                            <i class="ico ti-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>O poder do hábito</td>
                                    <td>Objetiva</td>
                                    <td>2015</td>
                                    <td>Charles Duhigg</td>
                                    <td style="text-align: center">
                                        <button type="button" class="btn btn-warning waves-effect waves-light" onclick="editar(this)">
                                            <i class="ico ti-pencil-alt"></i>
                                        </button>
                                        <button type="button" class="btn btn-danger waves-effect waves-light" onclick="deletar(this)">
                                            <i class="ico ti-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
    import Layout from '@/components/Layout';

    export default {
        name: 'Livros',
        components: {
            Layout
        }
    }
</script>

<style>

</style>
