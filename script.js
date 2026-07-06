// Marca que hay JS: los reveals solo se ocultan con esta clase (sin JS todo se ve).
document.documentElement.classList.add("js");

// ==========================================================
// 21st.dev: WebGL Shader Background
// Adapted from: Animated Shader Background (thanh/atzedent)
// Colors modified to dark monochrome for Obsidian Editorial
// ==========================================================

const DARK_SHADER_SOURCE = `#version 300 es
/*
 * Adapted from Matthias Hurrle (@atzedent)
 * Colors remapped to dark monochrome palette
 */
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform int pointerCount;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.3,-st.y));
  uv*=1.-.3*(sin(T*.15)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.3+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    // Monochrome: white/cool gray light points
    col+=.0008/d*(vec3(.7,.72,.75)+.3);
    float b=noise(i+p+bg*1.731);
    col+=.0015*b/length(max(p,vec2(b*p.x*.02,p.y)));
    // Dark fog: very subtle gray
    col=mix(col,vec3(bg*.06,bg*.055,bg*.065),d);
  }
  // Clamp to keep it very dark
  col=clamp(col, vec3(0.), vec3(.3));
  O=vec4(col,1);
}`;

class ShaderRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2');
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this.scale = 1;
    this.mouseCoords = [0, 0];
    this.pointerCount = 0;
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
    this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
      return false;
    }
    return true;
  }

  setup(fragSource) {
    const gl = this.gl;
    if (!gl) return false;

    this.reset();

    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);

    if (!this.compile(this.vs, this.vertexSrc)) return false;
    if (!this.compile(this.fs, fragSource)) return false;

    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
      return false;
    }

    // Init buffer
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // Cache uniform locations
    this.uniforms = {
      resolution: gl.getUniformLocation(this.program, 'resolution'),
      time: gl.getUniformLocation(this.program, 'time'),
      touch: gl.getUniformLocation(this.program, 'touch'),
      pointerCount: gl.getUniformLocation(this.program, 'pointerCount'),
    };

    return true;
  }

  reset() {
    const gl = this.gl;
    if (!gl || !this.program) return;
    if (gl.getProgramParameter(this.program, gl.DELETE_STATUS)) return;
    if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
    if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
    gl.deleteProgram(this.program);
    this.program = null;
  }

  resize() {
    const dpr = Math.max(1, 0.85 * window.devicePixelRatio);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.scale = dpr;
    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  render(now) {
    const gl = this.gl;
    const program = this.program;
    if (!gl || !program) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uniforms.time, now * 1e-3);
    gl.uniform2f(this.uniforms.touch, ...this.mouseCoords);
    gl.uniform1i(this.uniforms.pointerCount, this.pointerCount);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    this.reset();
  }
}

// Initialize shader background
(function initShaderBg() {
  const canvas = document.getElementById('shader-canvas');
  const container = document.getElementById('shader-bg');
  if (!canvas || !container) return;

  const renderer = new ShaderRenderer(canvas);

  if (!renderer.gl) {
    // Fallback: no WebGL
    container.classList.add('no-webgl');
    canvas.style.display = 'none';
    return;
  }

  renderer.resize();

  if (!renderer.setup(DARK_SHADER_SOURCE)) {
    container.classList.add('no-webgl');
    canvas.style.display = 'none';
    return;
  }

  // Mouse tracking for shader (optional interaction)
  canvas.style.pointerEvents = 'none';

  let animId;
  function loop(now) {
    renderer.render(now);
    animId = requestAnimationFrame(loop);
  }

  loop(0);

  window.addEventListener('resize', () => renderer.resize());

  // Pause when tab is hidden for performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      loop(performance.now());
    }
  });
})();


// ==========================================================
// Menu movil — animated hamburger → X
// ==========================================================
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  const setMenuState = (open) => {
    nav.classList.toggle("open", open);
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("open"));
  });

  // Close on link click
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      setMenuState(false);
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenuState(false);
    }
  });

  // Close on click outside
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
      setMenuState(false);
    }
  });
}

// ==========================================================
// Text Reveal — character-by-character animation
// ==========================================================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".text-reveal").forEach((el) => {
  if (prefersReducedMotion) return;

  const text = el.textContent;
  el.textContent = "";
  el.setAttribute("aria-label", text);

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.classList.add("char");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.setProperty("--char-delay", `${200 + i * 30}ms`);
    span.setAttribute("aria-hidden", "true");
    el.appendChild(span);
  });
});

// ==========================================================
// Active nav link highlight on scroll
// ==========================================================
const navLinks = document.querySelectorAll(".nav a[href^='#']");
const sections = document.querySelectorAll("main .section[id], .hero[id]");

function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "var(--text)";
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

// ==========================================================
// Topbar — subtle border glow on scroll
// ==========================================================
const topbar = document.querySelector(".topbar");

if (topbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      topbar.style.borderBottomColor = "rgba(82, 82, 91, 0.4)";
      topbar.style.boxShadow = "0 1px 20px rgba(0,0,0,0.5)";
    } else {
      topbar.style.borderBottomColor = "";
      topbar.style.boxShadow = "";
    }
  }, { passive: true });
}

// ==========================================================
// Animated counters — count up when visible
// ==========================================================
if (!prefersReducedMotion) {
  document.querySelectorAll(".section-label .count").forEach((counter) => {
    const target = parseInt(counter.textContent, 10);
    if (isNaN(target)) return;

    counter.textContent = "00";

    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        let current = 0;
        const step = () => {
          current++;
          counter.textContent = String(current).padStart(2, "0");
          if (current < target) requestAnimationFrame(step);
        };
        setTimeout(step, 300);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    countObserver.observe(counter.closest(".section-label") || counter);
  });
}

// ==========================================================
// Scroll Reveals — staggered per section
// ==========================================================
const revealTargets = document.querySelectorAll(".reveal-hidden, .reveal-blur");

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add("reveal-visible"));
} else if (revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        const items = (section.matches(".reveal-hidden") || section.matches(".reveal-blur"))
          ? [section]
          : section.querySelectorAll(".reveal-hidden, .reveal-blur");
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add("reveal-visible"), i * 100);
        });
        obs.unobserve(section);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll("main .section, footer.reveal-hidden").forEach((el) => {
    observer.observe(el);
  });
}

