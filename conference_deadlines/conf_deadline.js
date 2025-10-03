const now = new Date();

function make_a_link(el, link) {
  const a = document.createElement('a')
  a.href = link
  a.target = '_blank'
  a.appendChild(el)
  return a
}

function get_remaining_days(deadline) {
  const splits = deadline.split('/');
  if (splits.length != 3) {
    return '!!'
  }
  const y = Number.parseInt(splits[2]);
  const monIndex = Number.parseInt(splits[1]) - 1;
  const day = Number.parseInt(splits[0]);
  if (y < 2000 || y > 4000) {
    return '!!'
  }
  if (monIndex < 0 || monIndex > 11) {
    return '!!'
  }
  if (day < 1 || day > 31) {
    return '!!'
  }
  const d = new Date(y, monIndex, day);
  const delta = d - now;
  const remaining_days = Math.floor(delta / 1000 / 60 / 60 / 24);
  return remaining_days.toString()
}

function insert_entry(table, d) {
  const tr = document.createElement('tr')
  // <td class="fancy-lbl">{d.lbl:10}:</td>
  // <td class="fancy-deadline">{d.deadline:10}</td>
  // <td class="fancy-days"></td>'

  //
  let td = document.createElement('td')
  td.className = 'fancy-lbl'
  td.innerHTML = d.lbl
  // if (d.fullname !== undefined) {
  //   o = wrap_in_tooltip(o, d.fullname)
  // }
  if (d.link !== undefined && d.link !== '#') {
    const a = make_a_link(td, d.link)
    tr.appendChild(a);
  } else {
    tr.appendChild(td);
  }
  //
  td = document.createElement('td')
  td.className = 'fancy-deadline'
  td.innerHTML = d.deadline
  tr.appendChild(td)
  //
  td = document.createElement('td')
  td.className = 'fancy-days'
  td.innerHTML = d.remaining
  tr.appendChild(td)
  //
  td = document.createElement('td')
  td.className = 'fancy-days'
  td.innerHTML = d.is_guess ? '(x)' : ''
  tr.appendChild(td)

  table.appendChild(tr)
}

function insert_sep_line(table) {
  insert_entry(table, {
    lbl: '------', 
    deadline: '------', 
    remaining: '------'
  })
}

function insert_header(table) {
  const fields = [
    'Conf. Abbrv.',
    'Abstract Registration',
    'Remaining days',
    'Is it a guess?',
  ];
  const tr = document.createElement('tr')
  for (let i = 0; i < fields.length; i++) {
    const th = document.createElement('th')
    th.className = 'fancy-hdr'
    th.innerHTML = fields[i];
    tr.appendChild(th);
  }
  table.appendChild(tr)
}

function on_document_load() {
  let inserted_sep = false
  const tbls = document.getElementsByClassName('conf-deadline-table')
  if (tbls.length < 1) {
    console.log('err: did not found the deadline table!')
    return
  }
  const table = tbls[0]
  insert_header(table);
  for (let i = 0; i < deadline_info.length; i++) {
    const d = deadline_info[i]
    if (!inserted_sep && d.days < 0) {
      inserted_sep = true;
      insert_sep_line(table)
    }
    d.remaining = get_remaining_days(d.deadline);
    insert_entry(table, d)
  }
}

window.onload = on_document_load;
