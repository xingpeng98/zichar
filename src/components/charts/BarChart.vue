<template>
  <div class="chart">
    <h1>Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
export default {
    components: {
        chart: BarChart
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