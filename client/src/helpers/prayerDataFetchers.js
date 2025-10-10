import  { cityData } from "../assets/data/constants";

import { isHanafi } from "../stores/store";
import { get } from "svelte/store";
import {
  currentCityMonthSchedule,
  currentCityDailyPrayerTime,
} from "../stores/prayerTime";

import { convertTime12to24 } from "./dateConvertor";

export const fetchCityPrayerTime = async (cityData) => {
  // console.log("getting prayer timings");
  let calcMethod;
  if (get(isHanafi)) {
    calcMethod = "KARACHI";
    // console.log("------------is Hanafi should be true = ", calcMethod);
  } else {
    calcMethod = "QUM";
    // console.log("------------is Hanafi should be false = ", calcMethod);
  }

  const url = `https://ap-1.ixon.cc/api/v3/prayertime/pt?lt=${city.location.coordinates[0]}&lg=${city.location.coordinates[1]}&m=${calcMethod}&a=HANAFI&tz=5&f=12h`;
  // console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  currentCityDailyPrayerTime.set(data);
  return data;
};

export const fetchCityMonthCalendar = async (city) => {
  const url = `https://ap-1.ixon.cc/api/v3/prayertime/pt/range?lt=${city.location.coordinates[0]}&lg=${city.location.coordinates[1]}&m=${city.name}&a=HANAFI&tz=5&f=12hNS&std=2023-03-23&dys=30`;
  // console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  currentCityMonthSchedule.set(data);
  return data;
};

const appendPrayerDateToTime = (time) => {
  const prayerDate = get(currentCityDailyPrayerTime).date;
  return `${prayerDate.y}/${prayerDate.m}/${prayerDate.d} ${time}`;
};

export const getNextSalah = (currentDateTime) => {
  const currentPrayerSchedule = get(currentCityDailyPrayerTime);

  const currentFajrTime = {
    prayer: "fajr",
    time: appendPrayerDateToTime(convertTime12to24(currentPrayerSchedule.fajr)),
  };
  const currentDhuhrTime = {
    prayer: "dhuhr",
    time: appendPrayerDateToTime(
      convertTime12to24(currentPrayerSchedule.dhuhr)
    ),
  };
  const currentAsrTime = {
    prayer: "asr",
    time: appendPrayerDateToTime(convertTime12to24(currentPrayerSchedule.asr)),
  };
  const currentMaghribTime = {
    prayer: "maghrib",
    time: appendPrayerDateToTime(
      convertTime12to24(currentPrayerSchedule.maghrib)
    ),
  };
  const currentIshaTime = {
    prayer: "isha",
    time: appendPrayerDateToTime(convertTime12to24(currentPrayerSchedule.isha)),
  };
  // fajr
  // dhuhr
  // asr
  // maghrib
  // isha
  // date_str
  // date
  const prayerTimeArray = [
    currentFajrTime,
    currentDhuhrTime,
    currentAsrTime,
    currentMaghribTime,
    currentIshaTime,
  ];

  let prayerStatusArray = getTimeToNext(currentDateTime, prayerTimeArray);

  for (let i = 0; i < 5; i++) {
    if (!prayerStatusArray[i].prayerTimeStarted) {
      return prayerStatusArray[i];
    }
  }
};

const getTimeToNext = (currentDateTime, prayerTimeArray) => {
  let prayerTimeDiffArray;

  currentDateTime = new Date().toLocaleString("en", {
    timeZone: "Asia/Karachi",
  });

  for (let i = 0; i < prayerTimeArray.length; i++) {
    prayerTimeArray[i].time = new Date(prayerTimeArray[i].time).toLocaleString(
      "en",
      {
        timeZone: "Asia/Karachi",
      }
    );
  }

  prayerTimeDiffArray = [...prayerTimeArray];

  let currentDateEpochs = Date.parse(currentDateTime);

  // console.log("---------------prayerTimeArray", prayerTimeArray);
  for (let i = 0; i < prayerTimeArray.length; i++) {
    let prayerTimeEpoch = Date.parse(prayerTimeDiffArray[i].time),
      timeDiff = currentDateEpochs - prayerTimeEpoch;
    prayerTimeDiffArray[i] = {
      prayer: prayerTimeDiffArray[i].prayer.toUpperCase(),
      prayerTimeStarted: currentDateEpochs > prayerTimeEpoch,
      timeDiff: timeDiff,
    };
  }
  return prayerTimeDiffArray;
};
