/* ====================================================
   AXON SYSTEMS — $5,000,000,000 THREE.JS SCENE
   True WebGL post-processing: UnrealBloom + Chroma + Grain
   GLSL Nebula Background + Neural Network + Particle Text
   ==================================================== */

import * as THREE from 'three';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass }      from 'three/addons/postprocessing/OutputPass.js';

const canvas = document.getElementById('hero-canvas');
if (!canvas) throw new Error('No hero-canvas');

const W = () => window.innerWidth;
const H = () => window.innerHeight;

// ── RENDERER ──────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(W(), H());
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.toneMapping    = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 1000);
camera.position.z = 38;

// ── GLSL NEBULA BACKGROUND ────────────────────────────────────
const BG_VERT = `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;
const BG_FRAG = `
    uniform float uTime;
    uniform float uScrollY;
    varying vec2 vUv;

    float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

    float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f*f*(3.0-2.0*f);
        float a=h21(i), b=h21(i+vec2(1,0)), c=h21(i+vec2(0,1)), d=h21(i+vec2(1,1));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
    }

    float fbm(vec2 p) {
        float v=0.0, a=0.5;
        for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.0+vec2(1.7,9.2); a*=0.5; }
        return v;
    }

    void main() {
        float t = uTime * 0.055;
        vec2 uv = vUv;

        float n1 = fbm(uv * 3.2 + vec2(t, t*0.55));
        float n2 = fbm(uv * 2.0 - vec2(t*0.35, t*0.8));
        float n3 = fbm(uv * 6.5 + vec2(t*0.18, -t*0.42));

        vec3 void_c   = vec3(0.008, 0.0,  0.015);
        vec3 nebula_r = vec3(0.14,  0.0,  0.04);
        vec3 nebula_p = vec3(0.05,  0.0,  0.12);
        vec3 nebula_c = vec3(0.0,   0.04, 0.10);

        vec3 col = mix(void_c, nebula_p, n1 * 0.75);
        col = mix(col, nebula_r, n2 * 0.45);
        col = mix(col, nebula_c, n3 * n1 * 0.38);

        // energy tendrils
        float tendrils = smoothstep(0.47, 0.53, n1) * 0.18;
        col += vec3(0.9, 0.0, 0.25) * tendrils;

        // gold highlights deep
        float gold = smoothstep(0.52, 0.56, fbm(uv*8.0 - vec2(t*0.3))) * 0.08;
        col += vec3(0.6, 0.3, 0.0) * gold;

        // Scroll-reactive color temperature shift (red→cyan→gold journey)
        float sc = uScrollY;
        vec3 redAcc  = vec3(0.16, 0.0,  0.04);
        vec3 cyanAcc = vec3(0.0,  0.08, 0.18);
        vec3 goldAcc = vec3(0.18, 0.10, 0.0);
        vec3 scrollAccent = sc < 0.45
            ? mix(redAcc, cyanAcc, sc / 0.45)
            : mix(cyanAcc, goldAcc, (sc - 0.45) / 0.55);
        col += scrollAccent * n1 * 0.7;

        // vignette
        vec2 vig = vUv * 2.0 - 1.0;
        col *= 1.0 - dot(vig*0.55, vig*0.55);

        gl_FragColor = vec4(col, 1.0);
    }
