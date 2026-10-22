export function useInlineEdit<T extends Record<string, any>>(initialData: T, onSave: (draft: T) => Promise<void>) {
  let original = $state({ ...initialData });
  let draft = $state({ ...initialData });

  function isDirty() {
    return JSON.stringify(original) !== JSON.stringify(draft);
  }

  async function save() {
    await onSave(draft);
    original = { ...draft };
  }

  function cancel() {
    draft = { ...original };
  }

  return {
    get draft() { return draft; },
    isDirty,
    save,
    cancel
  };
}