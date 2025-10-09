<script lang="ts">
  import { isUrdu } from "../../stores/store";
</script>

<div class="flex justify-start border-t-2 rounded-xl">
  <h1 class="text-xl pl-5 pt-2 font-bold">
    {#if $isUrdu}<span dir="rtl"> آپ کیا کرنا چاہیں گے؟ </span>
    {:else}<span> Which One Will You Choose?</span>
    {/if}
  </h1>
</div>

<div
  class="carousel carousel-center w-full p-4 bg-white rounded-box shadow-lg space-x-4"
>
  <div class="grid grid-cols-1 carousel-item content-center">
    <a href="/quran">
      <div>
        <img
          alt="/quran"
          src="img/slider_cards/quran.png"
          class="rounded-box inline-block align-bottom"
        />
      </div>

      <div class="flex justify-center text-black">
        {#if $isUrdu}<span dir="rtl"> قرآن </span>
        {:else}
          <span> Quran </span>
        {/if}
      </div>
    </a>
  </div>

  <div class="grid grid-cols-1 carousel-item content-center">
    <a href="/tasbeeh">
      <div>
        <img
          alt="/tasbeeh"
          src="img/slider_cards/tasbeeh.png"
          class="rounded-box inline-block align-bottom"
        />
      </div>
      <div class="flex justify-center text-black">
        {#if $isUrdu}<span dir="rtl"> تسبیح </span>{:else}
          <span> Tasbeeh</span>
        {/if}
      </div></a
    >
  </div>
</div>
