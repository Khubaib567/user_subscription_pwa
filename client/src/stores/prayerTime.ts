import { writable } from "svelte/store";
import { fromLocalStorage, toLocalStorage } from "./storage";

export type TPrayerSetting = {
  calcMethod: string;
  asrMethod: string;
  timeZone: number;
  timeFormat: string;
};

export type TPrayerNotification = {
  name: string;
  notificationStatus: boolean;
};
export type TPrayerNotificationList = {
  notifications: TPrayerNotification[];
};

const prayerNotificationsInitialValue: TPrayerNotificationList =
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

export const currentCityDailyPrayerTimeInitialValue = fromLocalStorage(
  "currentCityDailyPrayerTime",
  null
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
