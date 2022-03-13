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
];

// console.log('load news!');
function load_news(countnews) {
  console.log('load_news', countnews);
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
