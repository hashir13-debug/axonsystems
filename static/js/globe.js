/* ====================================================
   AXON SYSTEMS — 3D GLOBE
   Rotating Earth with city connections & atmospheric glow
   ==================================================== */

import * as THREE from 'three';

// ── Build DOM section ─────────────────────────────────────────
const section = document.createElement('section');
section.className = 'globe-section';
section.innerHTML = `
<div class="sec-bg-num">06</div>
<div class="container">
    <div class="section-header gs-reveal">
        <span class="tag mono">// GLOBAL NEURAL NETWORK //</span>
        <h2 class="section-title">WORLDWIDE PRESENCE</h2>
        <p class="section-sub">From our neural core in Karachi, we architect AI solutions across 4 continents — 40+ enterprise clients, zero borders.</p>
    </div>
    <div class="globe-layout">
        <div class="globe-canvas-wrap">
            <canvas id="globe-canvas"></canvas>
            <div class="globe-atmosphere"></div>
            <div class="globe-label mono">AXON GLOBAL MESH</div>
        </div>
        <div class="globe-cities-col">
            <div class="globe-city-list" id="globeCityList"></div>
            <div class="globe-stat-row">
                <div class="globe-stat"><span class="gs-num">40+</span><span class="gs-label">Enterprise Clients</span></div>
                <div class="globe-stat"><span class="gs-num">4</span><span class="gs-label">Continents Served</span></div>
                <div class="globe-stat"><span class="gs-num">12+</span><span class="gs-label">Industries Disrupted</span></div>
            </div>
        </div>
    </div>
</div>`;

const footer = document.querySelector('footer');
if (footer) document.body.insertBefore(section, footer);

// City data
const CITIES = [
    { name: 'KARACHI, PK',    label: 'HQ — NEURAL CORE',  lat: 24.86,  lon:  67.0,  color: 0xff0040, r: 0.028, main: true  },
    { name: 'DUBAI, UAE',      label: 'MENA HUB',           lat: 25.2,   lon:  55.3,  color: 0x00d4ff, r: 0.016, main: false },
    { name: 'LONDON, UK',      label: 'EUROPE OPS',         lat: 51.5,   lon:  -0.1,  color: 0x00d4ff, r: 0.016, main: false },
    { name: 'NEW YORK, USA',   label: 'AMERICAS HUB',       lat: 40.7,   lon: -74.0,  color: 0xffc200, r: 0.016, main: false },
    { name: 'SINGAPORE',       label: 'ASIA PACIFIC',       lat:  1.3,   lon: 103.8,  color: 0x00d4ff, r: 0.016, main: false },
    { name: 'SYDNEY, AU',      label: 'OCEANIA',             lat: -33.9,  lon: 151.2,  color: 0x00ff9d, r: 0.013, main: false },
];

// Populate city list
const cityListEl = document.getElementById('globeCityList');
CITIES.forEach(c => {
    const div = document.createElement('div');
    div.className = 'globe-city-item' + (c.main ? ' gci-main' : '');
    div.innerHTML = `
        <div class="gci-indicator" style="background:#${c.color.toString(16).padStart(6,'0')};box-shadow:0 0 8px #${c.color.toString(16).padStart(6,'0')}"></div>
        <div class="gci-text">
            <span class="gci-name">${c.name}</span>
            <span class="gci-label">${c.label}</span>
        </div>
        ${c.main ? '<span class="gci-badge">HQ</span>' : ''}
    `;
    cityListEl.appendChild(div);
});

// ── Three.js setup ────────────────────────────────────────────
const canvas = document.getElementById('globe-canvas');
if (!canvas) throw new Error('globe-canvas not found');

const GW = () => canvas.parentElement.offsetWidth;
const GH = () => Math.min(GW(), 520);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(GW(), GH());

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, GW()/GH(), 0.1, 100);
camera.position.z = 2.8;

