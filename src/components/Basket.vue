<template>
<div>
    <p>Menu:</p>
    <ul>
        <li v-for="(item, index) in items" :key="index">
            {{item[0]}} x {{item[1]}}
        </li>
    </ul>
    <button style="button" @click="calculate()">Calculate Total</button>
    <button style="button" @click="sendOrder()">Send Order</button>
    <p v-show="calculated">Subtotal: ${{subtotal}}</p>
    <p v-show="calculated">Grand Total: ${{grandTotal}}</p>
    
</div>
</template>

<script>
import db from '../firebase.js'

export default {
  props: ['items'],
  data() {
      return {
          calculated:false,
          subtotal:0,
          grandTotal:0,
      }
  },
  methods: {
      calculate: function() {
          if (this.subtotal != 0) {
              this.subtotal=0
          }
          for (var i in this.items) {
            var item = this.items[i]
            this.subtotal += (item[1] * item[2])
          }
          this.grandTotal = (this.subtotal * 1.07).toFixed(2)
          this.calculated = true
      },
      sendOrder: function() {
          let order = {
              "Prawn omelette":0,
              "Dry Beef Hor Fun":0,
              "Sambal KangKung":0,
              "Pork Fried Rice":0,
              "Mapo Tofu":0,
              "Cereal Prawn":0
          }
          for (var i in this.items) {
              order[this.items[i][0]] = this.items[i][1]
          }
          db.collection('Orders').add(order).then(() => location.reload())
          console.log("order sent")
      }
  },
  watch: {
      items: function(){
          this.calculated=false
      }
  }
}
</script>

<style scoped>
p {
    font-size: 20px;
}

ul {
    font-size: 20px;
}

button {
    background-color:lemonchiffon;
    padding:5px;
    border-radius: 6px;
    margin-left: 10px;
}
</style>