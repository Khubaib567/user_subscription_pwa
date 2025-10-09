<script lang="ts">
  import Home from "./home/+page.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <Home />
</div>
