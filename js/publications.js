const pubs = [
  {
    title: 'Demystifying Performance of eBPF Network Applications',
    authors: 'Farbod Shahinfar, Sebastiano Miano, Aurojit Panda, Gianni Antichi',
    link: 'https://dl.acm.org/doi/10.1145/3749216',
    pdf: 'https://dl.acm.org/doi/pdf/10.1145/3749216',
    abrv: 'CoNEXT',
    year: 2025,
    tag: 'conference',
  },
  {
    title: 'Performance Implications at the Intersection of AF_XDP and Programmable NICs',
    authors: 'Marco Mole, Farbod Shahinfar, Francesco Maria Tranquillo, Davide Zoni, Aurojit Panda, Gianni Antichi',
    link: 'https://dl.acm.org/doi/10.1145/3748355.3748359',
    pdf: 'https://dl.acm.org/doi/pdf/10.1145/3748355.3748359',
    abrv: 'eBPF',
    year: 2025,
    tag: 'workshop',
  },
  {
    title: 'POSTER: Software Prefetching for eBPF Programs',
    authors: 'Farbod Shahinfar, Aurojit Panda, Gianni Antichi',
    link: 'https://dl.acm.org/doi/10.1145/3744969.3748421',
    pdf: 'https://dl.acm.org/doi/pdf/10.1145/3744969.3748421',
    abrv: 'SIGCOMM',
    year: 2025,
    tag: 'poster',
  },
  {
    title: 'Automatic kernel offload using BPF',
    authors: 'Farbod Shahinfar, Sebastiano Miano, Giuseppe Siracusano, Roberto Bifulco, Aurojit Panda, Gianni Antichi',
    link: 'https://sigops.org/s/conferences/hotos/2023/papers/shahinfar.pdf',
    pdf: 'https://dl.acm.org/doi/pdf/10.1145/3593856.3595888',
    abrv: 'HotOS',
    year: 2023,
    tag: 'workshop',
  },
  {
    title: 'Backdraft: a Lossless Virtual Switch that Prevents the Slow Receiver Problem',
    authors: 'Alireza Sanaee, Farbod Shahinfar, Gianni Antichi, Brent E. Stephens',
    link: 'https://www.usenix.org/conference/nsdi22/presentation/sanaee',
    pdf: 'https://www.usenix.org/system/files/nsdi22-paper-sanaee.pdf',
    abrv: 'NSDI',
    year: 2022,
    tag: 'conference',
  },
  {
    title: 'Poster: The Case for Network Functions Decomposition',
    authors: 'Farbod Shahinfar, Sebastiano Miano, Alireza Sanaee, Giuseppe Siracusano, Roberto Bifulco, Gianni Antichi',
    link: 'https://dl.acm.org/doi/abs/10.1145/3485983.3493349',
    pdf: 'papers/poster_the_case_for_network_function_decomposition.pdf',
    abrv: 'CoNEXT',
    year: 2021,
    tag: 'poster',
  },
]

function create_pub_elem(p) {
  const div = document.createElement('div');
  div.className = 'pubdiv'

  const title = document.createElement('b');
  title.innerHTML = p.title;
  title.className = 'pubtitle'
  div.appendChild(title)

  if (p.link !== undefined && p.link !== null && p.link !== '') {
    const link = document.createElement('a')
    link.innerHTML = '[Link]'
    link.href = p.link
    link.target = '_blank'
    link.style = 'padding-left: 1em;'
    div.appendChild(link)
  }

  if (p.pdf !== undefined && p.pdf !== null && p.pdf !== '') {
    const link = document.createElement('a')
    link.innerHTML = '[PDF]'
    link.href = p.pdf
    link.target = '_blank'
    div.appendChild(link)
  }

  const authors = document.createElement('div');
  const tmp1 = document.createElement('span');
  p.authors.split(',').forEach((x) => {
    x = x.trim();
    let s = '';
    if (x === 'Farbod Shahinfar') {
      s = document.createElement('b');
    } else {
      s = document.createElement('span');
    }
    s.innerHTML = '; ' + x;
    authors.appendChild(s)
  });
  div.appendChild(authors);

  const venue = document.createElement('span');
  venue.innerHTML = '; ' + p.abrv + '(' + p.year + ')';
  div.appendChild(venue);

  return div
}

let active_tags = ['conference', ];

function load_pubs(count) {
  const container = document.getElementById('pubdiv');

  // remove all existing nodes
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }

  ['conference', 'workshop', 'poster'].forEach(x => {
    const btn = document.createElement('button')
    btn.innerHTML = x;
    btn.addEventListener('click',  () => {active_tags = [x,]; load_pubs();} );
    container.appendChild(btn);
  });

  const link = document.createElement('a');
  link.href = '/pubs.html';
  link.innerHTML = 'See all';
  container.appendChild(link);

  if (count === undefined) {
    count = pubs.length;
  }

  const tmpdiv = document.createElement('div')
  for (let i = 0; i < count; i++) {
    const p = pubs[i];
    if (active_tags.includes(p.tag)) {
      const nelem = create_pub_elem(p);
      tmpdiv.appendChild(nelem);
    }
  }
  container.appendChild(tmpdiv);
}
