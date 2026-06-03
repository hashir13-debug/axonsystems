/* ====================================================
   AXON SYSTEMS — NEXT LEVEL JS
   Three.js 3D Neural Network + All Interactions
   ==================================================== */

// ============================================================
// MAGNETIC BLOB CURSOR
// ============================================================
(function initBlobCursor() {
    const blob   = document.getElementById('blob-cursor');
    const dot    = document.getElementById('blob-dot');
    if (!blob || !dot) return;

    let blobX = -200, blobY = -200;
    let mouseX = -200, mouseY = -200;
    let rafId;

    // smooth lag follow
    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
        blobX = lerp(blobX, mouseX, 0.1);
        blobY = lerp(blobY, mouseY, 0.1);
        blob.style.left = blobX + 'px';
        blob.style.top  = blobY + 'px';
        rafId = requestAnimationFrame(animate);
    }
    animate();

    // dot follows exactly (no lag)
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';
    }, { passive: true });

    // hide when mouse leaves window
    document.addEventListener('mouseleave', () => { blob.classList.add('blob-hidden'); dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { blob.classList.remove('blob-hidden'); dot.style.opacity = '1'; });

    // state: buttons & links
    const btnSels = 'a, button, .quick-reply, .pc-btn, .pricing-toggle, .sn-dot, .chat-toggle, .faq-q';
    document.querySelectorAll(btnSels).forEach(el => {
        el.addEventListener('mouseenter', () => { blob.classList.add('blob-hover'); blob.classList.remove('blob-card'); dot.style.opacity = '0'; });
        el.addEventListener('mouseleave', () => { blob.classList.remove('blob-hover'); dot.style.opacity = '1'; });
    });

    // state: cards
    const cardSels = '.service-card, .port-card, .why-card, .testimo-card, .pricing-card';
    document.querySelectorAll(cardSels).forEach(el => {
        el.addEventListener('mouseenter', () => { blob.classList.add('blob-card'); blob.classList.remove('blob-hover'); dot.style.opacity = '0'; });
        el.addEventListener('mouseleave', () => { blob.classList.remove('blob-card'); dot.style.opacity = '1'; });
    });

    // magnetic pull on buttons
    document.querySelectorAll('.btn-primary, .btn-contact, .pc-btn-primary, .btn-submit').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width  / 2);
            const dy = e.clientY - (rect.top  + rect.height / 2);
            mouseX = e.clientX - dx * 0.25;
            mouseY = e.clientY - dy * 0.25;
        });
        el.addEventListener('mouseleave', () => { mouseX = blobX; mouseY = blobY; });
    });

    // click squish
    document.addEventListener('mousedown', () => {
        blob.style.transform = 'translate(-50%, -50%) scale(0.82)';
    });
    document.addEventListener('mouseup', () => {
        blob.style.transform = 'translate(-50%, -50%) scale(1)';
    });
})();

// ============================================================
// LOADER
// ============================================================
(function () {
    const loader = document.getElementById('axon-loader');
    const fill = document.getElementById('loader-fill');
    const statusEl = document.getElementById('loader-status');
    if (!loader) return;
    const statuses = ['INITIALIZING NEURAL CORE...','LOADING AI AGENTS...','CALIBRATING SYSTEMS...','ESTABLISHING SECURE LINK...','READY'];
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 18 + 6;
        if (progress > 100) progress = 100;
        fill.style.width = progress + '%';
        const idx = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
        statusEl.textContent = statuses[idx];
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(() => loader.remove(), 650);
            }, 450);
        }
    }, 110);
})();

// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================
let lenis = null;
(function initLenis() {
    if (typeof Lenis === 'undefined') return;
    try {
        lenis = new Lenis({ duration: 0.9, easing: t => 1 - Math.pow(1 - t, 3), smoothWheel: true, smoothTouch: false });
        const tryWire = () => {
            if (window.gsap && window.ScrollTrigger) {
                gsap.ticker.add(time => lenis.raf(time * 1000));
                gsap.ticker.lagSmoothing(0);
                lenis.on('scroll', () => ScrollTrigger.update());
            } else { setTimeout(tryWire, 80); }
        };
        tryWire();
    } catch (e) { console.warn('Lenis init failed', e); }
})();

// THREE.JS handled by three-scene.js (ES module with UnrealBloom + GLSL)

