<script lang="ts">
  let { label, value = $bindable(), type = "text" }: { label: string; value: string; type?: string } = $props();

  let isEditing = $state(false);
  let originalValue = $state(value);
  let currentValue = $state(value);
  let buttonRef = $state<HTMLButtonElement | null>(null);

  // Keep currentValue synced if the prop updates from outside
  $effect(() => {
    currentValue = value;
  });

  function startEdit() {
    originalValue = value;
    currentValue = value;
    isEditing = true;
  }

  function commitEdit() {
    value = currentValue;
    isEditing = false;
    buttonRef?.focus();
  }

  function cancelEdit() {
    currentValue = originalValue;
    value = originalValue;
    isEditing = false;
    buttonRef?.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (type !== "textarea") {
        event.preventDefault();
        commitEdit();
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancelEdit();
    }
  }

  // Svelte action to focus elements on render without a11y warnings
  function focusNode(node: HTMLElement) {
    node.focus();
  }
</script>

<div class="inline-field">
  <span class="field-label">{label}:</span>
  
  {#if isEditing}
    {#if type === "textarea"}
      <textarea 
        bind:value={currentValue} 
        onblur={commitEdit} 
        onkeydown={handleKeyDown} 
        use:focusNode
        aria-label={label}
      ></textarea>
    {:else}
      <input 
        type={type}
        bind:value={currentValue} 
        onblur={commitEdit} 
        onkeydown={handleKeyDown} 
        use:focusNode
        aria-label={label}
      />
    {/if}
  {:else}
    <button 
      bind:this={buttonRef}
      onclick={startEdit}
      aria-label={`Edit ${label}`}
      class="value-button"
    >
      {value || "Empty"}
    </button>
  {/if}
</div>

<style>
  .inline-field {
    margin: 8px 0;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .field-label {
    font-weight: bold;
  }
  .value-button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: 2px 4px;
    text-align: left;
    border-radius: 4px;
  }
  .value-button:hover {
    background-color: #f0f0f0;
  }
</style>