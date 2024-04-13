const triangles = [];
const vel_cap = 0.001;
let last_render_ts = 0;

// Set the top and left corners (css) for a element
function setElemPos(e, pos)
{
  e.style.left = pos[0] + "px";
  e.style.top = pos[1] + "px";
}

function createTriangle()
{
  const tri = {}
  tri.elem = document.createElement('div');
  tri.elem.classList.add('bg-elem');

  v_x = Math.random() * vel_cap;
  v_y = Math.random() * vel_cap;
  tri.velocity = [v_x, v_y];

  // tri.velocity = [0.001, 0];

  tri.position = [0, 0];

  setElemPos(tri.elem, tri.position)
  return tri;
}

function checkCollision(tri) {
  const rect = tri.elem.getBoundingClientRect();

  if (rect.x <= 0 || rect.x >= window.innerWidth) {
    tri.velocity[0] *= -1;
  }

  if (rect.y <= 0 || rect.y >= window.innerHeight) {
    tri.velocity[1] *= -1;
  }
}

function render(timestamp) {
  if (last_render_ts == 0) {
    // Beginign of the animation loop
    last_render_ts = timestamp;
    window.requestAnimationFrame(render);
    return;
  }

  delta_time = timestamp - last_render_ts;
  last_render_ts = timestamp;
  if (delta_time < 0) {
    console.warn('Timestamp overflow. Did not think it was happening');
    return;
  }

  for (let i = 0; i < triangles.length; i++) {
    tri = triangles[i];
    e = tri.elem;

    checkCollision(tri)

    // Constant speed relation
    new_x = tri.position[0] + tri.velocity[0] * delta_time;
    new_y = tri.position[1] + tri.velocity[1] * delta_time;
    tri.position = [new_x, new_y];
    setElemPos(e, tri.position);

    // console.log(e.style.left, e.style.top);
  }

  window.requestAnimationFrame(render);
}

function main() {
  const screen_w = window.screen.width
  let count_triangle = 26;
  if (screen_w > 1024) {
    count_triangle = 1998;
  }
  const list_container = document.getElementsByClassName('bg-effect-fix');
  if (list_container.length > 0) {
    const container = list_container[0];
    for (let i = 0; i < count_triangle; i++) {
      tri = createTriangle();
      container.appendChild(tri.elem);
      triangles.push(tri);
    }
  }

  window.requestAnimationFrame(render);
}

main();
