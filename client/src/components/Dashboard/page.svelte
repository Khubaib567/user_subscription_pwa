<script>
  import { subscriber } from "../../stores/store";
  import { get } from "svelte/store";
  import Login from "../Login/page.svelte";
  const user = get(subscriber);
  const name = user.name;
</script>

<div class="flex justify-center grid grid-flow-col grid-rows-3 gap-4">
  <h1>Welcome {name} to Our App</h1>
  <div class="text-center">
    <a href="/login">
      <button class="btn btn-active btn-success">Logout</button>
    </a>
  </div>
</div>
