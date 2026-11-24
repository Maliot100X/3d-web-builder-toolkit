// Minimal, accessible word splitter (free alternative to SplitText for simple reveals).
// Keeps the original text in aria-label so screen readers read one sentence, not N spans.
export function splitWords(el) {
  if (el.dataset.split) return el.querySelectorAll('.w');
  const text = el.textContent.trim().replace(/\s+/g, ' ');
  el.setAttribute('aria-label', text);
  el.textContent = '';
  text.split(' ').forEach((word, i, arr) => {
    const outer = document.createElement('span');
    outer.className = 'w-mask';
    outer.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'w';
    inner.textContent = word;
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
  });
  el.dataset.split = '1';
  return el.querySelectorAll('.w');
}