(function initThreeJS_DISABLED() { return; // kept for reference only
(function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !window.THREE) return;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    // Bloom canvas (fake post-processing via canvas copy + CSS blur+screen)
    const bloomCanvas = document.getElementById('hero-canvas-bloom');
    let bloomCtx = null;
    if (bloomCanvas) {
        bloomCanvas.width = W();
        bloomCanvas.height = H();
        bloomCtx = bloomCanvas.getContext('2d');
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 1000);
    camera.position.z = 38;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── PARTICLES (star field background) ──
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3]     = (Math.random() - 0.5) * 120;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }
    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.35 });
    scene.add(new THREE.Points(starGeom, starMat));

    // ── NEURAL NODES ──
    const NODE_COUNT = 140;
    const nodes = [];
    const nodeGroup = new THREE.Group();
    const smallGeom = new THREE.SphereGeometry(0.1, 6, 6);
    const hubGeom = new THREE.SphereGeometry(0.2, 8, 8);

    for (let i = 0; i < NODE_COUNT; i++) {
        const isHub = Math.random() < 0.15;
        const isBlue = Math.random() < 0.35;
        const color = isBlue ? 0x00d4ff : 0xff0040;
        const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: isHub ? 0.9 : 0.5 + Math.random() * 0.4 });
        const mesh = new THREE.Mesh(isHub ? hubGeom : smallGeom, mat);

        // Distribute across a wide 3D ellipsoid volume
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 12 + Math.random() * 18;
        mesh.position.set(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta) * 0.65,
            (Math.random() - 0.5) * 22
        );
        mesh.userData = {
            origX: mesh.position.x,
            origY: mesh.position.y,
            origZ: mesh.position.z,
            vx: (Math.random() - 0.5) * 0.012,
            vy: (Math.random() - 0.5) * 0.012,
            vz: (Math.random() - 0.5) * 0.006,
            phase: Math.random() * Math.PI * 2,
            hub: isHub
        };
        nodes.push(mesh);
        nodeGroup.add(mesh);
    }
    scene.add(nodeGroup);

    // ── CONNECTIONS ──
    const lineGroup = new THREE.Group();
    const connections = [];
    const MAX_DIST = 9;
    const MAX_CONNECTIONS = 320;

    for (let i = 0; i < NODE_COUNT && connections.length < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < NODE_COUNT && connections.length < MAX_CONNECTIONS; j++) {
            const dx = nodes[i].position.x - nodes[j].position.x;
            const dy = nodes[i].position.y - nodes[j].position.y;
            const dz = nodes[i].position.z - nodes[j].position.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist < MAX_DIST) {
                const opacity = (1 - dist / MAX_DIST) * 0.22;
                const isBlueConn = nodes[i].material.color.r < 0.5;
                const color = isBlueConn ? 0x00d4ff : 0xff0040;
                const pts = [nodes[i].position.clone(), nodes[j].position.clone()];
                const geom = new THREE.BufferGeometry().setFromPoints(pts);
                const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
                const line = new THREE.Line(geom, mat);
                lineGroup.add(line);
                connections.push({ line, i, j, baseOpacity: opacity });
            }
        }
    }
    scene.add(lineGroup);

    // ── DATA PACKETS ──
    const packetCount = 12;
    const packets = [];
    const packetGeom = new THREE.SphereGeometry(0.12, 4, 4);

    for (let k = 0; k < packetCount; k++) {
        const connIdx = Math.floor(Math.random() * connections.length);
        const mat = new THREE.MeshBasicMaterial({
            color: k % 2 === 0 ? 0xff0040 : 0x00d4ff,
            transparent: true, opacity: 0.9
        });
        mat.color.r = k % 2 === 0 ? 1 : 0;
        const mesh = new THREE.Mesh(packetGeom, mat);
        mesh.userData = { connIdx, t: Math.random(), speed: 0.004 + Math.random() * 0.006 };
        packets.push(mesh);
        scene.add(mesh);
    }

    // ── MOUSE TRACKING ──
    let mouseX = 0, mouseY = 0;
    let targetCamX = 0, targetCamY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / W() - 0.5) * 2;
        mouseY = -(e.clientY / H() - 0.5) * 2;
    }, { passive: true });

    // ── VISIBILITY PAUSE ──
    let heroVisible = true;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }, { threshold: 0 }).observe(heroSection);
    }

    let time = 0;
    let frameSkip = 0;

    function animate() {
        requestAnimationFrame(animate);
        if (!heroVisible) return;
        frameSkip++;
        if (frameSkip % 2 !== 0) return; // 30fps cap
        time += 0.01;

        // ── Animate nodes ──
        nodes.forEach(node => {
            const ud = node.userData;
            node.position.x += ud.vx;
            node.position.y += ud.vy;
            node.position.z += ud.vz;
            // Spring back
            node.position.x += (ud.origX - node.position.x) * 0.003;
            node.position.y += (ud.origY - node.position.y) * 0.003;
            node.position.z += (ud.origZ - node.position.z) * 0.003;
            // Pulse opacity
            if (ud.hub) {
                node.material.opacity = 0.6 + 0.4 * Math.sin(time * 2 + ud.phase);
            }
        });

        // ── Update connection lines ──
        connections.forEach(conn => {
            const pos = conn.line.geometry.attributes.position;
            const a = nodes[conn.i].position;
            const b = nodes[conn.j].position;
            pos.setXYZ(0, a.x, a.y, a.z);
            pos.setXYZ(1, b.x, b.y, b.z);
            pos.needsUpdate = true;
        });

        // ── Animate data packets ──
        packets.forEach(packet => {
            const ud = packet.userData;
            ud.t += ud.speed;
            if (ud.t > 1) {
                ud.t = 0;
                ud.connIdx = Math.floor(Math.random() * connections.length);
            }
            const conn = connections[ud.connIdx];
            if (!conn) return;
            const a = nodes[conn.i].position;
            const b = nodes[conn.j].position;
            packet.position.lerpVectors(a, b, ud.t);
            packet.material.opacity = Math.sin(ud.t * Math.PI) * 0.9;
        });

        // ── Camera parallax ──
        targetCamX = mouseX * 6;
        targetCamY = mouseY * 4;
        camera.position.x += (targetCamX - camera.position.x) * 0.025;
        camera.position.y += (targetCamY - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);

        // ── Slow group rotation ──
        nodeGroup.rotation.y = time * 0.08;
        lineGroup.rotation.y = time * 0.08;

        renderer.render(scene, camera);

        // Copy to bloom canvas every frame (fake HDR bloom)
        if (bloomCtx && bloomCanvas) {
            bloomCtx.clearRect(0, 0, bloomCanvas.width, bloomCanvas.height);
            bloomCtx.drawImage(canvas, 0, 0);
        }
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
        renderer.setSize(W(), H());
    }, { passive: true });
})(); })(); // close disabled wrapper

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // ── DUAL CURSOR ──
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const glow = document.getElementById('cursor-glow');
    let dotX = -100, dotY = -100, ringX = -100, ringY = -100;
    let pendingDot = false, pendingRing = false;

    document.addEventListener('mousemove', e => {
        dotX = e.clientX; dotY = e.clientY;
        if (!pendingDot) {
            pendingDot = true;
            requestAnimationFrame(() => {
                // cursor-dot hidden via CSS — only update glow spotlight
                if (glow) {
                    glow.style.background = `radial-gradient(700px circle at ${dotX}px ${dotY}px, rgba(255,0,64,0.07) 0%, rgba(0,212,255,0.035) 38%, transparent 65%)`;
                }
                pendingDot = false;
            });
        }
    }, { passive: true });

    (function ringFollow() {
        if (ring) {
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
        }
        if (glow && window.gsap) {
            gsap.set(glow, { x: dotX, y: dotY });
        }
        requestAnimationFrame(ringFollow);
    })();

    // ── CURSOR PARTICLE TRAIL (disabled) ──
    const TRAIL_N = 0;
    const trailDots = Array.from({length: TRAIL_N}, (_, i) => {
        const el = document.createElement('div');
        el.className = 'cursor-trail';
        const size = Math.max(1.5, 5 - i * 0.17);
        const frac = 1 - i / TRAIL_N;
        el.style.width  = size + 'px';
        el.style.height = size + 'px';
        el.style.opacity = frac * 0.85;
        // White micro-halo on first 5 particles so trail stays visible on any bg
        const halo = i < 5 ? `, 0 0 0 1.2px rgba(255,255,255,0.55)` : '';
        if (i < 7)       { el.style.background = 'var(--red)';  el.style.boxShadow = `0 0 ${6+i}px var(--red-glow)${halo}`; }
        else if (i < 14) { el.style.background = 'var(--cyan)'; el.style.boxShadow = `0 0 ${6+i}px var(--cyan-glow)`; }
        else             { el.style.background = 'var(--gold)'; el.style.boxShadow = `0 0 ${6+i}px rgba(255,194,0,0.5)`; }
        document.body.appendChild(el);
        return { el, x: -300, y: -300 };
    });

    (function animateTrail() {
        trailDots.forEach((td, i) => {
            const src = i === 0 ? { x: dotX, y: dotY } : trailDots[i - 1];
            td.x += (src.x - td.x) * 0.33;
            td.y += (src.y - td.y) * 0.33;
            td.el.style.left = td.x + 'px';
            td.el.style.top  = td.y + 'px';
        });
        requestAnimationFrame(animateTrail);
    })();

    // Ring expand on interactive elements
    document.querySelectorAll('a, button, .service-card, .port-card, .why-card, .quick-reply, .satellite-node').forEach(el => {
        el.addEventListener('mouseenter', () => ring?.classList.add('expanded'), { passive: true });
        el.addEventListener('mouseleave', () => ring?.classList.remove('expanded'), { passive: true });
    });

    // ── CURSOR CANVAS FX (click sparks + ripple) ──
    (function initCursorFX() {
        const cnv = document.createElement('canvas');
        cnv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999990;';
        document.body.appendChild(cnv);
        const ctx = cnv.getContext('2d');
        let W, H, mx = -300, my = -300;
        const sparks = [], ripples = [];
        const resize = () => { W = cnv.width = window.innerWidth; H = cnv.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize, { passive: true });
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
        document.addEventListener('click', e => {
            for (let i = 0; i < 10; i++) {
                const a = (i / 10) * Math.PI * 2;
                const spd = Math.random() * 2.8 + 1.2;
                sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 1, life: 1 });
            }
            ripples.push({ x: e.clientX, y: e.clientY, r: 1, a: 0.65 });
        });
        let f = 0;
        (function draw() {
            f++;
            requestAnimationFrame(draw);
            if (f % 2 !== 0 && sparks.length === 0 && ripples.length === 0) return;
            ctx.clearRect(0, 0, W, H);
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.x += s.vx; s.y += s.vy; s.vy += 0.12; s.life -= 0.042;
                if (s.life <= 0) { sparks.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.life * 2.2, 0, 6.2832);
                ctx.fillStyle = `rgba(255,${60 + s.life * 100},0,${s.life * 0.9})`;
                ctx.fill();
            }
            for (let i = ripples.length - 1; i >= 0; i--) {
                const rp = ripples[i];
                rp.r += 2.2; rp.a -= 0.035;
                if (rp.a <= 0) { ripples.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.r, 0, 6.2832);
                ctx.strokeStyle = `rgba(255,51,51,${rp.a})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }
        })();
    })();

    // ── SPLIT TEXT HERO ──
    (function splitHeroTitles() {
        document.querySelectorAll('.split-title').forEach(title => {
            const text = title.textContent;
            const data = title.getAttribute('data-text');
            title.textContent = '';
            for (let i = 0; i < text.length; i++) {
                const ch = text[i];
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = ch === ' ' ? ' ' : ch;
                span.style.cssText = 'display:inline-block;opacity:0;transform:translateY(80px) rotateX(-80deg);';
                title.appendChild(span);
            }
            if (data) title.setAttribute('data-text', data);
        });
        const animate = () => {
            const titles = document.querySelectorAll('.split-title');
            if (window.gsap) {
                titles.forEach((title, ti) => {
                    const chars = title.querySelectorAll('.char');
                    gsap.to(chars, {
                        opacity: 1, y: 0, rotateX: 0, duration: 0.9,
                        ease: 'expo.out', stagger: 0.04, delay: 1.0 + ti * 0.18,
                        onComplete: () => title.classList.add('is-revealed')
                    });
                });
            }
        };
        animate();
    })();

    // ── RIPPLE EFFECT ──
    document.addEventListener('click', e => {
        const btn = e.target.closest('.ripple-btn, .btn-primary, .btn-ghost, .btn-contact, .btn-submit');
        if (!btn) return;
        const cs = getComputedStyle(btn);
        if (cs.position === 'static') btn.style.position = 'relative';
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = 38;
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    });

    // ── NAVBAR SCROLL ──
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => { nav?.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

    // ── PROGRESS BAR ──
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || window.scrollY;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pb = document.getElementById('progress-bar');
        if (pb) pb.style.width = (winScroll / height * 100) + '%';
    }, { passive: true });

    // ── HAMBURGER ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks?.classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
        });
    });

    // ── ANCHOR SCROLL ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
            else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ── ACTIVE NAV ──
    const sections = document.querySelectorAll('section[id]');
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                const al = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (al) al.classList.add('active');
            }
        });
    }, { threshold: 0.35 }).observe && sections.forEach(s => {
        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    const al = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                    if (al) al.classList.add('active');
                }
            });
        }, { threshold: 0.35 }).observe(s);
    });

    // ── TYPEWRITER ──
    const typeTarget = document.getElementById('typewriter');
    if (typeTarget) {
        const phrases = [
            'Automate your complex business logic with autonomous intelligence.',
            'Deploy AI agents that think, act, and evolve your enterprise.',
            'Transform your workflows with next-generation AI automation.',
            'The future of work is autonomous. Build it with Axon Systems.'
        ];
        let pi = 0, ci = 0, deleting = false;
        const type = () => {
            const curr = phrases[pi];
            typeTarget.textContent = deleting ? curr.substring(0, ci - 1) : curr.substring(0, ci + 1);
            if (!deleting) {
                ci++;
                if (ci === curr.length + 1) { deleting = true; setTimeout(type, 2800); return; }
            } else {
                ci--;
                if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
            }
            setTimeout(type, deleting ? 25 : 52);
        };
        setTimeout(type, 3200);
    }

    // ── STAT COUNTERS + SVG RINGS (matrix scramble) ──
    const animCounter = el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const dur = 2600;
        const start = performance.now();
        const CHARS = '0123456789';
        const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)];
        el.classList.add('scrambling');
        const update = now => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            const val = Math.round(eased * target);
            if (t < 0.38) {
                // Pure scramble phase
                const len = String(target).length;
                let s = '';
                for (let k = 0; k < len; k++) s += rnd();
                el.textContent = s + suffix;
            } else if (t < 0.88) {
                // Real value + trailing noise char
                el.textContent = val + rnd() + suffix;
            } else {
                el.textContent = val + suffix;
                el.classList.remove('scrambling');
            }
            if (t < 1) requestAnimationFrame(update);
            else el.textContent = target + suffix;
        };
        requestAnimationFrame(update);
    };
    const animRing = ring => {
        const pct = parseFloat(ring.dataset.pct) / 100;
        const circumference = 157;
        ring.style.strokeDashoffset = circumference - circumference * pct;
    };
    const statNums = document.querySelectorAll('.stat-num');
    const rings = document.querySelectorAll('.ring-fill');
    const statsEl = document.querySelector('.stats-section');
    if (statsEl && statNums.length) {
        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNums.forEach(n => animCounter(n));
                    rings.forEach(r => animRing(r));
                    entry.target._io?.disconnect();
                }
            });
        }, { threshold: 0.4 }).observe(statsEl);
    }

    // ── HOLOGRAPHIC SHEEN ──
    document.querySelectorAll('.service-card, .why-card, .port-card, .testimo-card').forEach(card => {
        const holo = card.querySelector('.holo-layer');
        if (!holo) return;
        let _rect = null;
        card.addEventListener('mouseenter', () => { _rect = card.getBoundingClientRect(); }, { passive: true });
        card.addEventListener('mousemove', e => {
            if (!_rect) _rect = card.getBoundingClientRect();
            const x = ((e.clientX - _rect.left) / _rect.width * 100).toFixed(1);
            const y = ((e.clientY - _rect.top) / _rect.height * 100).toFixed(1);
            holo.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.09) 0%, rgba(255,0,64,0.06) 30%, rgba(0,212,255,0.05) 55%, transparent 75%)`;
        }, { passive: true });
        card.addEventListener('mouseleave', () => { holo.style.background = ''; _rect = null; }, { passive: true });
    });

    // ── MAGNETIC ELEMENTS (buttons + nav links + why-cards) ──
    const setupMag = (selector, strength) => {
        document.querySelectorAll(selector).forEach(btn => {
            if (!window.gsap) return;
            let _rect = null;
            btn.addEventListener('mouseenter', () => { _rect = btn.getBoundingClientRect(); }, { passive: true });
            btn.addEventListener('mousemove', e => {
                if (!_rect) _rect = btn.getBoundingClientRect();
                const x = e.clientX - _rect.left - _rect.width / 2;
                const y = e.clientY - _rect.top - _rect.height / 2;
                gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.22, ease: 'power2.out' });
            }, { passive: true });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.3)' });
                _rect = null;
            }, { passive: true });
        });
    };
    setupMag('.mag-btn', 0.32);
    setupMag('.nav-links a', 0.18);
    setupMag('.why-card', 0.05);
    setupMag('.satellite-node', 0.25);

    // ── VANILLA TILT ──
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.service-card'), { max: 5, speed: 800, glare: false, scale: 1.02 });
        VanillaTilt.init(document.querySelectorAll('.port-card'), { max: 6, speed: 600, glare: true, 'max-glare': 0.08 });
    }

    // ── PARTICLES (testimonials bg) ──
    if (window.particlesJS && document.getElementById('particles-js-laser')) {
        particlesJS('particles-js-laser', {
            particles: {
                number: { value: 12, density: { enable: true, value_area: 900 } },
                color: { value: '#ff0040' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                line_linked: { enable: true, distance: 250, color: '#ff0040', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 0.8, out_mode: 'out' }
            },
            interactivity: { detect_on: 'window', events: { onhover: { enable: false }, resize: true } },
            retina_detect: true
        });
    }

    // ── GSAP SCROLL ANIMATIONS ──
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.navbar', { y: -80, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.1 });
        gsap.from('.nav-links li', { y: -15, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.5 });
        gsap.from('.logo', { scale: 0.7, opacity: 0, duration: 1.1, ease: 'elastic.out(1, 0.5)', delay: 0.3 });
        gsap.from('.hero-badge', { y: 30, opacity: 0, scale: 0.9, duration: 1, ease: 'power3.out', delay: 0.8 });
        gsap.from('.hero-typewriter-wrap', { y: 35, opacity: 0, duration: 1.1, delay: 2.6, ease: 'power2.out' });
        gsap.from('.hero-ctas', { y: 30, opacity: 0, duration: 1, delay: 2.8, ease: 'power2.out' });
        gsap.from('.hero-system-bar', { y: 20, opacity: 0, duration: 0.9, delay: 3.0, ease: 'power2.out' });
        gsap.from('.scroll-indicator', { opacity: 0, y: 10, duration: 0.8, delay: 3.2, ease: 'power2.out' });
        gsap.from('.hero-faces-container', { scale: 1.12, opacity: 0, duration: 1.8, delay: 0.6, ease: 'power3.out' });
        gsap.from('.hud-corner', { opacity: 0, duration: 1, stagger: 0.15, delay: 1.5, ease: 'power2.out' });
        gsap.from('.hud-ro', { opacity: 0, duration: 0.8, stagger: 0.1, delay: 2.0, ease: 'power2.out' });

        // Hero 3D parallax
        const heroSec = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        if (heroSec && heroContent) {
            let _t = 0;
            heroSec.addEventListener('mousemove', e => {
                const now = performance.now();
                if (now - _t < 33) return;
                _t = now;
                const xA = (window.innerWidth / 2 - e.pageX) / 60;
                const yA = (window.innerHeight / 2 - e.pageY) / 60;
                gsap.to(heroContent, { rotateY: xA, rotateX: yA, ease: 'power1.out', transformPerspective: 1400 });
            }, { passive: true });
            heroSec.addEventListener('mouseleave', () => {
                gsap.to(heroContent, { rotateY: 0, rotateX: 0, duration: 1.2, ease: 'power2.out' });
            });
        }

        // Scroll reveals
        document.querySelectorAll('.gs-reveal').forEach(el => {
            gsap.to(el, {
                y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out',
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
            });
        });

        gsap.fromTo('.port-card',
            { y: 70, opacity: 0, rotationX: -15 },
            { y: 0, opacity: 1, rotationX: 0, duration: 0.85, stagger: 0.18, ease: 'power3.out',
              scrollTrigger: { trigger: '.portfolio-grid', start: 'top 83%', toggleActions: 'play none none reverse' } }
        );
        gsap.fromTo('.why-card',
            { y: 55, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: '.why-grid', start: 'top 86%' } }
        );
        gsap.fromTo('.service-card',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
              scrollTrigger: { trigger: '.services-grid', start: 'top 85%' } }
        );
        gsap.fromTo('.cta-title',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: '.cta-banner', start: 'top 80%' } }
        );
        gsap.utils.toArray('.sec-bg-num').forEach(num => {
            gsap.to(num, {
                yPercent: -15, ease: 'none',
                scrollTrigger: { trigger: num.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        });

        // Section parallax depth
        gsap.utils.toArray('.hero-faces-container').forEach(el => {
            gsap.to(el, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
            });
        });
    }

    // ── NODE DIAGRAM SVG ──
    const drawLines = () => {
        const svg = document.getElementById('nodeSvgContainer');
        if (!svg) return;
        svg.innerHTML = '';
        const cx = svg.clientWidth / 2;
        const cy = svg.clientHeight / 2;
        const svgRect = svg.getBoundingClientRect();
        document.querySelectorAll('.satellite-node').forEach(node => {
            const isRight = ['node4','node5','node6'].includes(node.id);
            const dot = node.querySelector(isRight ? '.left-dot' : '.node-dot:not(.left-dot)');
            if (!dot) return;
            const dr = dot.getBoundingClientRect();
            const sx = dr.left - svgRect.left + dr.width / 2;
            const sy = dr.top  - svgRect.top  + dr.height / 2;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sx); line.setAttribute('y1', sy);
            line.setAttribute('x2', cx); line.setAttribute('y2', cy);
            line.setAttribute('class', 'svg-line');
            svg.appendChild(line);
            const dot2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot2.setAttribute('r', '3'); dot2.setAttribute('fill', '#00d4ff');
            dot2.style.filter = 'drop-shadow(0 0 6px #00d4ff)';
            const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
            anim.setAttribute('dur', (2.5 + Math.random() * 2).toFixed(1) + 's');
            anim.setAttribute('repeatCount', 'indefinite');
            anim.setAttribute('path', `M ${sx} ${sy} L ${cx} ${cy}`);
            dot2.appendChild(anim);
            svg.appendChild(dot2);
        });
    };

    // ── AGILE SVG ──
    const drawAgileLines = () => {
        const svg = document.getElementById('agileSvgContainer');
        if (!svg) return;
        svg.innerHTML = '';
        const svgRect = svg.getBoundingClientRect();
        const gc = id => {
            const el = document.getElementById(id);
            if (!el) return null;
            const c = el.querySelector('.step-circle');
            if (!c) return null;
            const r = c.getBoundingClientRect();
            return { x: r.left - svgRect.left + r.width / 2, y: r.top - svgRect.top + r.height / 2 };
        };
        const p = [1,2,3,4,5,6].map(i => gc('agile' + i));
        if (!p[0] || !p[5]) return;
        const mob = window.innerWidth <= 768;
        const pathId = 'agileP';
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = mob
            ? `M ${p[0].x} ${p[0].y} L ${p[1].x} ${p[1].y} L ${p[2].x} ${p[2].y} L ${p[3].x} ${p[3].y} L ${p[4].x} ${p[4].y} L ${p[5].x} ${p[5].y}`
            : `M ${p[0].x} ${p[0].y} L ${p[1].x} ${p[1].y} L ${p[2].x} ${p[2].y} C ${p[2].x+90} ${p[2].y}, ${p[3].x+90} ${p[3].y}, ${p[3].x} ${p[3].y} L ${p[4].x} ${p[4].y} L ${p[5].x} ${p[5].y}`;
        path.setAttribute('id', pathId);
        path.setAttribute('d', d);
        path.setAttribute('class', 'agile-path');
        svg.appendChild(path);
        const glowDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glowDot.setAttribute('r', '8'); glowDot.setAttribute('fill', '#00d4ff');
        glowDot.style.filter = 'drop-shadow(0 0 12px #00d4ff) drop-shadow(0 0 24px #00d4ff)';
        const am = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        am.setAttribute('dur', '5.5s'); am.setAttribute('repeatCount', 'indefinite');
        const mp = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
        mp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + pathId);
        mp.setAttribute('href', '#' + pathId);
        am.appendChild(mp); glowDot.appendChild(am); svg.appendChild(glowDot);
    };

    drawLines(); drawAgileLines();
    window.addEventListener('load', () => {
        drawLines(); drawAgileLines();
        setTimeout(() => { drawLines(); drawAgileLines(); }, 600);
    });
    window.addEventListener('resize', () => { drawLines(); drawAgileLines(); }, { passive: true });

    // ── HERO FACES 3D TILT ──
    (function initHeroFaces() {
        const container = document.querySelector('.hero-faces-container');
        if (!container) return;
        const spotlight = container.querySelector('.hfc-spotlight');
        let isHovered = false, targetRX = 0, targetRY = 0, currentRX = 0, currentRY = 0, rafId = null;
        const lerp = (a, b, t) => a + (b - a) * t;
        const tick = () => {
            const speed = isHovered ? 0.1 : 0.07;
            currentRX = lerp(currentRX, isHovered ? targetRX : 0, speed);
            currentRY = lerp(currentRY, isHovered ? targetRY : 0, speed);
            const scaleVal = isHovered ? 1.04 : 1;
            container.style.transform = `translate(0, -50%) perspective(1000px) rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg) scale(${scaleVal})`;
            if (Math.abs(currentRX) > 0.04 || Math.abs(currentRY) > 0.04 || isHovered) rafId = requestAnimationFrame(tick);
            else { container.style.transform = 'translate(0, -50%)'; rafId = null; }
        };
        let _rect = null;
        container.addEventListener('mouseenter', () => { isHovered = true; _rect = container.getBoundingClientRect(); if (!rafId) rafId = requestAnimationFrame(tick); }, { passive: true });
        container.addEventListener('mouseleave', () => { isHovered = false; _rect = null; if (!rafId) rafId = requestAnimationFrame(tick); }, { passive: true });
        container.addEventListener('mousemove', e => {
            if (!_rect) _rect = container.getBoundingClientRect();
            const dx = (e.clientX - (_rect.left + _rect.width / 2)) / (_rect.width / 2);
            const dy = (e.clientY - (_rect.top + _rect.height / 2)) / (_rect.height / 2);
            targetRY = dx * 14; targetRX = -dy * 9;
            if (spotlight) {
                const px = ((e.clientX - _rect.left) / _rect.width * 100).toFixed(1);
                const py = ((e.clientY - _rect.top) / _rect.height * 100).toFixed(1);
                spotlight.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,100,0,0.22) 0%, rgba(255,60,0,0.08) 32%, transparent 62%)`;
            }
        }, { passive: true });
    })();

    // ── WORKFLOW ANIMATION ──
    (function initWorkflow() {
        const orchState = document.getElementById('wfOrchState');
        if (!orchState) return;
        const orchStates  = ['PLANNING','ROUTING','MONITORING','DELEGATING','OPTIMIZING'];
        const inputStates = ['RECEIVING','PARSING','QUEUED','INGESTING'];
        const outputStates = ['COMPLETE','DELIVERED','VERIFIED','DISPATCHED'];
        const a1s = ['SCANNING WEB','FETCHING DATA','INDEXING','RETRIEVING'];
        const a2s = ['GENERATING','DRAFTING','REFINING','FORMATTING'];
        const a3s = ['PROCESSING','ANALYZING','COMPUTING','MODELING'];
        const logEntries = [
            { msg: '✓ Sales pipeline analysis — 3.8s', type: 'done' },
            { msg: '→ Generating investor memo...', type: 'active' },
            { msg: '✓ Email campaign drafted — 2.1s', type: 'done' },
            { msg: '✓ Competitor report complete — 5.2s', type: 'done' },
            { msg: '→ Analyzing customer churn...', type: 'active' },
            { msg: '✓ Weekly KPI digest sent — 1.4s', type: 'done' },
            { msg: '→ Building demand forecast...', type: 'active' },
            { msg: '✓ CRM data synced — 0.9s', type: 'done' },
        ];
        let taskCounter = 1247, logIdx = 0, oi = 0, ii = 0, outi = 0, a1i = 0, a2i = 0, a3i = 0;
        const cycle = (id, arr, i) => {
            const el = document.getElementById(id) || (id === 'wfOrchState' ? orchState : null);
            if (!el) return;
            el.style.opacity = '0';
            setTimeout(() => { el.textContent = arr[i % arr.length]; el.style.opacity = '1'; el.style.transition = 'opacity 0.3s'; }, 160);
        };
        setInterval(() => cycle('wfOrchState', orchStates, ++oi), 2400);
        setInterval(() => cycle('wfInputState', inputStates, ++ii), 3100);
        setInterval(() => cycle('wfOutputState', outputStates, ++outi), 3700);
        setInterval(() => cycle('wfChipSt1', a1s, a1i++), 2800);
        setInterval(() => cycle('wfChipSt2', a2s, a2i++), 3300);
        setInterval(() => cycle('wfChipSt3', a3s, a3i++), 2600);
        let activeChip = 0;
        setInterval(() => {
            document.querySelectorAll('.wf-agent-chip').forEach((c, i) => c.classList.toggle('active', i === activeChip % 3));
            activeChip++;
        }, 2000);
        setInterval(() => {
            taskCounter += Math.floor(Math.random() * 4) + 1;
            const el = document.getElementById('wfTaskCount2');
            if (el) el.textContent = taskCounter.toLocaleString();
        }, 1600);
        setInterval(() => {
            const lat = 65 + Math.floor(Math.random() * 40);
            const el = document.getElementById('wfLatency2');
            if (el) el.innerHTML = `&lt;${lat}ms`;
        }, 2700);
        setInterval(() => {
            const n = 5 + Math.floor(Math.random() * 5);
            const el = document.getElementById('wfAgents2');
            if (el) el.textContent = n.toString().padStart(2, '0');
        }, 4200);
        const logFeed = document.getElementById('wfLogFeed');
        if (logFeed) {
            setInterval(() => {
                const entry = logEntries[logIdx % logEntries.length]; logIdx++;
                const d = document.createElement('div');
                d.className = `wf-log-entry ${entry.type}`;
                const now = new Date();
                const t = `[${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}]`;
                d.innerHTML = `<span class="wf-le-time">${t}</span><span class="wf-le-msg">${entry.msg}</span>`;
                logFeed.insertBefore(d, logFeed.firstChild);
                const all = logFeed.querySelectorAll('.wf-log-entry');
                if (all.length > 4) all[all.length - 1].remove();
            }, 3200);
        }
    })();

    // ── MATRIX RAIN (about section ambient) ──
    (function initMatrixRain() {
        const aboutSec = document.querySelector('#about');
        if (!aboutSec) return;
        const cnv = document.createElement('canvas');
        cnv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.045;z-index:0;';
        aboutSec.style.position = 'relative';
        aboutSec.insertBefore(cnv, aboutSec.firstChild);
        const ctx = cnv.getContext('2d');
        let W, H, cols, drops;
        const CHARS = 'AXON01システムAI神経回路量子暗号自律エージェント';
        const resize = () => {
            W = cnv.width  = aboutSec.offsetWidth;
            H = cnv.height = aboutSec.offsetHeight;
            cols = Math.floor(W / 18);
            drops = new Array(cols).fill(1);
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });
        let visible = false;
        new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 }).observe(aboutSec);
        setInterval(() => {
            if (!visible) return;
            ctx.fillStyle = 'rgba(2,0,13,0.12)';
            ctx.fillRect(0, 0, W, H);
            ctx.font = '13px JetBrains Mono, monospace';
            drops.forEach((y, i) => {
                const isRed = Math.random() < 0.15;
                ctx.fillStyle = isRed ? 'rgba(255,0,64,0.9)' : 'rgba(0,212,255,0.7)';
                const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
                ctx.fillText(ch, i * 18, y * 18);
                if (y * 18 > H && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            });
        }, 55);
    })();

    // ── CHATBOT ──
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat  = document.getElementById('closeChat');
    const chatBody   = document.getElementById('chatBody');
    const chatMsg    = document.getElementById('chatMsg');
    const sendChat   = document.getElementById('sendChat');
    let chatTimer;
    const openChat  = () => { clearTimeout(chatTimer); chatWindow?.classList.remove('d-none'); document.querySelector('.chat-badge')?.style.setProperty('display','none'); };
    const closePanel= () => { chatTimer = setTimeout(() => chatWindow?.classList.add('d-none'), 320); };
    chatToggle?.addEventListener('mouseenter', openChat);
    chatToggle?.addEventListener('mouseleave', closePanel);
    chatWindow?.addEventListener('mouseenter', () => clearTimeout(chatTimer));
    chatWindow?.addEventListener('mouseleave', closePanel);
    chatToggle?.addEventListener('click', () => { clearTimeout(chatTimer); chatWindow?.classList.contains('d-none') ? openChat() : chatWindow?.classList.add('d-none'); });
    closeChat?.addEventListener('click', () => { clearTimeout(chatTimer); chatWindow?.classList.add('d-none'); });
    const addMsg = (text, sender) => {
        const d = document.createElement('div'); d.className = `msg ${sender}`; d.innerText = text;
        chatBody?.appendChild(d); if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    };
    const handleSend = async () => {
        const text = chatMsg?.value.trim(); if (!text) return;
        document.querySelector('.chat-quick-replies')?.remove();
        addMsg(text, 'user'); if (chatMsg) chatMsg.value = '';
        const tid = 't' + Date.now();
        const td = document.createElement('div'); td.className = 'typing-indicator'; td.id = tid;
        td.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatBody?.appendChild(td); if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
        try {
            const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
            const data = await res.json();
            document.getElementById(tid)?.remove(); addMsg(data.reply, 'ai');
        } catch {
            document.getElementById(tid)?.remove(); addMsg('Neural link interrupted. Reach us at info@axonsystems.com', 'ai');
        }
    };
    sendChat?.addEventListener('click', handleSend);
    chatMsg?.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });
    document.querySelectorAll('.quick-reply').forEach(chip => {
        chip.addEventListener('click', () => { if (chatMsg) chatMsg.value = chip.textContent.replace(/^[^ ]+ /, '').trim(); handleSend(); });
    });

    // ── CONTACT MODAL ──
    const modal = document.getElementById('contactModal');
    const closeContact = document.getElementById('closeContact');
    const contactForm  = document.getElementById('contactForm');
    window.openContactModal = e => {
        if (e) e.preventDefault();
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
    };
    window.closeContactModal = () => {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
    };
    document.querySelectorAll('a[href="#contact"], .btn-contact').forEach(l => l.addEventListener('click', window.openContactModal));
    closeContact?.addEventListener('click', window.closeContactModal);
    window.addEventListener('click', e => { if (e.target === modal) window.closeContactModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.classList.contains('active')) window.closeContactModal(); });
    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const orig = btn.innerHTML;
        btn.innerHTML = 'Message Sent ✓'; btn.style.background = '#00cc66';
        setTimeout(() => { window.closeContactModal(); contactForm.reset(); btn.innerHTML = orig; btn.style.background = ''; }, 2200);
    });

});

// ── CURSOR RING EXPANDED CSS ──
(function() {
    const style = document.createElement('style');
    style.textContent = `
        #cursor-ring.expanded { width: 56px; height: 56px; border-color: rgba(0,212,255,0.6); }
        #cursor-dot { left: -100px; top: -100px; }
        #cursor-ring { left: -100px; top: -100px; }
    `;
    document.head.appendChild(style);
})();

// ============================================================
// $5,000,000,000,000 — FULL SITE UPGRADE
// ============================================================

// ── 1. SCROLL → HERO NEBULA SHADER UPDATE ──
window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
    if (window._axonBgUni) window._axonBgUni.uScrollY.value = pct;
}, { passive: true });

// ── 2. SECTION-AWARE CURSOR COLOR ──
(function sectionCursorColor() {
    const sectionColors = {
        'home':         { dot: '#ff0040', ring: 'rgba(255,0,64,0.5)',   glow: 'rgba(255,0,64,0.07)'   },
        'services':     { dot: '#00d4ff', ring: 'rgba(0,212,255,0.5)',  glow: 'rgba(0,212,255,0.06)'  },
        'portfolio':    { dot: '#ffc200', ring: 'rgba(255,194,0,0.5)',  glow: 'rgba(255,194,0,0.06)'  },
        'testimonials': { dot: '#b44fff', ring: 'rgba(180,79,255,0.5)', glow: 'rgba(180,79,255,0.05)' },
        'about':        { dot: '#00ff9d', ring: 'rgba(0,255,157,0.5)',  glow: 'rgba(0,255,157,0.05)'  },
    };
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let lastSection = 'home';
    new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const id = e.target.id;
                const c  = sectionColors[id] || sectionColors['home'];
                if (id === lastSection) return;
                lastSection = id;
                if (dot)  dot.style.background  = c.dot;
                if (dot)  dot.style.boxShadow   = `0 0 10px ${c.dot}`;
                if (ring) ring.style.borderColor = c.ring;
                document.documentElement.style.setProperty('--section-cursor-glow', c.glow);
            }
        });
    }, { threshold: 0.4 }).observe && document.querySelectorAll('section[id]').forEach(s => {
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const id = e.target.id;
                const c  = sectionColors[id] || sectionColors['home'];
                if (dot)  { dot.style.background = c.dot; dot.style.boxShadow = `0 0 10px ${c.dot}`; }
                if (ring) ring.style.borderColor = c.ring;
            });
        }, { threshold: 0.4 }).observe(s);
    });
})();

// ── 3. GLOBAL AMBIENT PARTICLE CANVAS ──
(function globalAmbient() {
    const cnv = document.createElement('canvas');
    cnv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;mix-blend-mode:screen;opacity:0.22;';
    document.body.insertBefore(cnv, document.body.firstChild);
    const ctx = cnv.getContext('2d');
    let W = cnv.width  = window.innerWidth;
    let H = cnv.height = window.innerHeight;
    window.addEventListener('resize', () => { W = cnv.width = window.innerWidth; H = cnv.height = window.innerHeight; }, { passive: true });

    const PTCOUNT = 55;
    const pts = Array.from({ length: PTCOUNT }, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
        size: Math.random()*1.8+0.4,
        hue: Math.random()*60, // varies: 0=red, 30=orange, 60=gold (will be updated per section)
        life: Math.random()*Math.PI*2
    }));

    const sectionHues = { home:0, services:195, portfolio:45, testimonials:270, about:150 };
    let targetHue = 0;
    new IntersectionObserver && document.querySelectorAll('section[id]').forEach(s => {
        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) targetHue = sectionHues[s.id] ?? 0;
        }, { threshold: 0.4 }).observe(s);
    });

    let ambHue = 0;
    let fk = 0;
    (function draw() {
        requestAnimationFrame(draw);
        fk++;
        if (fk % 2 !== 0) return;
        ambHue += (targetHue - ambHue) * 0.02;
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p => {
            p.life += 0.018;
            p.x += p.vx; p.y += p.vy;
            if (p.x < -10) p.x = W+10;
            if (p.x > W+10) p.x = -10;
            if (p.y < -10) p.y = H+10;
            if (p.y > H+10) p.y = -10;
            const alpha = (Math.sin(p.life)*0.5+0.5)*0.7+0.15;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 6.2832);
            ctx.fillStyle = `hsla(${ambHue + p.hue*0.3},100%,70%,${alpha})`;
            ctx.fill();
        });
    })();
})();

// ── 4. SERVICE CARD EXTRA CONTENT (slide-up reveal) ──
(function serviceCardExtras() {
    const cardData = [
        { features: ['Multi-agent orchestration','Self-healing pipelines','Real-time decision trees','24/7 autonomous ops'], cta: 'Deploy Agents →' },
        { features: ['Microservices architecture','API-first design','CI/CD automation','99.9% uptime SLA'], cta: 'View Stack →' },
        { features: ['Native iOS + Android','Offline-first UX','Push notifications','Analytics built-in'], cta: 'See Portfolio →' },
        { features: ['AI-powered pricing','Smart inventory','Abandoned cart AI','Personalisation engine'], cta: 'Launch Store →' },
        { features: ['NLP intent detection','CRM integration','Order tracking','Smart escalation'], cta: 'See Demo →' },
        { features: ['Real-time dashboards','Predictive forecasting','Anomaly detection','Auto-reporting'], cta: 'View Insights →' },
        { features: ['Offline mode','Multi-location sync','Smart reordering','Staff analytics'], cta: 'Get POS →' },
        { features: ['Auto-scaling infra','Zero-downtime deploys','Cost optimisation','24/7 monitoring'], cta: 'Scale Now →' },
    ];
    document.querySelectorAll('.service-card').forEach((card, i) => {
        const d = cardData[i];
        if (!d) return;
        const extra = document.createElement('div');
        extra.className = 'sc-extra';
        extra.innerHTML = `
            <ul class="sc-feat-list">${d.features.map(f=>`<li><span class="sc-feat-dot"></span>${f}</li>`).join('')}</ul>
            <button class="sc-cta-mini mag-btn" onclick="openContactModal(event)">${d.cta}</button>
        `;
        card.querySelector('.card-content')?.appendChild(extra);
    });
})();

// ── 5. PORTFOLIO GRID 3D PERSPECTIVE TILT ──
(function portfolioTilt() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid || !window.gsap) return;
    let active = false;
    document.addEventListener('mousemove', e => {
        const rect = grid.getBoundingClientRect();
        const inBounds = e.clientX > rect.left && e.clientX < rect.right &&
                         e.clientY > rect.top  && e.clientY < rect.bottom;
        if (inBounds) {
            active = true;
            const x = (e.clientX - rect.left - rect.width/2)  / rect.width;
            const y = (e.clientY - rect.top  - rect.height/2) / rect.height;
            gsap.to(grid, { rotateY: x*10, rotateX: -y*6, transformPerspective: 1400, duration: 0.55, ease: 'power2.out' });
        } else if (active) {
            active = false;
            gsap.to(grid, { rotateY: 0, rotateX: 0, duration: 1.2, ease: 'elastic.out(1,0.4)' });
        }
    }, { passive: true });
})();

// ── 6. CTA SECTION SHADER CANVAS ──
(function ctaCanvas() {
    const cta = document.querySelector('.cta-banner');
    if (!cta) return;
    const cnv = document.createElement('canvas');
    cnv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    cta.style.position = 'relative';
    cta.insertBefore(cnv, cta.firstChild);
    const gl = cnv.getContext('webgl') || cnv.getContext('experimental-webgl');
    if (!gl) return;

    const vert = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0,1); }`;
    const frag = `
        precision mediump float;
        uniform float uT;
        uniform vec2 uRes;
        float h21(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
        float n(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
            return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
        float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<5;i++){v+=a*n(p);p*=2.;a*=.5;} return v; }
        void main(){
            vec2 uv = gl_FragCoord.xy / uRes;
            float t = uT * 0.07;
            float n1 = fbm(uv*3.+vec2(t,t*.6));
            float n2 = fbm(uv*5.-vec2(t*.4,t*.8));
            vec3 c1=vec3(0.6,0.,0.1), c2=vec3(0.,0.4,0.7), c3=vec3(0.6,0.4,0.);
            vec3 col = mix(c1,c2,n1)*0.35;
            col = mix(col,c3,n2*n1*0.4);
            float tendrils = smoothstep(.46,.54,n1)*0.22;
            col += vec3(1.,.2,.4)*tendrils;
            vec2 vig = uv*2.-1.; col *= .5+.5*(1.-dot(vig*.6,vig*.6));
            gl_FragColor = vec4(col,1.);
        }
    `;
    const compile = (type, src) => {
        const s = gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog,'a_pos');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const uT   = gl.getUniformLocation(prog,'uT');
    const uRes = gl.getUniformLocation(prog,'uRes');
    const resize = () => {
        cnv.width = cta.offsetWidth; cnv.height = cta.offsetHeight;
        gl.viewport(0,0,cnv.width,cnv.height);
        gl.uniform2f(uRes, cnv.width, cnv.height);
    };
    resize(); window.addEventListener('resize', resize, { passive: true });
    let visible = false;
    new IntersectionObserver(([e])=>{ visible=e.isIntersecting; },{ threshold:0.05 }).observe(cta);
    let t0 = performance.now();
    (function loop(){ requestAnimationFrame(loop); if(!visible) return;
        gl.uniform1f(uT, (performance.now()-t0)/1000); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); })();
})();

