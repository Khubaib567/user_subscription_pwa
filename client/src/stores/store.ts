import { get, writable } from 'svelte/store';
import { getSubscriber }  from "../../../server/server"

// export const userProfile = writable({ isLoggedIn: false, role: null });

const number = writable(923042574981)
export const subscriber = writable(await getSubscriber(get(number)));

// subscriber.subscribe(value => {
//       console.log(value)
//   })