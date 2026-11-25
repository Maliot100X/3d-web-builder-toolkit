/** Accessible word split: the parent keeps the sentence in aria-label; spans are aria-hidden. */
export function splitWords(el) {
  if (el.dataset.split) return [...el.querySelectorAll('.w')];
  const nodes = [...el.childNodes];
  el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
  el.textContent = '';
  const add = (word, italic) => {
    const mask = document.createElement('span');
    mask.className = 'w-mask';
    mask.setAttribute('aria-hidden', 'true');
    const w = document.createElement(italic ? 'em' : 'span');
    w.className = 'w';
    w.textContent = word;
    mask.appendChild(w);
    el.appendChild(mask);
    el.appendChild(document.createTextNode(' '));
  };
  nodes.forEach((n) => {
    const italic = n.nodeType === 1 && n.tagName === 'EM';
    n.textContent.trim().split(/\s+/).filter(Boolean).forEach((word) => add(word, italic));
  });
  el.dataset.split = '1';
  return [...el.querySelectorAll('.w')];
}
