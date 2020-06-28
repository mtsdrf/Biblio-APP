<template>
    <div>
        <layout>
            <div class="row small-spacing">
                <div class="col-lg-6 col-md-6 col-sm-5 col-xs-5">
                    <div class="box-content">
                        <div class="statistics-box">
                            <h4 style="font-size: 16px; font-weight: 600" class="text">Livros com Atraso</h4>
                            <h2 class="counter">{{ LivrosAtasados }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7">
                    <div class="box-content">
                        <div class="statistics-box">
                            <h4 style="font-size: 16px; font-weight: 600" class="text">Livros Emprestados</h4>
                            <h2 class="counter">{{ LivrosEmprestados }}</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row small-spacing">
                <div class="col-lg-6 col-sm-12 col-xs-12">
                    <div class="box-content">
                        <h4 class="box-title text-center">Livros Emprestados X Livros Disponíveis</h4>
                        <highcharts :options="EmprestadosXDisponiveis"></highcharts>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-xs-12">
                    <div class="box-content">
                        <h4 class="box-title text-center">Livros por Mês</h4>
                        <highcharts :options="LivrosXMes"></highcharts>
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
    import axios from 'axios';
    import Loader from '@/components/Loader';

    export default {
        name: 'HomePage',
        components: {
            Layout,
            Loader
        },
        data() {
            return {
                isLoading: false,
                mensagem_resposta: '',
                LivrosAtasados: 0,
                LivrosEmprestados: 0,
                EmprestadosXDisponiveis: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        name: 'Livros',
                        colorByPoint: true,
                        data: [{
                            name: 'Emprestados',
                            y: 1,
                        }, {
                            name: 'Disponíveis',
                            y: 1
                        }]
                    }]
                },
                LivrosXMes: {
                    chart: {
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: [],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Quantidade (un)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y:f} un</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Livros',
                        data: []
                    }]
                }
            }
        },
        methods: {
            mostra_modal_resposta: function (mensagem){
                this.mensagem_resposta = mensagem;
                this.$modal.show("modal-resposta");
            },
        },
        created() {
            this.isLoading = true;
            axios.get("http://localhost:8000/api/home", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                //Popula cards do topo
                this.LivrosAtasados    = res.data.atrasos;
                this.LivrosEmprestados = res.data.emprestados;
                
                //Popula gráfico Livros X Mês
                this.LivrosXMes.xAxis.categories = res.data.livrosmes.map((item) => { return item.mes });
                this.LivrosXMes.series[0].data   = res.data.livrosmes.map((item) => { return item.livros });
                
                //Popula gráfico Livros emprestados X Livros disponiveis
                this.EmprestadosXDisponiveis.series[0].data = [{
                    name: 'Emprestados',
                    y: res.data.emprestados,
                }, {
                    name: 'Disponíveis',
                    y: res.data.disponivel
                }];

                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
                this.mostra_modal_resposta(err.response.data.status);
            });
        }
    }
</script>

<style>

</style>
