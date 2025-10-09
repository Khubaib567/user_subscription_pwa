import * as crypto from "crypto";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  const params: any = new URLSearchParams(new URL(url).search);
  const data: any = decodeURIComponent(params.get("data"));

  const signature: any = decodeURIComponent(params.get("signature"))
    .replace(/\//g, "_")
    .replace(/\s+/g, "-");

  const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj2kwgCCyG56J0PYHIOlr
Kjc2rNdqavMrgfUx88gnc0PXk1iopDeVhLTiWN2LX19iDsMEIr8ydn+eHHYTMc+D
3vMCMm4nRnvaK77/2BNkzUZoiGOMlEnzSavS4txqQg/jE/lARP3FR3QexkL0uC5p
CVGQTK3wBF+gcxYkMJU6kT4RafYUcMR3TY64gSUannO2nBpFqj6V+gcJ0VyN7fyw
q5b57UNNjrs8/JgVe0d9QnCt2v0MngCPORjKXlI1ChzJwhX274dvkFORBExMUvrX
/gFfyirIWqNK5G3xJMibaT1Y8n4sRye1wRgS32UCj4bXQhe5QXh7OS+oOZjIvmPw
9wIDAQAB
-----END PUBLIC KEY-----`;

  // Remove the header and footer lines
  const publicKey = crypto.createPublicKey({
    key: publicKeyPem,
    format: "pem",
  });

  // create a verifier instance
  const verifier = crypto.createVerify("SHA512");
  // Set the data of the verifier
  verifier.update(data);

  const isVerified = verifier.verify(publicKey, signature, "base64");

  // Verification occurs

  if (isVerified) {
    // set the user phone number
    console.log("Verification successful");
    return { page_server_data: { msisdn: "92" + data }, status: 302 };
  } else {
    console.log("Verification failed");
    // Call the appropriate function after verification failure
    throw error(404, {
      message: "Unauthorized Access",
    });
  }
}) satisfies PageServerLoad;
