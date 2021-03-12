<template>
  <div class="chart">
    <h1>Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import LineChart from "./CallAPI.js";
export default {
    components: {
        chart: LineChart
    }
};
</script>

<style scoped>
h1 {
  background: sandybrown;
  text-align: center;
  font-size: 50px;
}
</style>