// ── 7. STATS ORBITAL RINGS — CSS-only, zero JS RAF cost ──
(function statsOrbitals() {
    document.querySelectorAll('.stat-item').forEach((item, idx) => {
        item.style.position = 'relative';
        const delays = ['0s', '-2s', '-4s'];
        const sizes  = [110, 140, 170];
        const colors = ['rgba(255,0,64,0.18)', 'rgba(0,212,255,0.14)', 'rgba(255,194,0,0.10)'];
        const dirs   = ['normal', 'reverse', 'normal'];
        sizes.forEach((sz, i) => {
            const ring = document.createElement('div');
            ring.style.cssText = `
                position:absolute;
                width:${sz}px; height:${sz}px;
                top:50%; left:50%;
                transform:translate(-50%,-50%);
                border-radius:50%;
                border:1px solid ${colors[i]};
                pointer-events:none;
                z-index:0;
                animation:stat-ring-spin ${5 + i * 2.5}s linear ${delays[i]} infinite ${dirs[i]};
            `;
            item.insertBefore(ring, item.firstChild);
        });
    });
})();

// ── 8. SERVICE CARD HOVER PARTICLE BURST ──
(function cardParticleBurst() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width/2;
            const cy = rect.top  + rect.height/2;
            for (let i = 0; i < 8; i++) {
                const p = document.createElement('div');
                const angle = (i/8)*Math.PI*2;
                const dist = 60 + Math.random()*40;
                const size = 3 + Math.random()*3;
                p.style.cssText = `
                    position:fixed; width:${size}px; height:${size}px;
                    border-radius:50%; pointer-events:none; z-index:999992;
                    left:${cx}px; top:${cy}px;
                    background:${i%2===0?'var(--red)':'var(--cyan)'};
                    box-shadow:0 0 6px ${i%2===0?'var(--red-glow)':'var(--cyan-glow)'};
                    transform:translate(-50%,-50%);
                    transition: transform 0.6s cubic-bezier(0.2,0,0.1,1), opacity 0.6s ease;
                `;
                document.body.appendChild(p);
                requestAnimationFrame(() => {
                    p.style.transform = `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px))`;
                    p.style.opacity = '0';
                });
                setTimeout(() => p.remove(), 650);
            }
        });
    });
})();

