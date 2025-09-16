import { get, writable } from 'svelte/store';
import { getSubscriber ,getOTP }  from "../../../server/server"

// export const userProfile = writable({ isLoggedIn: false, role: null });

export const number = writable(923042574981)
export const subscriber = writable(await getSubscriber(get(number)));

export const otp = writable(await getOTP(get(number)))
// subscriber.subscribe(value => {
//       console.log(value)
//   })