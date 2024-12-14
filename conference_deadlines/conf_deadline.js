function on_document_load() {
  const now = new Date();
  const trs = document.getElementsByTagName('tr');
  const count = trs.length;
  for (let i = 0; i < count; i++) {
    const tr = trs[i];
    const deadline = tr.children[1].textContent;
    const splits = deadline.split('/');
    const y = Number.parseInt(splits[2]);
    const monIndex = Number.parseInt(splits[1]) - 1;
    const day = Number.parseInt(splits[0]);
    const d = new Date(y, monIndex, day);
    const delta = d - now;
    const remaining_days = Math.floor(delta / 1000 / 60 / 60 / 24);
    tr.children[2].textContent = `[${remaining_days} days]`;
  }
}

window.onload = on_document_load;