// ============================================================
// $50,000,000,000 UPGRADE
// ============================================================

// ── SCROLL SPEED → CHROMATIC ABERRATION SPIKE ──
(function scrollChroma() {
    let lastSY = 0, decayId;
    window.addEventListener('scroll', () => {
        const vel = Math.abs(window.scrollY - lastSY);
        lastSY = window.scrollY;
        if (!window._axonChromaPass) return;
        const spike = 0.0022 + Math.min(vel * 0.00028, 0.016);
        window._axonChromaPass.uniforms.uAmount.value = spike;
        clearInterval(decayId);
        decayId = setInterval(() => {
            const cur = window._axonChromaPass.uniforms.uAmount.value;
            if (cur > 0.0023) {
                window._axonChromaPass.uniforms.uAmount.value = 0.0022 + (cur - 0.0022) * 0.82;
            } else { clearInterval(decayId); }
        }, 35);
    }, { passive: true });
})();

// ── KINETIC SECTION TITLE PHYSICS ──
(function kineticTitles() {
    if (!window.gsap) return;
    document.querySelectorAll('.section-title').forEach(title => {
        if (title.dataset.kinetic) return;
        title.dataset.kinetic = '1';
        const raw = title.textContent;
        title.textContent = '';
        title.style.fontFamily = 'inherit';
        [...raw].forEach(ch => {
            const s = document.createElement('span');
            s.className = 'kinetic-char';
            s.textContent = ch === ' ' ? ' ' : ch;
            title.appendChild(s);
        });
    });
    let kf = 0;
    document.addEventListener('mousemove', e => {
        if (++kf % 3 !== 0) return;
        document.querySelectorAll('.kinetic-char').forEach(ch => {
            const r = ch.getBoundingClientRect();
            if (r.top < -150 || r.top > window.innerHeight + 150) return;
            const cx = r.left + r.width * 0.5;
            const cy = r.top  + r.height * 0.5;
            const dx = e.clientX - cx, dy = e.clientY - cy;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const maxD = 95;
            if (dist < maxD) {
                const f = (maxD - dist) / maxD;
                const a = Math.atan2(dy, dx);
                gsap.to(ch, {
                    x: -Math.cos(a)*f*20, y: -Math.sin(a)*f*13,
                    color: `hsl(${345 + f*25},100%,${58 + f*22}%)`,
                    textShadow: `0 0 ${f*14}px rgba(255,0,64,${f*0.8})`,
                    duration: 0.22, ease: 'power2.out', overwrite: 'auto'
                });
            } else {
                gsap.to(ch, {
                    x: 0, y: 0, color: 'inherit', textShadow: 'none',
                    duration: 0.75, ease: 'elastic.out(1,0.35)', overwrite: 'auto'
                });
            }
        });
    }, { passive: true });
})();

