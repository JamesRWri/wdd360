<script lang="ts">
  let email = $state("");
  let password = $state("");
  let errorMessage = $state("");

  function loginHandler(event: Event) {
    event.preventDefault();
    
    // Basic validation
    if (!email.includes("@") || !email.includes(".")) {
      errorMessage = "Please enter a valid email address.";
      return;
    }
    if (password.length < 6) {
      errorMessage = "Password must be at least 6 characters long.";
      return;
    }

    errorMessage = "";
    console.log("Login button clicked successfully!", { email, password });
  }
</script>

<form onsubmit={loginHandler}>
  <div>
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} placeholder="Enter email" />
  </div>
  <div>
    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} placeholder="Enter password" />
  </div>
  <button type="submit">Log In</button>
  
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
  }
  .error {
    color: red;
    font-size: 0.9rem;
  }
</style>