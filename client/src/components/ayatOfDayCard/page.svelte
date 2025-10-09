<script lang="ts">
  import { onMount } from "svelte";
  import { currentLangs } from "../../stores/quran";
  import type { PageData } from "../../routes/$types";
  import { AYATAPILIST } from "../../assets/daily_content/ayatAPI";
  import { get } from "svelte/store";

  let ayats = [];
  let dayToGet = new Date().getDate() - 1;
  const surahToGet = AYATAPILIST[dayToGet];

  onMount(async () => {
    const langs = ["ar", "ur"];
    const url = `https://ap-1.ixon.cc/api/v3/quran?surah=${surahToGet["Surah"]}&ayat=${surahToGet["Ayat"]}&limit=${surahToGet["Limit"]}&lang=${langs}`;
    const res = await fetch(url);
    ayats = await res.json();
    ayats = ayats.data;
  });
</script>

<div class="card w-full">
  <div class="card-body">
    <h1 class="card-title">Ayat of the Day</h1>
    <h2 class="card-title">{surahToGet.Topic}</h2>
    {#if ayats.length != 0}
      <div>
        <!-- <h1>{JSON.stringify(ayats[0])}</h1>
          <h1>{JSON.stringify(ayats[1])}</h1> -->
        {#each ayats as ayat}
          {#if ayat.lang == "AR"}
            <p class="text-2xl p-2 leading-loose font-quran" dir="rtl">
              {ayat.qtext}
            </p>
          {/if}
          {#if ayat.lang == "UR"}
            <p class="text-1xl p-2 leading-loose font-urdu" dir="rtl">
              {ayat.qtext}
            </p>
          {/if}
        {/each}
      </div>
      <p />
      <p>
        {#if surahToGet.Limit == 1}
          {surahToGet.Surah}: {surahToGet.Ayat}
        {:else}
          {surahToGet.Surah}: {surahToGet.Ayat}-{surahToGet.Ayat +
            surahToGet.Limit}
        {/if}
      </p>
      <!-- <h3>{props.topic}</h3>
      <p>{props.ayat}</p> -->
    {/if}
  </div>
</div>

<style>
</style>
