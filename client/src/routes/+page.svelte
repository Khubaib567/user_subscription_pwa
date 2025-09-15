<script>
  import Dashboard from "../components/Dashboard/page.svelte";
  import Login from "../components/Login/page.svelte";

  // /** @type {import('./$types').PageProps} */
  let { data } = $props();
  const subscriber = data.user;
  // console.log(subscriber.subscription);
  const subscription = subscriber.subscription;
  // console.log("Subscription : ", subscription);

  console.log("Home page has rendered!");
</script>

{#if subscription === false}
  <Login />
{/if}
{#if subscription === true}
  <Dashboard />
{/if}