`;
const bgUniforms = { uTime: { value: 0 }, uScrollY: { value: 0 } };
window._axonBgUni = bgUniforms; // expose for main.js scroll updates
const bgPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({ uniforms: bgUniforms, vertexShader: BG_VERT, fragmentShader: BG_FRAG, depthTest: false, depthWrite: false })
);
bgPlane.frustumCulled = false;
bgPlane.renderOrder = -1;

// Render bg in its own pass (screen-space)
const bgScene  = new THREE.Scene();
const bgCamera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
bgScene.add(bgPlane);

// ── STAR FIELD ────────────────────────────────────────────────
const STAR_N = 700;
const starPos = new Float32Array(STAR_N * 3);
for (let i = 0; i < STAR_N; i++) {
    starPos[i*3]   = (Math.random()-0.5)*140;
    starPos[i*3+1] = (Math.random()-0.5)*90;
    starPos[i*3+2] = (Math.random()-0.5)*60 - 15;
}
const starGeom = new THREE.BufferGeometry();
starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
scene.add(new THREE.Points(starGeom,
    new THREE.PointsMaterial({ color:0xffffff, size:0.065, transparent:true, opacity:0.55,
        blending: THREE.AdditiveBlending, depthWrite:false })));

// ── FLOATING 3D WIREFRAME GEOMETRY ───────────────────────────
const geoShapes = [];
[
    { geo: new THREE.IcosahedronGeometry(2.4, 1), pos: [-19,  8, -8],  col: 0xff0040, spd: [0.003,0.005,0.002] },
    { geo: new THREE.OctahedronGeometry(2.0, 0),  pos: [ 21, -7,-12],  col: 0x00d4ff, spd: [0.006,0.002,0.004] },
    { geo: new THREE.TetrahedronGeometry(1.7, 0), pos: [-13,-11, -5],  col: 0xff0040, spd: [0.004,0.007,0.003] },
    { geo: new THREE.IcosahedronGeometry(1.5, 0), pos: [ 17, 10,-15],  col: 0xffc200, spd: [0.005,0.003,0.006] },
    { geo: new THREE.OctahedronGeometry(1.3, 0),  pos: [  0,-14, -6],  col: 0x00ff9d, spd: [0.007,0.004,0.005] },
].forEach(({ geo, pos, col, spd }) => {
    const mesh = new THREE.Mesh(geo,
        new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true,
            opacity: 0.11, blending: THREE.AdditiveBlending, depthWrite: false }));
    mesh.position.set(...pos);
    mesh.userData.spd = spd;
    scene.add(mesh);
    geoShapes.push(mesh);
});

// ── NEURAL NODES ─────────────────────────────────────────────
const NODE_N = 140;
const nodes  = [];
const nodeGroup = new THREE.Group();
const smallG  = new THREE.SphereGeometry(0.11, 7, 7);
const hubG    = new THREE.SphereGeometry(0.22, 9, 9);

for (let i = 0; i < NODE_N; i++) {
    const isHub  = Math.random() < 0.15;
    const isCyan = Math.random() < 0.35;
    const col    = isCyan ? 0x00d4ff : 0xff0040;
    const mat    = new THREE.MeshBasicMaterial({
        color: col, transparent: true,
        opacity: isHub ? 0.95 : 0.55 + Math.random()*0.4,
        blending: THREE.AdditiveBlending, depthWrite: false
    });
    const mesh = new THREE.Mesh(isHub ? hubG : smallG, mat);
    const theta = Math.random()*Math.PI*2;
    const phi   = Math.acos(2*Math.random()-1);
    const r     = 12 + Math.random()*18;
    mesh.position.set(
        r*Math.sin(phi)*Math.cos(theta),
        r*Math.sin(phi)*Math.sin(theta)*0.65,
        (Math.random()-0.5)*22
    );
    mesh.userData = {
        ox: mesh.position.x, oy: mesh.position.y, oz: mesh.position.z,
        vx: (Math.random()-0.5)*0.012, vy: (Math.random()-0.5)*0.012,
        vz: (Math.random()-0.5)*0.006, phase: Math.random()*Math.PI*2, hub: isHub
    };
    nodes.push(mesh); nodeGroup.add(mesh);
}
scene.add(nodeGroup);

// ── CONNECTIONS ───────────────────────────────────────────────
const lineGroup  = new THREE.Group();
const connections = [];
const MAX_DIST   = 9, MAX_CONN = 160;
for (let i = 0; i < NODE_N && connections.length < MAX_CONN; i++) {
    for (let j = i+1; j < NODE_N && connections.length < MAX_CONN; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < MAX_DIST) {
            const op  = (1 - d/MAX_DIST) * 0.28;
            const col = nodes[i].material.color.r < 0.5 ? 0x00d4ff : 0xff0040;
            const g   = new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(), nodes[j].position.clone()]);
            const m   = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op,
                blending: THREE.AdditiveBlending, depthWrite: false });
            const l   = new THREE.Line(g, m);
            lineGroup.add(l);
            connections.push({ line: l, i, j, baseOp: op });
        }
    }
}
scene.add(lineGroup);

// ── DATA PACKETS ──────────────────────────────────────────────
const PKT_N  = 14;
const packets = [];
const pktG   = new THREE.SphereGeometry(0.14, 5, 5);
for (let k = 0; k < PKT_N; k++) {
    const ci = Math.floor(Math.random()*connections.length);
    const m  = new THREE.MeshBasicMaterial({
        color: k%2===0 ? 0xff0040 : 0x00d4ff,
        transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false
    });
    const mesh = new THREE.Mesh(pktG, m);
    mesh.userData = { ci, t: Math.random(), speed: 0.005 + Math.random()*0.007 };
    packets.push(mesh); scene.add(mesh);
}

// ── PARTICLE TEXT "AXON" FORMATION ────────────────────────────
const PT_N = 1100;
const ptCur = new Float32Array(PT_N*3);
const ptTgt = new Float32Array(PT_N*3);

// Sample "AXON" text positions from offscreen canvas
const oc   = document.createElement('canvas');
oc.width   = 800; oc.height = 220;
const oc2d = oc.getContext('2d');
oc2d.fillStyle = '#fff';
oc2d.font = '900 185px "Bebas Neue", Impact, sans-serif';
oc2d.textAlign = 'center';
oc2d.textBaseline = 'middle';
oc2d.fillText('AXON', 400, 110);
const px = oc2d.getImageData(0, 0, 800, 220).data;
const textPts = [];
for (let x = 0; x < 800; x += 5) {
    for (let y = 0; y < 220; y += 5) {
        const idx = (y*800+x)*4;
        if (px[idx+3] > 100) textPts.push({ tx: (x/800-0.5)*48, ty: -(y/220-0.5)*13 });
    }
}

// Init particles scattered randomly
for (let i = 0; i < PT_N; i++) {
    ptCur[i*3]   = ptTgt[i*3]   = (Math.random()-0.5)*90;
    ptCur[i*3+1] = ptTgt[i*3+1] = (Math.random()-0.5)*55;
    ptCur[i*3+2] = ptTgt[i*3+2] = (Math.random()-0.5)*25 - 8;
}
const ptGeom = new THREE.BufferGeometry();
ptGeom.setAttribute('position', new THREE.BufferAttribute(ptCur, 3));
const ptMat = new THREE.PointsMaterial({
    color: 0xff0040, size: 0.18, transparent: true, opacity: 0.92,
    blending: THREE.AdditiveBlending, depthWrite: false
});
const ptMesh = new THREE.Points(ptGeom, ptMat);
ptMesh.position.z = 5;
scene.add(ptMesh);

// Text formation state machine
let ptPhase = 0, ptFrame = 0;
// Phase 0 → wait ~2s then converge
// Phase 1 → lerp to text (120f)
// Phase 2 → hold (150f)
// Phase 3 → lerp scatter (100f)
// Phase 4 → done (opacity→0)

const setTextTargets = () => {
    for (let i = 0; i < PT_N; i++) {
        const tp = textPts[i % textPts.length];
        ptTgt[i*3]   = tp.tx + (Math.random()-0.5)*0.6;
        ptTgt[i*3+1] = tp.ty + (Math.random()-0.5)*0.6;
        ptTgt[i*3+2] = (Math.random()-0.5)*3;
    }
};
const setScatterTargets = () => {
    for (let i = 0; i < PT_N; i++) {
        ptTgt[i*3]   = (Math.random()-0.5)*90;
        ptTgt[i*3+1] = (Math.random()-0.5)*55;
        ptTgt[i*3+2] = (Math.random()-0.5)*25 - 8;
    }
};

const updateParticleText = () => {
    ptFrame++;
    if (ptPhase === 0 && ptFrame > 65) {
        setTextTargets(); ptPhase = 1; ptFrame = 0; ptMat.color.setHex(0xff0040);
    } else if (ptPhase === 1) {
        for (let i = 0; i < PT_N*3; i++) ptCur[i] += (ptTgt[i]-ptCur[i])*0.055;
        ptGeom.attributes.position.needsUpdate = true;
        if (ptFrame > 130) { ptPhase = 2; ptFrame = 0; }
    } else if (ptPhase === 2 && ptFrame > 160) {
        setScatterTargets(); ptPhase = 3; ptFrame = 0;
    } else if (ptPhase === 3) {
        for (let i = 0; i < PT_N*3; i++) ptCur[i] += (ptTgt[i]-ptCur[i])*0.038;
        ptGeom.attributes.position.needsUpdate = true;
        ptMat.opacity = Math.max(0, ptMat.opacity - 0.005);
        if (ptFrame > 120 || ptMat.opacity <= 0) { ptPhase = 4; ptMat.opacity = 0; scene.remove(ptMesh); }
    }
};

// ── POST-PROCESSING PIPELINE ──────────────────────────────────
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(new THREE.Vector2(Math.round(W()/2), Math.round(H()/2)), 1.35, 0.55, 0.0);
composer.addPass(bloomPass);

// Chromatic aberration shader
const ChromaShader = {
    uniforms: { tDiffuse: { value: null }, uAmount: { value: 0.0022 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uAmount;
        varying vec2 vUv;
        void main(){
            vec2 dir = normalize(vUv - 0.5);
            float d   = length(vUv - 0.5);
            float off = uAmount * d * d * 2.0;
            float r = texture2D(tDiffuse, vUv + dir*off).r;
            float g = texture2D(tDiffuse, vUv).g;
            float b = texture2D(tDiffuse, vUv - dir*off).b;
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `
};
const chromaPass = new ShaderPass(ChromaShader);
composer.addPass(chromaPass);
window._axonChromaPass = chromaPass; // exposed for scroll-reactive chroma

