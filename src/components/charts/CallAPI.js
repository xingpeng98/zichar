import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
        return {
            colors: {
                'west':"#ff8d01", 
                'national': "#1d11ff", 
                'east': '#ff1911', 
                'central': '#ff01e6',
                'south': '#01ff34', 
                'north': '#f3ff11'
            },
            datacollection: {
                labels: [],
                datasets: []
            },
            options: {
                legend: { 
                    postion: 'top',

                },
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function () {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
            .then(response => {
                let responseData = response.data["items"]
                let dataFiltered = {'west':[], 'national':[], 'east':[], 'central':[], 'south':[], 'north':[]}
                for (let i = 0; i < responseData.length; i++) {
                    const chunk = responseData[i]
                    this.datacollection.labels.push(chunk["timestamp"])
                    const psi = chunk['readings']["psi_twenty_four_hourly"]
                    for (let key in psi) {
                        dataFiltered[key].push(psi[key])
                        //console.log("Debug response looping")
                        //console.log(psi[key])
                    }
                }
                for (let key in dataFiltered) {
                    this.datacollection.datasets.push({
                        data: dataFiltered[key],
                        fill: false,
                        borderWidth:0.5,
                        borderColor:this.colors[key],
                        label: key
                    })
                }
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    mounted () {
        this.fetchItems()
    }
}