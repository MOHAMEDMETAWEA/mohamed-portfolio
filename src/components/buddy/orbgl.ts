// Small WebGL sphere for Hamo: reflections, rim light, glow, orbiting specks, pointer parallax,
// pulse while speaking. Loaded lazily; returns null when WebGL is unavailable.
const VS = "attribute vec2 a;varying vec2 v;void main(){v=a*0.5+0.5;gl_Position=vec4(a,0.,1.);}";
const FS = `precision mediump float;varying vec2 v;uniform float uT,uAmp;uniform vec2 uP;
void main(){
  vec2 p=(v-0.5)*2.0; float R=0.70+0.025*uAmp; float r=length(p);
  vec3 col=vec3(0.); float a=0.;
  float g=exp(-pow(max(r-R,0.)*3.0,1.3))*(0.30+0.45*uAmp);
  vec3 gc=mix(vec3(0.22,0.74,0.97),vec3(0.2,0.85,0.6),clamp(uAmp*1.5,0.,1.));
  col=gc*g; a=g*0.9;
  if(r<R){
    vec2 q=p/R; float z=sqrt(max(1.-dot(q,q),0.));
    vec3 n=normalize(vec3(q,z)); n=normalize(n+vec3(uP*0.22,0.));
    float fr=pow(1.-n.z,2.4);
    vec3 rf=reflect(vec3(0.,0.,-1.),n);
    float h=rf.y*0.5+0.5;
    vec3 env=mix(vec3(0.07,0.09,0.15),vec3(0.72,0.84,0.95),smoothstep(0.15,1.,h));
    env+=vec3(0.95)*smoothstep(0.80,0.95,dot(rf,normalize(vec3(-0.5+uP.x*0.35,0.7-uP.y*0.35,0.6))));
    env+=vec3(0.30,0.60,0.95)*0.55*smoothstep(0.65,1.,dot(rf,normalize(vec3(0.6,-0.5,0.5))));
    float sw=sin(n.x*4.+uT*0.6)+sin(n.y*5.-uT*0.5);
    vec3 ir=0.5+0.5*cos(6.28*(vec3(0.,0.33,0.67)+sw*0.08+fr));
    col=env*0.85+ir*0.18*(0.4+fr)+vec3(0.3,0.8,1.)*fr*0.75;
    col+=vec3(0.15,0.9,0.6)*uAmp*0.4*(1.-fr);
    col*=0.92+0.08*sin(uT*1.5);
    a=smoothstep(R,R-0.025,r);
  }
  for(int i=0;i<5;i++){
    float fi=float(i); float ang=uT*(0.5+0.17*fi)+fi*1.26;
    float rad=0.90+0.04*sin(uT*0.9+fi);
    vec2 pp=vec2(cos(ang),sin(ang)*0.42)*rad; float c=cos(0.5+fi*0.3),s=sin(0.5+fi*0.3);
    pp=vec2(c*pp.x-s*pp.y,s*pp.x+c*pp.y);
    float front=step(0.,sin(ang)); float d=length(p-pp);
    float m=smoothstep(0.045,0.,d)*(r>R?1.:front);
    col+=vec3(0.65,0.95,1.)*m; a=max(a,m);
  }
  gl_FragColor=vec4(col*a/max(a,0.001)*min(a,1.),min(a,1.));
}`;
export function startOrb(canvas: HTMLCanvasElement, isTalking: () => boolean, onFail: () => void): (() => void) | null {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(96 * dpr); canvas.height = Math.round(96 * dpr);
  const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; };
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const pr = gl.createProgram()!; gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uT = gl.getUniformLocation(pr, "uT"), uAmp = gl.getUniformLocation(pr, "uAmp"), uP = gl.getUniformLocation(pr, "uP");
  gl.viewport(0, 0, canvas.width, canvas.height);
  let px = 0, py = 0, tx = 0, ty = 0, amp = 0, raf = 0, last = 0, slow = 0, frames = 0, visible = true, dead = false;
  const move = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 240);
    tx = (dx / d) * k; ty = (dy / d) * k;
  };
  window.addEventListener("pointermove", move, { passive: true });
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf && !dead) raf = requestAnimationFrame(frame); });
  io.observe(canvas);
  const t0 = performance.now();
  function frame(now: number) {
    raf = 0;
    if (dead || document.hidden || !visible) return;
    const dt = last ? now - last : 16; last = now;
    frames++;
    if (frames > 30 && frames <= 120 && dt > 40) slow++;
    if (frames === 120 && slow > 40) { stop(); onFail(); return; }
    px += (tx - px) * 0.12; py += (ty - py) * 0.12;
    const tt = (now - t0) / 1000;
    const want = isTalking() ? 0.35 + 0.35 * Math.abs(Math.sin(tt * 9)) * (0.6 + 0.4 * Math.sin(tt * 3.1)) : 0.06 + 0.05 * Math.sin(tt * 1.6);
    amp += (want - amp) * 0.25;
    gl!.uniform1f(uT, tt); gl!.uniform1f(uAmp, amp); gl!.uniform2f(uP, px, py);
    gl!.clearColor(0, 0, 0, 0); gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(frame);
  }
  const vis = () => { if (!document.hidden && !raf && !dead) { last = 0; raf = requestAnimationFrame(frame); } };
  document.addEventListener("visibilitychange", vis);
  function stop() {
    dead = true; if (raf) cancelAnimationFrame(raf); io.disconnect();
    window.removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", vis);
  }
  raf = requestAnimationFrame(frame);
  return stop;
}
