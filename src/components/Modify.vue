<template>
<div>
    <form>
        <div v-for="(count, food) in datapacket" :key="food.index">
            <label for=food>{{food}}: {{count}}</label><br>
            <input type="number" :id="food" value="0" min="0"><br>
        </div>
        <button type="button" style="button" @click="updateOrder"><strong>Update Order</strong></button>
    </form>
</div>
</template>

<script>
import db from '../firebase.js'

export default {
    data() {
        return {
            //foodItems:["Sambal KangKung", "Cereal Prawn", "Mapo Tofu", "Dry Beef Hor Fun", "Pork Fried Rice", "Prawn omelette"],
            id:this.$route.params.id,
            datapacket: {},
            changed: {}
        }
    },
    methods: {
        fetchItems: function() {
            db.collection('Orders').doc(this.id).get().then(doc=>{
                this.datapacket = doc.data()
                console.log(this.datapacket)
            })
        },
        updateOrder: function(){
            for (let [key, value] of Object.entries(this.datapacket)) {
                var count = document.getElementById(key).value
                if (count != value) {
                    this.changed[key] = count
                }
            }
            console.log(this.changed)
            db.collection('Orders').doc(this.id).update(this.changed).then(() => {this.$router.go(-1)})
        }
    },
    created: function() {
        this.fetchItems()
    }

}
</script>

<style scoped>
form {
    padding-left: 20px;
    padding-top: 20px;
}

input {
    margin-bottom: 20px;
    margin-top: 5px;
}

button {
  width: 130px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  margin: 10px;
  font-size: 15px;
}
</style>