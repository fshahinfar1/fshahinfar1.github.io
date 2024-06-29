const triangles = [];
const vel_cap = 16;
let last_render_ts = 0;
let render_group = 0;
const render_group_size = 512;

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

  v_x = Math.floor((Math.random() * 2 - 1) * vel_cap);
  v_y = Math.floor((Math.random() * 2 - 1) * vel_cap);
  tri.velocity = [v_x, v_y];
  tri.position = [0, 0];

  setElemPos(tri.elem, tri.position)
  return tri;
}

function render(frameTs) {
  timestamp = Math.floor(frameTs) / 1024;
  if (last_render_ts == 0) {
    // Beginign of the animation loop
    last_render_ts = timestamp;
    window.requestAnimationFrame(render);
    return;
  }

  delta_time = timestamp - last_render_ts;
  if (delta_time < 0) {
    console.warn('Timestamp overflow. Did not think it was happening');
    last_render_ts = timestamp;
    window.requestAnimationFrame(render);
    return;
  }

  // Update of all triangles may not fit inside a frame budget. Group them and
  // process in phases.
  const count_group = Math.ceil(triangles.length / render_group_size);
  const current_phase = render_group;
  render_group = (render_group + 1) % count_group;
  const start_from = current_phase * render_group_size;
  const end_at =  Math.min(start_from + render_group_size, triangles.length);
  if (render_group == 0) {
    // All phases has been processed once. To the next cycle.
    last_render_ts = timestamp;
  }

  for (let i = start_from; i < end_at; i++) {
    tri = triangles[i];
    e = tri.elem;

    // Check for collision
    const rect = tri.elem.getBoundingClientRect();
    if (rect.x <= 0 || rect.x >= window.innerWidth) {
      tri.velocity[0] = -tri.velocity[0];
    }
    if (rect.y <= 0 || rect.y >= window.innerHeight) {
      tri.velocity[1] = -tri.velocity[1];
    }

    // Constant speed relation
    new_x = tri.position[0] + tri.velocity[0] * delta_time;
    new_y = tri.position[1] + tri.velocity[1] * delta_time;
    tri.position = [new_x, new_y];
    setElemPos(e, tri.position);
  }

  window.requestAnimationFrame(render);
  return;
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

  // window.requestAnimationFrame(render);
}

main();