// ── LIVE AI METRICS BAR ──
(function liveMetrics() {
    const bar = document.createElement('div');
    bar.className = 'live-ai-ticker';
    bar.innerHTML = `<div class="lat-inner">
        <div class="lat-item"><span class="lat-live-dot"></span><span class="lat-label">TASKS DONE</span><span class="lat-val" id="lmTasks">12,847</span></div>
        <div class="lat-div"></div>
        <div class="lat-item"><span class="lat-label">AGENTS LIVE</span><span class="lat-val lat-cyan" id="lmAgents">23</span></div>
        <div class="lat-div"></div>
        <div class="lat-item"><span class="lat-label">API / SEC</span><span class="lat-val" id="lmApi">847</span></div>
        <div class="lat-div"></div>
        <div class="lat-item"><span class="lat-label">LATENCY</span><span class="lat-val lat-green" id="lmLat">&lt;89ms</span></div>
        <div class="lat-div"></div>
        <div class="lat-item"><span class="lat-label">UPTIME</span><span class="lat-val lat-green">99.97%</span></div>
        <div class="lat-div"></div>
        <div class="lat-item lat-axon-brand"><span class="lat-logo-dot"></span><span class="lat-label lat-brand-name">AXON SYSTEMS</span></div>
    </div>`;
    document.body.appendChild(bar);
    let tasks = 12847;
    const elT = document.getElementById('lmTasks');
    const elA = document.getElementById('lmAgents');
    const elApi = document.getElementById('lmApi');
    const elL = document.getElementById('lmLat');
    setInterval(() => { tasks += Math.floor(Math.random()*3)+1; if(elT) elT.textContent=tasks.toLocaleString(); }, 1700);
    setInterval(() => { if(elA){ const n=18+Math.floor(Math.random()*10); elA.textContent=n; elA.style.color=''; setTimeout(()=>elA.style.color='var(--cyan)',80); } }, 3400);
    setInterval(() => { if(elApi) elApi.textContent=(760+Math.floor(Math.random()*130)).toLocaleString(); }, 1100);
    setInterval(() => { if(elL) elL.innerHTML=`&lt;${62+Math.floor(Math.random()*48)}ms`; }, 2100);
    window.addEventListener('scroll', () => { bar.classList.toggle('lat-visible', window.scrollY > 280); }, { passive:true });
})();

