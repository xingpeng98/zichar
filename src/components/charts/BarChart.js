import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    backgroundColor: ["#FFE0B5", "#EDE580", '#A4AF69', '#DF2935', '#033F63', '#592941'],
                    data: []
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total Number of each dish'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function () {
        database.collection('Orders').get().then(querySnapShot => {
            let orders = {}
            querySnapShot.forEach(doc => {
                let currorder = doc.data()
                for (let key in currorder) {
                    if (!(key in orders)) {
                        orders[key] = parseInt(currorder[key])
                    } else {
                        orders[key] = orders[key] + parseInt(currorder[key])
                    }
                }
            })
            for (let key in orders) {
                this.datacollection.labels.push(key)
                this.datacollection.datasets[0].data.push(orders[key])
            }

            this.renderChart(this.datacollection, this.options)
        })
        }
    },
    mounted () {
        this.fetchItems()
    }
}