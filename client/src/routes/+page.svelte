<script>
  import Login from "../components/Login/page.svelte";
  import UnSubscriber from "../components/UnSubscriber/page.svelte";
  // /** @type {import('./$types').PageProps} */
  let { data } = $props();
  const subscriber = data.user;
  // console.log(subscriber.subscription);
  const subscription = subscriber.subscription;
  // console.log("Subscription : ", subscription);

  console.log("Home page has rendered!");
</script>

{#if subscription === false}
  <UnSubscriber />
{/if}
{#if subscription === true}
  <Login />
{/if}
