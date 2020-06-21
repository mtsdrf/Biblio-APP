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
                        <highcharts :options="EmprestadosXDisponiveis" ref="EmprestadosXDisponiveis"></highcharts>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-xs-12">
                    <div class="box-content">
                        <h4 class="box-title text-center">Livros por Mês</h4>
                        <highcharts :options="LivrosXMes" :updateArgs="LivrosXMes"></highcharts>
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

    var EmprestadosXDisponiveis = {
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
                y: 75,
            }, {
                name: 'Disponíveis',
                y: 25
            }]
        }]
    }

    export default {
        name: 'HomePage',
        components: {
            Layout,
            Loader
        },
        data() {
            return {
                isLoading: false,
                LivrosAtasados: 0,
                LivrosEmprestados: 0,
                EmprestadosXDisponiveis,
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
        created() {
            this.isLoading = true;
            axios.get("http://localhost:8000/api/home", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res.data)
                this.LivrosAtasados            = res.data.atrasos;
                this.LivrosEmprestados         = res.data.emprestados;
                this.LivrosXMes.categories     = res.data.livrosmes.map((item) => { return item.mes });
                this.LivrosXMes.series[0].data = res.data.livrosmes.map((item) => { return item.livros });
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
                alert("Falha ao realizar a busca de empréstimos.");
            });
        }
    }
</script>

<style>

</style>
