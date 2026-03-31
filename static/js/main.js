document.addEventListener("DOMContentLoaded", () => {
    // Custom Cursor follower with GSAP for smoother tracking
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    // Magnetic Button effect for nav-btn
    const btn = document.querySelector('.nav-btn');
    if (btn) {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate distance from center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Magnetic pull using GSAP
            gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.2, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    }

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const nav = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            nav.style.background = "rgba(15, 0, 0, 0.85)";
            nav.style.boxShadow = "0 10px 30px rgba(255, 0, 0, 0.2)";
            nav.style.padding = "10px 30px"; // Shrink slightly
        } else {
            nav.style.background = "rgba(20, 0, 0, 0.4)";
            nav.style.boxShadow = "none";
            nav.style.padding = "15px 30px";
        }
    });

    // Initialize Laser Particles (User requested glowing web for Testimonials)
    if (document.getElementById('particles-js-laser')) {
        particlesJS("particles-js-laser", {
            "particles": {
                "number": { "value": 25, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ff6600" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.8 },
                "size": { "value": 5 },
                "line_linked": {
                    "enable": true,
                    "distance": 300,
                    "color": "#ff0000",
                    "opacity": 0.9,
                    "width": 3
                },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": false },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 300, "line_linked": { "opacity": 1, "color": "#ffaa00" } }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize VanillaTilt for elements
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".service-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.02
        });

        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.4,
            scale: 1.05
        });
    }

    // Initialize Particles.js to represent the "Red Neural AI Logic" background
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 75, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ff0000", "#ff4500", "#ff8c00", "#ffffff"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.6, "random": true, "anim": {"enable": true, "speed": 1.5, "opacity_min": 0.1, "sync": false} },
                "size": { "value": 4, "random": true },
                "line_linked": { "enable": true, "distance": 160, "color": "#ff3333", "opacity": 0.2, "width": 1.5 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "repulse" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.7 } },
                    "repulse": { "distance": 250, "duration": 0.4 }
                }
            },
            "retina_detect": true
        });
    }

    // Register GSAP plugins
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Navbar drops in beautifully
        gsap.from(".navbar", { y: -100, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.1 });
        gsap.from(".nav-links li", { y: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 });
        gsap.from(".logo", { scale: 0.8, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.4 });

        // Staggered Hero text reveal (Next-level intro)
        const heroTitles = document.querySelectorAll(".hero-title");
        gsap.from(heroTitles, {
            y: 150,
            opacity: 0,
            rotationX: -60,         // Deep 3D flip effect
            transformOrigin: "left top",
            duration: 1.5,
            stagger: 0.2,
            ease: "expo.out",
            delay: 0.6
        });

        // Hero Parallax effect (mouse movement slightly shifts text)
        const heroSection = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            gsap.to(heroContent, {
                rotateY: xAxis,
                rotateX: yAxis,
                ease: "power1.out",
                transformPerspective: 1200
            });
        });
        heroSection.addEventListener('mouseleave', () => {
            gsap.to(heroContent, { rotateY: 0, rotateX: 0, duration: 1, ease: "power2.out" });
        });

        // Hero Desc comes in smoothly later
        gsap.from(".hero-desc", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            delay: 1.5,
            ease: "power2.out"
        });

        // Floating node spin variation
        gsap.to(".floating-node", {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "linear"
        });

        // Advanced Scroll Reveal Animations (Elements pop in as you scroll)
        const revealElements = document.querySelectorAll(".gs-reveal");
        
        revealElements.forEach((el) => {
            // Ignore hero titles/desc as they have initialization animations
            if (!el.classList.contains("hero-title") && !el.classList.contains("hero-desc")) {
                gsap.fromTo(el, {
                    y: 100,
                    opacity: 0,
                    scale: 0.85      // scale perfectly pops them into place
                }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.3,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Trigger when the top of element is 85% down viewport
                        toggleActions: "play none none reverse" // Play normally, reverse beautifully when scrolling back up
                    }
                });
            }
        });
    }

    // Scroll Progress Bar Update
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });

    // Toggle Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Chatbot functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById("closeChat");
    const chatBody = document.getElementById("chatBody");
    const chatMsg = document.getElementById("chatMsg");
    const sendChat = document.getElementById("sendChat");

    // Chat auto-open removed per user request

    chatToggle.addEventListener("click", () => {
        chatWindow.classList.toggle("d-none");
        const badge = document.querySelector(".chat-badge");
        if(badge) badge.style.display = "none";
    });

    closeChat.addEventListener("click", () => {
        chatWindow.classList.add("d-none");
    });

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `msg ${sender}`;
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleSend = async () => {
        const text = chatMsg.value.trim();
        if(!text) return;
        
        addMessage(text, "user");
        chatMsg.value = "";

        // Add a temporary typing indicator
        const typingId = "typing-" + Date.now();
        const typingDiv = document.createElement("div");
        typingDiv.className = "msg ai";
        typingDiv.id = typingId;
        typingDiv.innerText = "...";
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Send to Flask Backend API
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            document.getElementById(typingId).remove();
            addMessage(data.reply, "ai");
        } catch(e) {
            document.getElementById(typingId).remove();
            addMessage("Neural networks are offline right now. Please email us.", "ai");
        }
    };

    sendChat.addEventListener("click", handleSend);
    chatMsg.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });

    // --- CONTACT MODAL LOGIC ---
    const contactLinks = document.querySelectorAll('a[href="#contact"], .btn-contact');
    const contactModal = document.getElementById("contactModal");
    const closeContact = document.getElementById("closeContact");
    const contactForm = document.getElementById("contactForm");

    // Make functions global so inline `onclick` works flawlessly
    window.openContactModal = (e) => {
        if(e) e.preventDefault();
        contactModal.classList.add("active");
        
        // Initialize dynamic 3D floating effect
        if (typeof VanillaTilt !== 'undefined' && !contactModal.querySelector('.contact-modal-content').vanillaTilt) {
            VanillaTilt.init(contactModal.querySelector('.contact-modal-content'), {
                max: 3,
                speed: 400,
                glare: true,
                "max-glare": 0.05,
                scale: 1.01
            });
        }
    };

    window.closeContactModal = () => {
        contactModal.classList.remove("active");
    };

    // Listen to "Contact Us" buttons (backup to inline)
    contactLinks.forEach(link => {
        link.addEventListener("click", window.openContactModal);
    });

    // Close on X
    if(closeContact) closeContact.addEventListener("click", window.closeContactModal);

    // Close on outside click
    window.addEventListener("click", (e) => {
        if(e.target === contactModal) window.closeContactModal();
    });

    // Form submit logic
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Show fake success message
            const btn = contactForm.querySelector(".btn-submit");
            const originalText = btn.innerHTML;
            btn.innerHTML = "Message Sent! ✓";
            btn.style.background = "#28a745";
            btn.style.boxShadow = "0 5px 15px rgba(40,167,69,0.4)";
            
            setTimeout(() => {
                closeContactModal();
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.background = "";
                btn.style.boxShadow = "";
            }, 2000);
        });
    }

    // --- NODE DIAGRAM SVG LINES LOGIC ---
    const drawLines = () => {
        const svgContainer = document.getElementById("nodeSvgContainer");
        if (!svgContainer) return;

        // Clear existing lines
        svgContainer.innerHTML = '';

        const centerBrain = document.getElementById("centerBrain");
        if(!centerBrain) return;

        // Since centerBrain is perfectly centered in the wrapper via CSS (top:50%, left:50%),
        // we can mathematically guarantee the center coordinates:
        const centerX = svgContainer.clientWidth / 2;
        const centerY = svgContainer.clientHeight / 2;

        const svgRect = svgContainer.getBoundingClientRect();

        const nodes = document.querySelectorAll(".satellite-node");

        nodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            let dotRect;
            
            if(node.id === "node4" || node.id === "node5" || node.id === "node6") {
                const dot = node.querySelector('.left-dot');
                if(!dot) return;
                dotRect = dot.getBoundingClientRect();
            } else {
                const dot = node.querySelector('.node-dot:not(.left-dot)');
                if(!dot) return;
                dotRect = dot.getBoundingClientRect();
            }

            const startX = dotRect.left - svgRect.left + dotRect.width / 2;
            const startY = dotRect.top - svgRect.top + dotRect.height / 2;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", startX);
            line.setAttribute("y1", startY);
            line.setAttribute("x2", centerX);
            line.setAttribute("y2", centerY);
            line.setAttribute("class", "svg-line");
            svgContainer.appendChild(line);
        });
    };

    // --- AGILE TIMELINE SVG LOGIC ---
    const drawAgileLines = () => {
        const svgContainer = document.getElementById("agileSvgContainer");
        if (!svgContainer) return;
        
        svgContainer.innerHTML = ''; // Clear old lines
        const svgRect = svgContainer.getBoundingClientRect();
        
        const getCenter = (id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const circle = el.querySelector(".step-circle");
            if(!circle) return null;
            const rect = circle.getBoundingClientRect();
            return {
                x: rect.left - svgRect.left + rect.width / 2,
                y: rect.top - svgRect.top + rect.height / 2
            };
        };

        const p1 = getCenter("agile1");
        const p2 = getCenter("agile2");
        const p3 = getCenter("agile3");
        const p4 = getCenter("agile4");
        const p5 = getCenter("agile5");
        const p6 = getCenter("agile6");

        // If elements are stacked functionally on mobile, standard curve might overlap weirdly.
        // We gracefully adapt for Mobile by just drawing straight lines between logical pairs!
        const isMobile = window.innerWidth <= 768;

        if (p1 && p6) {
            const pathId = "agilePathTracked";
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("id", pathId);

            let d = "";
            if(isMobile) {
                d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y}`;
            } else {
                // Smooth bezier right-turn connecting 3 to 4 perfectly
                d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} C ${p3.x + 80} ${p3.y}, ${p4.x + 80} ${p4.y}, ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y}`;
            }
            path.setAttribute("d", d);
            path.setAttribute("class", "agile-path");
            svgContainer.appendChild(path);

            // Add the animated glowing tracking dot!
            const glowDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            glowDot.setAttribute("r", "8");
            glowDot.setAttribute("fill", "#00FFD1"); // Cyan glowing tracking ball
            glowDot.style.filter = "drop-shadow(0 0 10px #00FFD1) drop-shadow(0 0 20px #00FFD1)";
            
            const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            animateMotion.setAttribute("dur", "6s");
            animateMotion.setAttribute("repeatCount", "indefinite");
            
            const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
            // Standard DOM property mapped to xlink:href
            mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + pathId);
            // Fallback for newer parsers overriding NS
            mpath.setAttribute("href", "#" + pathId);
            
            animateMotion.appendChild(mpath);
            glowDot.appendChild(animateMotion);
            
            svgContainer.appendChild(glowDot);
        }
    };

    // Initial draws
    drawLines();
    drawAgileLines();
    
    // Draw initially, and carefully re-draw if images/fonts shift layout
    window.addEventListener("load", () => {
        drawLines();
        drawAgileLines();
        setTimeout(drawLines, 500);
        setTimeout(drawAgileLines, 500);
    });
    
    // Redraw lines on window resize to keep connections anchored
    window.addEventListener("resize", () => {
        drawLines();
        drawAgileLines();
    });
    
});
