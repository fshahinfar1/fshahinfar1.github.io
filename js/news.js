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
];

// console.log('load news!');
const newsbox = document.getElementById('newsbox');
const countnews = 3;
const end = Math.max(0, newslist.length - countnews);
for (let i = newslist.length - 1; i >= end; i--) {
  const nelem = document.createElement('li');
  nelem.innerHTML = newslist[i].text + ' - ' + newslist[i].date;
  newsbox.appendChild(nelem);
}
