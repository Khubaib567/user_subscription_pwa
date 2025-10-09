import { citiesList } from "../stores/store";

import { CITIES_LIST_EXTENDED } from "../assets/data/constants";

import type { PageLoad } from "./$types";

export const load: any = (async ({ fetch }: { fetch: any }) => {
  citiesList.set(CITIES_LIST_EXTENDED);
  return {
    cities: CITIES_LIST_EXTENDED,
  };
}) satisfies PageLoad;
