<div class="fd-page__content">
  <Router url="{url}">
    <Route path="" component="{Home}" />
    <Route path="/home/sample1" component="{Sample1}" />
    <Route path="/home/sample2" component="{Sample2}" />
  </Router>
</div>

<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Sample1 from "./routes/Sample1.svelte";
  import Sample2 from "./routes/Sample2.svelte";
  export let url = "";
</script>

<style type="text/scss">
  :global(.fd-panel) {
    padding: 15px;
  }
</style>