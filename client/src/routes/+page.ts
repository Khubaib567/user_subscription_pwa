import type { PageLoad } from "./$types";

import {
  msisdn,
  accessToken,
  subStatus,
  currentCity,
  isHanafi,
} from "../stores/store";
import type { TCityData } from "../assets/data/constants";
import { get } from "svelte/store";
import { currentCityDailyPrayerTime } from "../stores/prayerTime";
import { getAccessToken } from "../helpers/subscriptionHelpers";
import { fetchCityPrayerTime } from "../helpers/prayerDataFetchers";

export const load: PageLoad = async ({ parent, data }) => {
  await parent();

  let { page_server_data } = data;

  let phoneNumber: any = data.page_server_data.msisdn;

  msisdn.set(phoneNumber);

  const getAccessTokenResponse: any = await getAccessToken();

  if (getAccessTokenResponse.response[0]["desc"] == "Verified User") {
    accessToken.set(getAccessTokenResponse.response[0]["token"]);
    subStatus.set(getAccessTokenResponse.response[0]["sub_status"]);
  }

  return {
    prayerTime: fetchCityPrayerTime(get(currentCity)),
  };
};