// Film grain shader
const GrainShader = {
    uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uStrength: { value: 0.045 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uStrength;
        varying vec2 vUv;
        float rand(vec2 co){ return fract(sin(dot(co*uTime,vec2(12.9898,78.233)))*43758.5453); }
        void main(){
            vec4 col = texture2D(tDiffuse, vUv);
            float grain = rand(vUv) * uStrength - uStrength*0.5;
            col.rgb += grain;
            gl_FragColor = col;
        }
    `
};
const grainPass = new ShaderPass(GrainShader);
composer.addPass(grainPass);

composer.addPass(new OutputPass());

// ── MOUSE ─────────────────────────────────────────────────────
let mx = 0, my = 0, camTX = 0, camTY = 0;
document.addEventListener('mousemove', e => {
    mx = (e.clientX/W()-0.5)*2;
    my = -(e.clientY/H()-0.5)*2;
}, { passive: true });

// ── VISIBILITY PAUSE ──────────────────────────────────────────
let heroVis = true;
const heroEl = document.querySelector('.hero');
if (heroEl) new IntersectionObserver(([e])=>{ heroVis=e.isIntersecting; }, { threshold:0 }).observe(heroEl);

// ── ANIMATION LOOP ────────────────────────────────────────────
let clock = new THREE.Clock();
let frame = 0;
const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3();

function animate() {
    requestAnimationFrame(animate);
    if (!heroVis) return;
    frame++;
    if (frame % 2 !== 0) return; // 30fps cap

    const t = clock.getElapsedTime();
    bgUniforms.uTime.value = t;
    grainPass.uniforms.uTime.value = t * 3.7;

    // Cursor force field — nodes repel/attract to mouse in 3D space
    const cursor3D = new THREE.Vector3(mx*20, my*13, 0);
    nodes.forEach(n => {
        const dist = n.position.distanceTo(cursor3D);
        if (dist < 11 && dist > 0.01) {
            const force = ((11 - dist) / 11) * 0.14;
            const dir = n.position.clone().sub(cursor3D).normalize();
            n.userData.vx += dir.x * force;
            n.userData.vy += dir.y * force;
            n.userData.vz += dir.z * force * 0.4;
        }
    });

    // Animate nodes
    nodes.forEach(n => {
        const d = n.userData;
        // Velocity damping
        d.vx *= 0.94; d.vy *= 0.94; d.vz *= 0.94;
        n.position.x += d.vx + (d.ox - n.position.x)*0.003;
        n.position.y += d.vy + (d.oy - n.position.y)*0.003;
        n.position.z += d.vz + (d.oz - n.position.z)*0.003;
        if (d.hub) n.material.opacity = 0.6 + 0.4*Math.sin(t*2+d.phase);
    });

    // Update connection line endpoints
    connections.forEach(c => {
        const pos = c.line.geometry.attributes.position;
        tmpA.copy(nodes[c.i].position); tmpB.copy(nodes[c.j].position);
        pos.setXYZ(0, tmpA.x, tmpA.y, tmpA.z);
        pos.setXYZ(1, tmpB.x, tmpB.y, tmpB.z);
        pos.needsUpdate = true;
    });

    // Animate packets
    packets.forEach(p => {
        const d = p.userData;
        d.t += d.speed;
        if (d.t > 1) { d.t=0; d.ci=Math.floor(Math.random()*connections.length); }
        const c = connections[d.ci];
        if (!c) return;
        p.position.lerpVectors(nodes[c.i].position, nodes[c.j].position, d.t);
        p.material.opacity = Math.sin(d.t*Math.PI)*0.95;
    });

    // Camera parallax
    camTX = mx*6; camTY = my*4;
    camera.position.x += (camTX - camera.position.x)*0.022;
    camera.position.y += (camTY - camera.position.y)*0.022;
    camera.lookAt(0, 0, 0);

    // Slow rotation
    nodeGroup.rotation.y = t*0.07;
    lineGroup.rotation.y = t*0.07;

    // Rotate + breathe wireframe shapes
    geoShapes.forEach(s => {
        s.rotation.x += s.userData.spd[0];
        s.rotation.y += s.userData.spd[1];
        s.rotation.z += s.userData.spd[2];
        s.material.opacity = 0.07 + 0.07 * Math.sin(t * 0.7 + s.position.x * 0.2);
    });

    // Particle text animation
    if (ptPhase < 4) updateParticleText();

    // Render nebula bg first
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(bgScene, bgCamera);

    // Then compose main scene with post-processing
    composer.render();
    renderer.autoClear = true;
}
animate();

// ── NEURAL PULSE ON CLICK ─────────────────────────────────────
canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width  * 2 - 1) * 20;
    const cy = -((e.clientY - rect.top)  / rect.height * 2 - 1) * 13;
    const origin = new THREE.Vector3(cx, cy, 0);
    let pulseR = 0;
    const expand = setInterval(() => {
        pulseR += 0.65;
        nodes.forEach(n => {
            const d = n.position.distanceTo(origin);
            const ring = Math.abs(d - pulseR);
            if (ring < 2.8) {
                const f = (2.8 - ring) / 2.8 * 0.55;
                const dir = n.position.clone().sub(origin).normalize();
                n.userData.vx += dir.x * f;
                n.userData.vy += dir.y * f;
                n.material.opacity = Math.min(1, n.material.opacity + 0.3);
            }
        });
        if (pulseR > 30) clearInterval(expand);
    }, 14);
});

// ── CONNECTION SHIMMER (lightning flash) ─────────────────────
setInterval(() => {
    if (!heroVis || !connections.length) return;
    const c = connections[Math.floor(Math.random()*connections.length)];
    const origOp = c.baseOp;
    const origColor = c.line.material.color.getHex();
    c.line.material.opacity = Math.min(1, origOp * 5);
    c.line.material.color.setHex(0xffffff);
    setTimeout(() => {
        c.line.material.opacity = origOp;
        c.line.material.color.setHex(origColor);
    }, 180);
}, 280);

// Expose bgUni ref already set above
// Expose chromaPass for scroll-reactive distortion (set above)

// ── RESIZE ────────────────────────────────────────────────────
window.addEventListener('resize', () => {
    camera.aspect = W()/H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
    composer.setSize(W(), H());
    bloomPass.resolution.set(W(), H());
}, { passive: true });
