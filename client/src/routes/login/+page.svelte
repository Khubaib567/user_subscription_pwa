<script>
  import { form } from "$app/server";
</script>

<form method="POST">
  <div class="flex justify-center grid grid-flow-col grid-rows-3 gap-4">
    <h1>Welcome to Our App</h1>
    <div class="text-center">
      <label class="text-xl"
        >Phone Number
        <input
          id="number"
          name="number"
          type="text"
          value={form?.number ?? ""}
          placeholder="92 3XXXXXXXXX"
          class="input"
          required
        />
      </label>
    </div>
    <div class="text-center">
      <button formaction="?/otp" class="btn btn-active btn-success"
        >Get OTP</button
      >
    </div>
  </div>
</form>
