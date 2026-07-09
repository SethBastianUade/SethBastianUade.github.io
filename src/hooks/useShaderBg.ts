"use client";

import { useEffect, useRef } from "react";

const DARK_SHADER_SOURCE = `#version 300 es
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
    col+=.0008/d*(vec3(.7,.72,.75)+.3);
    float b=noise(i+p+bg*1.731);
    col+=.0015*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.06,bg*.055,bg*.065),d);
  }
  col=clamp(col, vec3(0.), vec3(.3));
  O=vec4(col,1);
}`;

export function useShaderBg(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("webgl2");
    if (!ctx) return;

    const vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);

    const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    const gl: WebGL2RenderingContext = ctx;

    function compile(shader: WebGLShader, source: string) {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    }

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;

    if (!compile(vs, vertexSrc) || !compile(fs, DARK_SHADER_SOURCE)) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "resolution"),
      time: gl.getUniformLocation(program, "time"),
      touch: gl.getUniformLocation(program, "touch"),
      pointerCount: gl.getUniformLocation(program, "pointerCount"),
    };

    // Medir la caja CSS real del canvas, no el viewport: window.innerWidth
    // incluye la scrollbar y window.innerHeight cambia con la barra de URL en
    // mobile. Cualquier desfase de aspecto contra la caja pintada se ve como
    // deformacion, porque el shader corrige el aspecto con `resolution`.
    function resize() {
      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;
      if (!width || !height) return;

      const dpr = Math.max(1, 0.85 * window.devicePixelRatio);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      gl.viewport(0, 0, canvas!.width, canvas!.height);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    function render(now: number) {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      gl.uniform2f(uniforms.resolution, canvas!.width, canvas!.height);
      gl.uniform1f(uniforms.time, now * 1e-3);
      gl.uniform2f(uniforms.touch, 0, 0);
      gl.uniform1i(uniforms.pointerCount, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    let running = true;

    function loop(now: number) {
      if (!running) return;
      render(now);
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);

    function onVisibilityChange() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animRef.current);
      } else {
        running = true;
        animRef.current = requestAnimationFrame(loop);
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [canvasRef]);
}
