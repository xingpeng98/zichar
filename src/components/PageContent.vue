<template>
  <div>
      <header>
        <ul id="navbar">
          <li>
            <router-link to="/" exact>Home</router-link>
          </li>
          <li>
            <router-link to="/orders" exact>Orders</router-link>
          </li>
          <li>
            <router-link to="/dashboard" exact>Dashboard</router-link>
          </li>
        </ul>
      </header>
      <ul id="itemsList">
          <li v-for= "item in items" :key="item.id">
              <p id="itemName">{{item.name}}</p>
              <img :src="item.imgURL"/>
              <p id="priceTag">${{item.price}}</p>
              <quantity-counter v-bind:item="item" @counter="onCounter"/>
          </li>
      </ul>
      <basket id="shoppingBasket" v-bind:items="itemsSelected"/>
  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import db from '../firebase.js'

export default {
    data() {
      return {
        itemsSelected: [],
        items: []
      }
    },
    components: {
        quantityCounter: QuantityCounter,
        basket: Basket
    },
    methods: {
      onCounter: function (item, count) {
        console.log(item.name + " " + count) //debug
        if (this.itemsSelected.length === 0 && count > 0) {
          this.itemsSelected.push([item.name, count, item.price]);
        } else {
          for (let i = 0; i < this.itemsSelected.length; i++) {
            const curr_item = this.itemsSelected[i];
            const item_name = curr_item[0];

            if (item_name == item.name) {
              this.itemsSelected.splice(i, 1)
              if (count != 0) {
                this.itemsSelected.splice(i,0, [item.name, count, item.price])
              }
              return
            }
          }
          this.itemsSelected.push([item.name, count, item.price]);
        }
      },
      fetchItems: function() {
        db.collection('Menu').get().then(snapshot => {
          let item = {};
          snapshot.docs.forEach(doc => {
            item = doc.data();
            this.items.push(item);
            console.log(item); //debug
          })
        })
      }
    },
    created: function() {
      this.fetchItems();
      console.log("created()"); //debug
    }
}
</script>

<style scoped>
#navbar {
  width: 100%;
  max-width: 70%;
}

#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
