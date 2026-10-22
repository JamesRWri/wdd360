<script lang="ts">
  import InlineField from "./components/InlineField.svelte";
  import { useInlineEdit } from "./useInlineEdit.svelte.ts";

  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    bio: "Frontend developer who loves Svelte."
  };

  async function saveProfile(updated: typeof user) {
    // Add a short delay to simulate server latency
    await new Promise((r) => setTimeout(r, 500));
    Object.assign(user, updated);
    console.log("Profile saved:", user);
  }

  const edit = useInlineEdit(user, saveProfile);
</script>

<div class="profile-container">
  <h2>User Profile</h2>

  <InlineField label="Name" bind:value={edit.draft.name} />
  <InlineField label="Email" type="email" bind:value={edit.draft.email} />
  <InlineField label="Bio" type="textarea" bind:value={edit.draft.bio} />

  {#if edit.isDirty()}
    <div class="actions">
      <button onclick={edit.save}>Save</button>
      <button onclick={edit.cancel}>Cancel</button>
    </div>
  {/if}
</div>

<style>
  .profile-container {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    margin: 20px auto;
  }
  .actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
  }
  button {
    padding: 6px 12px;
    cursor: pointer;
  }
</style>