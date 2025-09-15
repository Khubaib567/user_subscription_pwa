// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

// +page.server.js
import { error } from "@sveltejs/kit";
import { get } from "svelte/store"; // Import the `get` utility from svelte/store
import { subscriber } from "../../stores/store";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */  
export function load () {
 try {
     // If `subscribers` is a client-side store, it cannot be reliably accessed on the server.
  // In a server `load` function, it is best to fetch data from a database or API directly.
  // If you must use a store, you should use the `get` utility to retrieve its current value.
  const user = get(subscriber);
  const otp = user.otp
  // console.log("User : " , user.otp)

  return {
    otp : otp
  }
    
 } catch (error) {
    console.error("Error : " , error)
 }
}

