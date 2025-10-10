import { writable } from "svelte/store";
import { fromLocalStorage, toLocalStorage } from "./storage";

export const prayerSetting = {
  calcMethod: null,
  asrMethod: null,
  timeZone: null,
  timeFormat: null
};

// export let prayerNotifications = {
//   name: null,
//   notificationStatus: null
// };
export const prayerNotificationList = {
  notifications: null
};

const prayerNotificationsInitialValue =
  fromLocalStorage("prayerNotifications", {
    notifications: [
      {
        name: "FAJAR",
        notificationStatus: false,
      },
      {
        name: "DUHAR",
        notificationStatus: false,
      },
      {
        name: "ASAR",
        notificationStatus: false,
      },
      {
        name: "MAGRIB",
        notificationStatus: false,
      },
      {
        name: "ISHA",
        notificationStatus: false,
      },
    ],
  });
export const prayerNotifications = writable(prayerNotificationsInitialValue);
toLocalStorage(prayerNotifications, "prayerNotifications");

export const prayerSettingsInitialValue = fromLocalStorage("prayerSettings", {
  calcMethod: "KARACHI",
  asrMethod: "HANAFI",
  timeZone: 5,
  timeFormat: "12hNS",
});
export const prayerSettings = writable(prayerSettingsInitialValue);
toLocalStorage(prayerSettings, "prayerSettings");

// NEEDS TO UPDATED THE PRAYER TIME
export const currentCityDailyPrayerTimeInitialValue = fromLocalStorage(
  "currentCityDailyPrayerTime",
  null,
);
export const currentCityDailyPrayerTime = writable(
  currentCityDailyPrayerTimeInitialValue
);
toLocalStorage(currentCityDailyPrayerTime, "currentCityDailyPrayerTime");

export const currentCityMonthScheduleInitialValue = fromLocalStorage(
  "currentCityMonthSchedulePrayerTime",
  null
);
export const currentCityMonthSchedule = writable(
  currentCityMonthScheduleInitialValue
);
toLocalStorage(currentCityMonthSchedule, "currentCityMonthSchedule");
