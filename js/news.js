const newslist = [
  {
    text: 'I have graduated with a Bachelor of Science in Computer Engineering from <a href="http://iust.ac.ir/">Iran University of Science and Technology</a>!',
    date: '2020-09-21'
  },
  {
    text: 'I am now a graduate student at <a href="http://www.sharif.edu/">Sharif University of Technology</a>.',
    date: '2020-11-11'
  },
  {
    text: "I have defined my master's thesis on load balancing of <i>Serverless Computing</i> platforms",
    date: "2021-09-08"
  },
  {
    text: 'I will be presenting a poster, <q>The Case for Network Functions Decomposition</q>, at CoNEXT21.',
    date: '2021-12-07',
  },
  {
    text: 'I am happy to share that <q>The Case for Network Function Decomposition</q> got the best poster award of CoNEXT\'21',
    date: '2021-12-09',
  },
  {
    text: 'Our work, led by <a href="https://sarsanaee.github.io/">Alireza Sanaee</a>, <a href="https://www.usenix.org/conference/nsdi22/presentation/sanaee"><q>Backdraft: a Lossless Virtual Switch that Prevents the Slow Receiver Problem</q></a> has been accepted at NSDI\'22</br>',
    date: '2022-02-28',
  },
  {
    text: 'I have defended my M.Sc. thesis and have graduated from <a href="http://ce.sharif.edu/">Sharif University of Technology</a>.',
    date: '2022-09-19',
  },
  {
    text: 'I started my Ph.D. in Information Technology at <a href="https://www.deib.polimi.it/ita/home">Politecnico di Milano</a>.',
    date: '2023-02-01',
  },
  {
    text: 'I am happy to anounce that "Automatic Kernel Offload using eBPF" was accepted in HotOS 2023!',
    date: '2023-04-16',
  },
  {
    text: 'I will participate in <a href="https://conferences.sigcomm.org/co-next/2023/#!/home">CoNEXT\'23</a> and present my work at its <a href="https://conferences.sigcomm.org/co-next/2023/#!/program-student">student workshop</a>',
    date: '2023-11-20',
  },
  {
    text: 'I am attending <a href="https://inw2024.disi.unitn.it/">Italian Networking Workshop (INW)</a> this year. I will be happy to chat if you\'re also there.',
    date: '2024-01-17',
  },
  {
    text: 'I\'ve written a tutorial on eBPF Arena API that I would like to share with you. <a target="_blank" href="/blog/04_ebpf_arena/build/blog.html">Link</a>',
    date: '2025-02-28',
  },
  {
    text: 'I will be presenting my work on Software Prefetching for eBPF in SIGCOMM poster session. Come by for a chat.',
    date: '2025-06-15',
  },
  {
    text: '<b><i>Performance Implications at the Intersection of AF_XDP and  Programmable NICs</i></b> was accepted in <a href="https://conferences.sigcomm.org/sigcomm/2025/workshop/ebpf/">eBPF workshop</a>. This work was led by <a href="https://marcomole00.github.io/">Marco Molè</a>.',
    date: '2025-06-23',
  },
  {
    text: '<b><i>Demystifying Performance of ebpf Network Applications</i></b> was accepted in <a href="https://conferences.sigcomm.org/co-next/2025/#!/home">CoNEXT\'25</a>. We discuss trade-offs for improving performance of end-host networked applications benefit with eBPF and point out improvement opportunities.',
    date: '2025-06-24',
  },
  {
    text: 'There is a new <b>networked systems</b> coference around! Have a look at <a href="https://nines-conference.org/">"New Ideas in Networked Systems (NINeS)"</a>. Many <a href="https://nines-conference.org/orgs">great people</a> are supporting it.',
    date: '2025-06-24',
  },
];

// console.log('load news!');
function load_news(countnews) {
  // console.log('load_news', countnews);
  const newsbox = document.getElementById('newsbox');
  if (countnews === undefined) {
    for (let i = newslist.length - 1; i >= 0; i--) {
      const nelem = document.createElement('li');
      nelem.innerHTML = newslist[i].text + ' - ' + newslist[i].date;
      newsbox.appendChild(nelem);
    }
  } else {
    const end = Math.max(0, newslist.length - countnews);
    for (let i = newslist.length - 1; i >= end; i--) {
      const nelem = document.createElement('li');
      nelem.innerHTML = newslist[i].text + ' - ' + newslist[i].date;
      newsbox.appendChild(nelem);
    }
  }
}