// ── CURSOR SHAPE MORPHING ──
(function cursorMorph() {
    const ring = document.getElementById('cursor-ring');
    if (!ring) return;
    const reset = () => { ring.style.borderRadius='50%'; ring.style.width=''; ring.style.height=''; ring.style.transform='translate(-50%,-50%)'; ring.style.boxShadow=''; };
    document.querySelectorAll('.port-card').forEach(el => {
        el.addEventListener('mouseenter', () => { ring.style.borderRadius='3px'; ring.style.transform='translate(-50%,-50%) rotate(45deg)'; ring.style.borderColor='rgba(255,194,0,0.7)'; });
        el.addEventListener('mouseleave', reset);
    });
    document.querySelectorAll('.btn-primary, .btn-submit').forEach(el => {
        el.addEventListener('mouseenter', () => { ring.style.width='50px'; ring.style.height='50px'; ring.style.boxShadow='0 0 0 1px rgba(255,0,64,0.3),0 0 22px rgba(255,0,64,0.3)'; });
        el.addEventListener('mouseleave', reset);
    });
    document.querySelectorAll('.service-card').forEach(el => {
        el.addEventListener('mouseenter', () => { ring.style.borderRadius='5px'; ring.style.width='58px'; ring.style.height='58px'; ring.style.borderColor='rgba(0,212,255,0.7)'; });
        el.addEventListener('mouseleave', reset);
    });
    document.querySelectorAll('.testimo-card').forEach(el => {
        el.addEventListener('mouseenter', () => { ring.style.width='52px'; ring.style.height='52px'; ring.style.borderColor='rgba(255,194,0,0.6)'; });
        el.addEventListener('mouseleave', reset);
    });
})();

