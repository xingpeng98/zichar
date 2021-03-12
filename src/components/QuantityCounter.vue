<template>
  <div>
      <button id="button_1" type="button" @click="decrement()">-</button>
      <a>{{count}}</a>
      <button id="button_2" type="button" @click="increment()">+</button>
  </div>
</template>

<script>
export default {
    name: "QuantityCounter",
    data() {
        return {
            count:0
        }
    },
    props: ['item'],
    methods: {
        increment: function() {
            this.count++
            this.$emit('counter', this.item, this.count)
        },
        decrement: function() {
            if (this.count > 0) {
                this.count--
                this.$emit('counter', this.item, this.count)
            }
        }
    }
}
</script>

<style scoped>
#button_1 {
    border:2px solid black;
    background:red;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    font-size: 25px;
}

#button_2 {
    border:2px solid black;
    background:rgb(0, 153, 0);
    width: 50px;
    height: 50px;
    border-radius: 4px;
    font-size: 25px;
}

a {
    padding: 20px;
    font-size: 20px;
}
</style>
