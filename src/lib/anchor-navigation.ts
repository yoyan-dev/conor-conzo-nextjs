export function focusSection(id: string) {
  requestAnimationFrame(() => {
    document.getElementById(id)?.focus({ preventScroll: true });
  });
}