// ── Globe sphere with GLSL shader ─────────────────────────────
const GLOBE_VERT = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;
    void main() {
        vUv     = uv;
        vNormal = normalize(normalMatrix * normal);
        vPos    = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const GLOBE_FRAG = `
    precision highp float;
    uniform float uTime;
    varying vec2  vUv;
    varying vec3  vNormal;

    float h21(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float n(vec2 p){
        vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);
    }
    float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<4;i++){v+=a*n(p);p*=2.;a*=.5;} return v; }

    void main() {
        // Ocean base
        vec3 col = vec3(0.01, 0.03, 0.12);

        // Procedural continents
        float cont = fbm(vUv * 5.0 + vec2(1.3, 0.7));
        float land = smoothstep(0.44, 0.52, cont);
        col = mix(col, vec3(0.04, 0.09, 0.06), land * 0.65);

        // Lat/lon grid lines
        float latLine = smoothstep(0.46, 0.5, 1.0 - abs(fract(vUv.y * 16.0) - 0.5) * 7.0);
        float lonLine = smoothstep(0.46, 0.5, 1.0 - abs(fract(vUv.x * 32.0) - 0.5) * 7.0);
        float grid = clamp(latLine + lonLine, 0.0, 1.0);
        col += grid * vec3(0.0, 0.4, 1.0) * 0.28;

        // Atmospheric rim glow
        float rim = pow(1.0 - clamp(dot(vNormal, vec3(0.,0.,1.)), 0., 1.), 2.8);
        col += rim * vec3(0.0, 0.55, 1.0) * 0.85;

        // Subtle specular highlight
        vec3 lDir = normalize(vec3(-0.4, 0.7, 0.6));
        float spec = pow(max(dot(vNormal, lDir), 0.0), 12.0);
        col += spec * vec3(0.2, 0.5, 1.0) * 0.25;

        // Subtle pulse based on time
        float pulse = 0.03 * sin(uTime * 1.5);
        col += vec3(0., 0., pulse);

        gl_FragColor = vec4(col, 1.0);
    }
`;

const globeUni = { uTime: { value: 0 } };
const globe    = new THREE.Mesh(
    new THREE.SphereGeometry(1, 72, 72),
    new THREE.ShaderMaterial({ uniforms: globeUni, vertexShader: GLOBE_VERT, fragmentShader: GLOBE_FRAG })
);
scene.add(globe);

// ── Atmosphere (outer glow) ───────────────────────────────────
const ATM_FRAG = `
    varying vec3 vNormal;
    void main(){
        float rim = pow(1.0 - clamp(dot(vNormal, vec3(0.,0.,1.)), 0., 1.), 3.5);
        gl_FragColor = vec4(0.0, 0.5, 1.0, rim * 0.55);
    }
`;
scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 32, 32),
    new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `varying vec3 vNormal; void main(){ vNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: ATM_FRAG,
        transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending
    })
));

// ── Lat/lon → 3D position ─────────────────────────────────────
const ll3 = (lat, lon, r = 1) => {
    const phi   = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r  * Math.cos(phi),
        r  * Math.sin(phi) * Math.sin(theta)
    );
};

// ── City dots + pulse rings ───────────────────────────────────
const cityMeshes = [];
CITIES.forEach(c => {
    const pos = ll3(c.lat, c.lon, 1.002);

    // Main dot
    const dot = new THREE.Mesh(
        new THREE.SphereGeometry(c.r, 8, 8),
        new THREE.MeshBasicMaterial({ color: c.color, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    dot.position.copy(pos);
    globe.add(dot);
    cityMeshes.push({ dot, color: c.color, phase: Math.random() * Math.PI * 2 });

    // Outer halo
    const halo = new THREE.Mesh(
        new THREE.RingGeometry(c.r * 2, c.r * 2.5, 20),
        new THREE.MeshBasicMaterial({ color: c.color, side: THREE.DoubleSide, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    halo.position.copy(pos.clone().multiplyScalar(1.001));
    halo.lookAt(new THREE.Vector3(0, 0, 0));
    globe.add(halo);
});

// ── Connection arcs from Karachi to every city ────────────────
const pktAnimators = [];
CITIES.slice(1).forEach(city => {
    const A = ll3(CITIES[0].lat, CITIES[0].lon, 1.004);
    const B = ll3(city.lat, city.lon, 1.004);
    const pts = [];
    for (let i = 0; i <= 48; i++) {
        const t = i / 48;
        const p = new THREE.Vector3().lerpVectors(A, B, t).normalize()
            .multiplyScalar(1.004 + Math.sin(t * Math.PI) * 0.16);
        pts.push(p);
    }
    const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
    globe.add(new THREE.Line(arcGeo,
        new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false })
    ));

    const pkt = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 5, 5),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    globe.add(pkt);
    let pktT = Math.random();
    // Store animator — will be called inside the single globe RAF loop
    pktAnimators.push(() => {
        pktT = (pktT + 0.005) % 1;
        const idx = Math.floor(pktT * (pts.length - 1));
        pkt.position.copy(pts[idx]);
        pkt.material.opacity = Math.sin(pktT * Math.PI) * 0.9;
    });
});

// ── Mouse drag ───────────────────────────────────────────────
let drag = false, lastX = 0, rotY = 0.3;
canvas.addEventListener('mousedown', e => { drag = true; lastX = e.clientX; canvas.style.cursor = 'grabbing'; });
window.addEventListener('mousemove', e => { if (drag) { rotY += (e.clientX - lastX) * 0.006; lastX = e.clientX; } });
window.addEventListener('mouseup', () => { drag = false; canvas.style.cursor = 'grab'; });
canvas.style.cursor = 'grab';

// ── Visibility ───────────────────────────────────────────────
let globeVis = false;
new IntersectionObserver(([e]) => { globeVis = e.isIntersecting; }, { threshold: 0.05 }).observe(section);

// ── Animate ──────────────────────────────────────────────────
let gTime = 0, gFrame = 0;
(function animate() {
    requestAnimationFrame(animate);
    gFrame++;
    if (!globeVis || gFrame % 2 !== 0) return; // 30fps cap
    gTime += 0.024; // doubled since we skip every other frame
    globeUni.uTime.value = gTime;
    if (!drag) rotY += 0.0025;
    globe.rotation.y = rotY;

    // Pulse city dots
    cityMeshes.forEach(({ dot, color, phase }) => {
        dot.material.opacity = 0.7 + 0.3 * Math.sin(gTime * 3 + phase);
        dot.scale.setScalar(1 + 0.15 * Math.sin(gTime * 2.5 + phase));
    });

    // Advance all arc packets inside the single loop (no separate RAF loops)
    pktAnimators.forEach(fn => fn());

    renderer.render(scene, camera);
})();

window.addEventListener('resize', () => {
    camera.aspect = GW() / GH();
    camera.updateProjectionMatrix();
    renderer.setSize(GW(), GH());
}, { passive: true });
