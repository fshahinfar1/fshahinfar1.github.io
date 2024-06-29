// List of images I have in the gallery
// NOTE: I have assumed the array is sorted and newer files are toward end
files = [
"IMG_20240106_221914_180.jpg",
"IMG_20240106_223141_728.jpg",
"IMG_20240106_223356_610.jpg",
"IMG_20240106_223921_112.jpg",
"IMG_20240106_225548_591.jpg",
"IMG_20240115_005549_497.jpg",
"IMG_20240116_145717_549.jpg",
"IMG_20240120_193303_011.jpg",
"IMG_20240121_193648_540.jpg",
"IMG_20240121_213819_514.jpg",
"IMG_20240124_121405_367.jpg",
"IMG_20240206_120442_562.jpg",
"IMG_20240217_145705_053.jpg",
"IMG_20240225_105055_084.jpg",
"IMG_20240225_105817_409.jpg",
"IMG_20240309_200010_429.jpg",
"IMG_20240324_204011_408.jpg",
"IMG_20240406_122646_421.jpg",
"IMG_20240411_023720_520.jpg",
"IMG_20240413_210938_918.jpg",
"IMG_20240501_231149_083.jpg",
"IMG_20240502_194946_604.jpg",
"IMG_20240504_174044_785.jpg",
"IMG_20240507_212026_221.jpg",
"IMG_20240511_165002_937.jpg",
"IMG_20240518_212810_249.jpg",
"IMG_20240612_214250_548.jpg",
"IMG_20240612_215122_810.jpg",
"IMG_20240612_215404_903.jpg",
"IMG_20240628_230829_198.jpg",
]

function load_gallery(count)
{
  console.log('load gallery', count);
  const gallery = document.getElementById('gallery')
  if (gallery === undefined || gallery === null) {
    return;
  }
  if (count === undefined) {
    count = files.length;
  }
  const end = Math.max(0, files.length - count);
  for (let i = files.length - 1; i >= end; i--) {
    const file_name = files[i];
    const new_elem = document.createElement('img');
    new_elem.src = `gallery/${file_name}`;
    new_elem.width = 250;
    new_elem.height = 250;
    gallery.appendChild(new_elem);
  }
}
