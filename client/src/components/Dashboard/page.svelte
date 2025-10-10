<script lang="ts">
  import { HIJRI_MONTHS_LIST } from "../../assets/data/constants";
  import { currentCityDailyPrayerTime } from "../../stores/prayerTime";
  // import { currentCity } from "../../stores/store";

  import { getNextSalah } from "../../helpers/prayerDataFetchers";

  let currentDateTime = new Date();

  let hours: any;
  let minutes: any;
  let seconds: any;

  let nextPrayer: any = {};
  let showNextTime: any = false;

  function toHoursAndMinutes(totalSeconds: any) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { h: hours, m: minutes, s: seconds };
  }

  export const timeTracker = setInterval(() => {
    currentDateTime = new Date();
    nextPrayer = getNextSalah(currentDateTime);

    if (nextPrayer != undefined) {
      // console.log("----------nextPrayer", nextPrayer);
      let timeToNext = toHoursAndMinutes((nextPrayer.timeDiff / 1000) * -1);
      showNextTime = true;

      hours = timeToNext.h;
      minutes = timeToNext.m;
      seconds = timeToNext.s;
    } else {
      showNextTime = false;
    }
  }, 1000);
</script>

<div class="flex justify-center px-5 pt-4 pb-50">
  <div
    class="bg-[url(https://i.ibb.co/2drgzVX/mosque-1.png)] stats w-screen bg-no-repeat bg-cover"
  >
    <div class="stat pl-10">
      {#if showNextTime}
        <div>
          <h2 class="card-title text-2xl text-white">
            {nextPrayer.prayer} in
            <span class="countdown text-xl">
              <span style="--value:{hours};" />h
              <span style="--value:{minutes};" />m
              <span style="--value:{seconds};" />s
            </span>
          </h2>
          <br />
        </div>
      {/if}

      <div class="stat-title text-white">
        {$currentCityDailyPrayerTime.date_str}
      </div>
      <!-- <div class="stat-title text-white">
        <span>
          ({$currentCityDailyPrayerTime.hijri_date.hd}
        </span>
        {HIJRI_MONTHS_LIST[+$currentCityDailyPrayerTime.hijri_date.hm - 1]}
        {$currentCityDailyPrayerTime.hijri_date.hy})
      </div> -->
    </div>
    <div class="stat" />
  </div>
</div>