// ── HERO CLICK RIPPLE VISUAL LAYER ──
(function heroRippleCanvas() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const cnv = document.createElement('canvas');
    cnv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:10;';
    hero.appendChild(cnv);
    const ctx = cnv.getContext('2d');
    let W = cnv.width = hero.offsetWidth, H = cnv.height = hero.offsetHeight;
    window.addEventListener('resize', () => { W=cnv.width=hero.offsetWidth; H=cnv.height=hero.offsetHeight; }, {passive:true});
    const ripples = [];
    hero.addEventListener('click', e => {
        const r = hero.getBoundingClientRect();
        ripples.push({ x:e.clientX-r.left, y:e.clientY-r.top, r:0, alpha:0.7, color:'255,0,64' });
        ripples.push({ x:e.clientX-r.left, y:e.clientY-r.top, r:0, alpha:0.4, color:'0,212,255', delay:80 });
    });
    let fr=0;
    (function loop(){ requestAnimationFrame(loop); fr++; if(fr%2!==0) return;
        ctx.clearRect(0,0,W,H);
        for(let i=ripples.length-1;i>=0;i--){
            const rp=ripples[i];
            if(rp.delay>0){rp.delay-=16;continue;}
            rp.r+=3.5; rp.alpha-=0.018;
            if(rp.alpha<=0){ripples.splice(i,1);continue;}
            ctx.beginPath(); ctx.arc(rp.x,rp.y,rp.r,0,6.2832);
            ctx.strokeStyle=`rgba(${rp.color},${rp.alpha})`; ctx.lineWidth=1.5; ctx.stroke();
        }
    })();
})();


/* ── Pricing Toggle ── */
(function pricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    if (!toggle) return;
    let annual = false;
    toggle.addEventListener('click', () => {
        annual = !annual;
        toggle.classList.toggle('active', annual);
        document.querySelectorAll('.pc-num[data-monthly]').forEach(el => {
            const val = annual ? parseInt(el.dataset.annual) : parseInt(el.dataset.monthly);
            el.textContent = val.toLocaleString();
        });
    });
})();

/* ── FAQ Accordion ── */
(function faqAccordion() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-q');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
})();

/* ── Section 3D Reveal — rotateX entrance on scroll ── */
(function section3DReveal() {
    const targets = document.querySelectorAll('.section-header');
    if (!targets.length) return;

    targets.forEach(el => {
        el.style.cssText += 'opacity:0;transform:perspective(900px) rotateX(22deg) translateY(28px);will-change:transform,opacity;';
        el.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.75s ease';
        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                el.style.opacity = '1';
                el.style.transform = 'perspective(900px) rotateX(0deg) translateY(0)';
            }
        }, { threshold: 0.15 }).observe(el);
    });
})();


/* ── Scroll Nav Dots ── */
(function scrollNavDots() {
    const SECS = [
        { id: '#home',         label: 'HOME'         },
        { id: '#stats',        label: 'METRICS'      },
        { id: '#services',     label: 'SERVICES'     },
        { id: '#portfolio',    label: 'PORTFOLIO'    },
        { id: '#testimonials', label: 'TESTIMONIALS' },
        { id: '#about',        label: 'ABOUT'        },
        { id: '#why',          label: 'WHY US'       },
        { id: '#contact',      label: 'CONTACT'      },
    ];

    const nav = document.createElement('nav');
    nav.id = 'scroll-nav';
    document.body.appendChild(nav);

    const dots = SECS.map(s => {
        const d = document.createElement('div');
        d.className = 'sn-dot';
        d.setAttribute('data-tooltip', s.label);
        d.addEventListener('click', () => {
            const el = document.querySelector(s.id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
        nav.appendChild(d);
        return { dot: d, id: s.id };
    });

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const found = dots.find(d => document.querySelector(d.id) === entry.target);
            if (found) found.dot.classList.toggle('active', entry.isIntersecting);
        });
    }, { threshold: 0.35 });
    dots.forEach(d => { const el = document.querySelector(d.id); if (el) io.observe(el); });
})();

