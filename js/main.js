/**
 * JEEVAN BAGADE — NEXT-GEN CYBERSECURITY PORTFOLIO
 * Core Interactive & 3D WebGL Engine
 */

(function () {
  'use strict';

  // State Management
  const state = {
    audioEnabled: false,
    audioCtx: null,
    currentGalleryIndex: 0,
    galleryItems: [],
    estimator: {
      duration: '2-day',
      track: 'ethical-vapt',
      cohort: 'medium',
      location: 'state'
    }
  };

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIZER (SUBTLE CYBER SOUND FX)
     ========================================================================== */
  function initAudio() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playCyberSound(type) {
    if (!state.audioEnabled || !state.audioCtx) return;

    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(state.audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'cmd') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio error silenced
    }
  }

  function toggleAudio() {
    initAudio();
    state.audioEnabled = !state.audioEnabled;
    const audioToggle = document.getElementById('audio-toggle');
    const mobileAudioToggle = document.getElementById('mobile-audio-toggle');
    const mobileAudioStatus = document.getElementById('mobile-audio-status');

    if (audioToggle) {
      audioToggle.classList.toggle('active', state.audioEnabled);
    }
    if (mobileAudioToggle) {
      mobileAudioToggle.classList.toggle('active', state.audioEnabled);
    }
    if (mobileAudioStatus) {
      mobileAudioStatus.textContent = state.audioEnabled ? 'ON' : 'OFF';
    }
    if (state.audioEnabled) {
      playCyberSound('open');
    }
  }

  const audioToggle = document.getElementById('audio-toggle');
  if (audioToggle) {
    audioToggle.addEventListener('click', toggleAudio);
  }
  const mobileAudioToggle = document.getElementById('mobile-audio-toggle');
  if (mobileAudioToggle) {
    mobileAudioToggle.addEventListener('click', toggleAudio);
  }

  /* ==========================================================================
     2. THREE.JS 3D INTERACTIVE WEBGL BACKGROUND
     ========================================================================== */
  function initWebGLBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    // Check if Three is loaded
    if (typeof THREE === 'undefined') {
      initCanvasFallback(canvas);
      return;
    }

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 40;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 3D Cyber Sphere Group
      const cyberGroup = new THREE.Group();
      scene.add(cyberGroup);

      // Outer Wireframe Icosahedron
      const geomIco = new THREE.IcosahedronGeometry(15, 2);
      const matWire = new THREE.MeshBasicMaterial({
        color: 0x334155,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });
      const wireSphere = new THREE.Mesh(geomIco, matWire);
      cyberGroup.add(wireSphere);

      // Inner Rotating Cyber Octahedron Core
      const geomCore = new THREE.OctahedronGeometry(8, 1);
      const matCore = new THREE.MeshBasicMaterial({
        color: 0x475569,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      });
      const coreMesh = new THREE.Mesh(geomCore, matCore);
      cyberGroup.add(coreMesh);

      // Outer Orbital Ring
      const geomRing = new THREE.RingGeometry(21, 21.4, 64);
      const matRing = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15
      });
      const ringMesh = new THREE.Mesh(geomRing, matRing);
      ringMesh.rotation.x = Math.PI / 2.5;
      cyberGroup.add(ringMesh);

      // Floating Cyber Starfield / Particles
      const particleCount = 750;
      const particleGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color(0x334155);
      const color2 = new THREE.Color(0x64748b);
      const color3 = new THREE.Color(0x10b981);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 120;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 80;

        const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.85,
        vertexColors: true,
        transparent: true,
        opacity: 0.65
      });

      const particles = new THREE.Points(particleGeom, particleMat);
      scene.add(particles);

      // Position group slightly to the right for balance with hero text
      cyberGroup.position.set(16, 2, -10);

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      });

      // Scroll Tracking
      let scrollYOffset = 0;
      window.addEventListener('scroll', () => {
        scrollYOffset = window.scrollY * 0.02;
      }, { passive: true });

      // Animation Loop
      let clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Target interpolation (Lerp)
        targetX += (mouseX * 5 - targetX) * 0.05;
        targetY += (mouseY * 5 - targetY) * 0.05;

        // Group Rotations
        cyberGroup.rotation.y = elapsedTime * 0.15 + targetX * 0.2 + scrollYOffset * 0.1;
        cyberGroup.rotation.x = elapsedTime * 0.08 + targetY * 0.15;
        cyberGroup.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1;

        // Core Pulsing
        coreMesh.rotation.y = -elapsedTime * 0.25;
        coreMesh.rotation.x = elapsedTime * 0.18;
        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.08;
        coreMesh.scale.set(scale, scale, scale);

        // Ring Orbit
        ringMesh.rotation.z = elapsedTime * 0.12;

        // Starfield drift
        particles.rotation.y = elapsedTime * 0.02;
        particles.position.y = -scrollYOffset * 0.5;

        renderer.render(scene, camera);
      }
      animate();

      // Responsive Resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (window.innerWidth < 1024) {
          cyberGroup.position.set(0, 0, -15);
        } else {
          cyberGroup.position.set(16, 2, -10);
        }
      });

      // Initial check for screen width
      if (window.innerWidth < 1024) {
        cyberGroup.position.set(0, 0, -15);
      }

    } catch (err) {
      console.warn('WebGL init fallback triggered:', err);
      initCanvasFallback(canvas);
    }
  }

  // 2D Canvas Fallback in case WebGL is unavailable
  function initCanvasFallback(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dots = [];
    for (let i = 0; i < 60; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.12)';

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /* ==========================================================================
     3. MOUSE GLOW FOLLOWER
     ========================================================================== */
  const mouseGlow = document.getElementById('mouse-glow');
  if (mouseGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateGlow() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      mouseGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(updateGlow);
    }
    updateGlow();
  }

  /* ==========================================================================
     4. 3D CARD TILT & SPECULAR GLARE ENGINE
     ========================================================================== */
  function init3DTiltCards() {
    const cards = document.querySelectorAll('.glass-card-interactive');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${percentX}%`);
        card.style.setProperty('--mouse-y', `${percentY}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /* ==========================================================================
     5. SCROLL-DRIVEN PROGRESS, HEADER & SPY
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }

    if (header) {
      if (winScroll > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // ScrollSpy Active Link Tracking
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => spyObserver.observe(sec));

  /* ==========================================================================
     6. SCROLL REVEALS & STAT NUMERIC COUNTERS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // If it contains counters, trigger them
        const counters = entry.target.querySelectorAll('[data-counter]');
        counters.forEach(animateCounter);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => revealObserver.observe(el));

  function animateCounter(counterEl) {
    if (counterEl.dataset.animated) return;
    counterEl.dataset.animated = 'true';

    const target = parseInt(counterEl.dataset.counter, 10);
    const suffix = counterEl.dataset.suffix || '';
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const current = Math.floor(progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress)));
      counterEl.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counterEl.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  /* ==========================================================================
     7. INTERACTIVE CYBER TERMINAL EMULATOR
     ========================================================================== */
  function initCyberTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const termBody = document.getElementById('terminal-body');
    const chips = document.querySelectorAll('.term-chip');
    if (!input || !output) return;

    const commandHistory = [];
    let historyIndex = -1;

    const commands = {
      help: () => `
Available system commands:
  • whoami     - Display trainer identification & verified credentials
  • skills     - Show all offensive & defensive cybersecurity modules
  • workshops  - Review completed university & corporate workshops
  • certs      - List verified industry & government certifications
  • tools      - Hands-on security software & lab setups taught
  • quote      - Review indicative commercial rates and travel terms
  • contact    - Display email, phone/WhatsApp, and direct links
  • clear      - Clear terminal screen buffer
  • help       - List available commands`,

      whoami: () => `
[IDENTIFICATION]
Trainer:       Jeevan Bagade
Specialty:     Cybersecurity & VAPT Trainer · Cloud & AI Security
Academic:      MCA (MIT World Peace University, Pune)
               BCA (JSS SMI College, Dharwad)
Experience:    3+ Years | 9+ Workshops Delivered Pan-India
Base:          Mysore, Karnataka, India
Languages:     English (Prof), Hindi (Prof), Kannada (Native)`,

      skills: () => `
[CURRICULUM MATRIX]
1. VAPT & Offensive:
   - Ethical Hacking, Web App Pentest, OWASP Top 10, Network Exploits
2. Security Tools Lab:
   - Kali Linux, Burp Suite Pro, Metasploit, Nmap, Wireshark, Splunk
3. Cloud & AI Security:
   - AWS CloudTrail, Azure Defender, IAM Hardening, LLM Security Models
4. Automation & DevOps:
   - Python Exploits, Scapy Packet Crafting, Dockerized Sandbox Labs`,

      workshops: () => `
[DELIVERED WORKSHOPS SUMMARY]
• Hubballi, Karnataka       - Hands-On VAPT & Threat Defense Labs (11 Cohorts)
• Gadag-Betageri, Karnataka - Python Security Automation & Applied AI (5 Cohorts)
• Gangawati, Karnataka      - Applied AI & Computer Vision Keynotes (2 Cohorts)
• Mysore, Karnataka         - Full-Cohort Keynotes & Ethical Hacking Drills (4 Cohorts)
• Dharwad, Karnataka        - BCA Technical Foundations & Network Security Drills
Total: Real photographic workshop documentation across Karnataka engineering cohorts.`,

      certs: () => `
[VERIFIED CERTIFICATIONS & HONORS]
1. Certified Trainer - Cybersecurity, VAPT & Applied Technology
2. Applied AI & Machine Learning Specialization
3. Programming Fundamentals (Python) - Infosys Springboard
4. IT for Business Success - HP LIFE
5. Agile Project Management & Leadership - Certified`,

      tools: () => `
[PRACTICAL LAB TOOLCHAIN]
Kali Linux 2026.x | Burp Suite Professional | Nmap | Wireshark
Metasploit Framework | Splunk SIEM | OWASP ZAP | Nessus / OpenVAS
Python 3 / Scapy | Docker Containers | Oracle VirtualBox / VMware`,

      quote: () => `
[COMMERCIAL GUIDELINES]
• Trainer fees: Negotiable daily / hourly rates based on duration & syllabus
• On-site travel outside Mysore: Travel + accommodation + food as agreed
• Payment milestones: 50% advance to block dates, 50% on completion
Type 'contact' or visit the #estimator section to build a tailored proposal!`,

      contact: () => `
[DIRECT CONTACT CHANNELS]
Email:         jeevndeepbagade@gmail.com
WhatsApp/Tel:  +91 6361536991
LinkedIn:      https://www.linkedin.com/in/jeevan-bagade
Location:      Mysore, Karnataka, India · Available Pan-India`
    };

    function executeCommand(rawCmd) {
      const cmd = rawCmd.trim().toLowerCase();
      playCyberSound('cmd');

      if (cmd === '') return;

      commandHistory.push(cmd);
      historyIndex = commandHistory.length;

      if (cmd === 'clear') {
        output.innerHTML = '';
        return;
      }

      const entry = document.createElement('div');
      entry.className = 'terminal-entry';

      const cmdEcho = document.createElement('div');
      cmdEcho.className = 'terminal-cmd-echo';
      cmdEcho.innerHTML = `<span class="terminal-prompt-user">jeevan@kali</span>:<span class="terminal-prompt-path">~#</span> <span>${escapeHTML(rawCmd)}</span>`;

      const resp = document.createElement('div');
      resp.className = 'terminal-response';

      if (commands[cmd]) {
        resp.textContent = commands[cmd]();
      } else {
        resp.innerHTML = `<span style="color: #ef4444;">bash: ${escapeHTML(cmd)}: command not found.</span> Type <strong style="color: var(--cyber-cyan);">help</strong> for valid commands.`;
      }

      entry.appendChild(cmdEcho);
      entry.appendChild(resp);
      output.appendChild(entry);

      if (termBody) {
        termBody.scrollTop = termBody.scrollHeight;
      }
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          input.value = '';
        }
      }
    });

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cmd = chip.dataset.cmd;
        if (cmd) {
          executeCommand(cmd);
          if (window.innerWidth > 768) {
            input.focus();
          }
        }
      });
    });

    // Run 'whoami' on initial load to show life
    setTimeout(() => {
      executeCommand('whoami');
    }, 600);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  /* ==========================================================================
     8. INTERACTIVE WORKSHOP ESTIMATOR
     ========================================================================== */
  function initWorkshopEstimator() {
    const durationBtns = document.querySelectorAll('#opt-duration .calc-choice-btn');
    const trackBtns = document.querySelectorAll('#opt-track .calc-choice-btn');
    const cohortBtns = document.querySelectorAll('#opt-cohort .calc-choice-btn');
    const locBtns = document.querySelectorAll('#opt-location .calc-choice-btn');

    const previewTitle = document.getElementById('preview-title');
    const delivHours = document.getElementById('deliv-hours');
    const delivLab = document.getElementById('deliv-lab');
    const delivExercises = document.getElementById('deliv-exercises');
    const delivTerms = document.getElementById('deliv-terms');
    const inquireBtn = document.getElementById('estimator-inquire-btn');

    function updateGroup(buttons, stateKey) {
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.estimator[stateKey] = btn.dataset.val;
          playCyberSound('click');
          renderEstimator();
        });
      });
    }

    updateGroup(durationBtns, 'duration');
    updateGroup(trackBtns, 'track');
    updateGroup(cohortBtns, 'cohort');
    updateGroup(locBtns, 'location');

    function renderEstimator() {
      const { duration, track, cohort, location } = state.estimator;

      let title = '';
      let hours = '';
      let exercises = '';
      let terms = '';

      // Hours & format
      if (duration === '1-day') {
        hours = '<strong>6–8 Hours</strong> of Intensive Crash Bootcamp & Live Exploitation';
        exercises = '<strong>6 Core Attack Scenarios</strong> (Web Recon, Burp Suite, SQLi, Payload Injection)';
      } else if (duration === '2-day') {
        hours = '<strong>14–16 Hours</strong> of In-Depth Hands-On Lab Work & CTF Contest';
        exercises = '<strong>14+ Real-World Attack & Defense Scenarios</strong> with full sandbox VMs';
      } else {
        hours = '<strong>30+ Hours</strong> Multi-Day Faculty/Student FDP with Capstone Projects';
        exercises = '<strong>25+ Modules</strong> including Cloud Hardening, SIEM Analytics & Python Automation';
      }

      // Track titles
      if (track === 'ethical-vapt') {
        title = `${duration === '1-day' ? '1-Day' : duration === '2-day' ? '2-Day' : 'Comprehensive'} Ethical Hacking & VAPT Program`;
      } else if (track === 'soc-siem') {
        title = `${duration === '1-day' ? '1-Day' : duration === '2-day' ? '2-Day' : 'Intensive'} SOC Operations, SIEM & Threat Hunting`;
      } else if (track === 'cloud-sec') {
        title = `${duration === '1-day' ? '1-Day' : duration === '2-day' ? '2-Day' : 'Advanced'} Cloud Infrastructure & AI Security Training`;
      } else {
        title = `Full-Spectrum Cybersecurity & Defensive Engineering Bootcamp`;
      }

      // Terms based on location
      if (location === 'local') {
        terms = 'Commercial terms: <strong>Negotiable daily trainer fee</strong>. Local Mysore campus (No accommodation required)';
      } else if (location === 'state') {
        terms = 'Commercial terms: <strong>Negotiable daily rate</strong> + travel & accommodation within Karnataka as agreed';
      } else {
        terms = 'Commercial terms: <strong>Negotiable daily rate</strong> + interstate flight/train & campus stay';
      }

      if (previewTitle) previewTitle.textContent = title;
      if (delivHours) delivHours.innerHTML = hours;
      if (delivExercises) delivExercises.innerHTML = exercises;
      if (delivTerms) delivTerms.innerHTML = terms;
    }

    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => {
        playCyberSound('open');
        const formMsg = document.getElementById('form-msg');
        const formType = document.getElementById('form-type');

        if (formMsg) {
          formMsg.value = `I would like to inquire about the ${previewTitle ? previewTitle.textContent : 'Cybersecurity Workshop'}.\n- Expected Cohort: ${state.estimator.cohort}\n- Location Mode: ${state.estimator.location}\n- Preferred Dates: [Please specify preferred dates]`;
        }
        if (formType) {
          if (state.estimator.duration === 'multi-day') {
            formType.value = 'Short-Term Training Program (STTP/FDP)';
          } else {
            formType.value = '1-2 Days Hands-On Workshop';
          }
        }

        const contactSec = document.getElementById('contact');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    renderEstimator();
  }

  /* ==========================================================================
     9. SKILLS FILTER & REAL-TIME SEARCH MATRIX
     ========================================================================== */
  function initSkillsMatrix() {
    const filterBtns = document.querySelectorAll('#skill-filters .filter-btn');
    const searchInput = document.getElementById('skills-search');
    const cards = document.querySelectorAll('#skills-container .skill-card');

    let currentFilter = 'all';
    let searchQuery = '';

    function filterCards() {
      cards.forEach((card) => {
        const cat = card.dataset.category || '';
        const tags = (card.dataset.tags || '').toLowerCase();
        const text = card.textContent.toLowerCase();

        const matchesCat = currentFilter === 'all' || cat === currentFilter;
        const matchesSearch = searchQuery === '' || tags.includes(searchQuery) || text.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 20);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        playCyberSound('click');
        filterCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterCards();
      });
    }
  }

  /* ==========================================================================
     10. 3D CYLINDRICAL LOOKBOOK ENGINE & GLASS LIGHTBOX MODAL
     Authentic Workshop Photographic Documentation from Real Karnataka Cohorts:
     Hubballi, Gadag-Betageri, Gangawati & Mysore.
     ========================================================================== */
  const LOOKBOOK_PHOTOS = [
    // HUBBALLI (11 photos)
    {
      id: "hubballi-01",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Hands-On Lab Session",
      desc: "Practical command-line networking & security fundamentals in dedicated campus computer lab.",
      src: "assets/images/lookbook/hubballi-01.jpg"
    },
    {
      id: "hubballi-02",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Lab Architecture & Setup",
      desc: "Assisting student workstations with Kali Linux and toolchain configurations.",
      src: "assets/images/lookbook/hubballi-02.jpg"
    },
    {
      id: "hubballi-03",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Network Scanning & Analysis",
      desc: "Live packet interception and Wireshark / Nmap scanning exercises.",
      src: "assets/images/lookbook/hubballi-03.jpg"
    },
    {
      id: "hubballi-04",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Interactive Defense Keynote",
      desc: "Explaining cyber threat vectors and defensive countermeasures to student cohort.",
      src: "assets/images/lookbook/hubballi-04.jpg"
    },
    {
      id: "hubballi-05",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Sep 2026",
      title: "One-on-One Lab Mentoring",
      desc: "Guiding students through vulnerability assessment lab challenges.",
      src: "assets/images/lookbook/hubballi-05.jpg"
    },
    {
      id: "hubballi-06",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Logic & Functions Deep-Dive",
      desc: "Interactive projection walkthrough of automated security scripting.",
      src: "assets/images/lookbook/hubballi-06.jpg"
    },
    {
      id: "hubballi-07",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Student Q&A & Discussion",
      desc: "Engaging technical discussion on modern cybersecurity careers and certifications.",
      src: "assets/images/lookbook/hubballi-07.jpg"
    },
    {
      id: "hubballi-08",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Advanced Defense Boot Camp",
      desc: "Full computer lab cohort executing multi-system attack and defense scenarios.",
      src: "assets/images/lookbook/hubballi-08.jpg"
    },
    {
      id: "hubballi-09",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Threat Hunting Demonstration",
      desc: "Live log analysis and anomaly detection demonstrated on student terminals.",
      src: "assets/images/lookbook/hubballi-09.jpg"
    },
    {
      id: "hubballi-10",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Hands-On Practical Drills",
      desc: "Supervised technical hands-on lab with dual-monitor instructor station.",
      src: "assets/images/lookbook/hubballi-10.jpg"
    },
    {
      id: "hubballi-11",
      cityKey: "hubballi",
      city: "Hubballi",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Penetration Testing Lab",
      desc: "Coordinating complex multi-stage vulnerability verification drills.",
      src: "assets/images/lookbook/hubballi-11.jpg"
    },

    // GADAG-BETAGERI (5 photos)
    {
      id: "gadag-01",
      cityKey: "gadag",
      city: "Gadag-Betageri",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Python & Security Automation",
      desc: "Fundamental scripting algorithms for security telemetry and tools.",
      src: "assets/images/lookbook/gadag-01.jpg"
    },
    {
      id: "gadag-02",
      cityKey: "gadag",
      city: "Gadag-Betageri",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Machine Learning Fundamentals",
      desc: "Data preprocessing and model training for anomaly detection in cyber.",
      src: "assets/images/lookbook/gadag-02.jpg"
    },
    {
      id: "gadag-03",
      cityKey: "gadag",
      city: "Gadag-Betageri",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Interactive Lab Facilitation",
      desc: "Walkthrough of defensive programming patterns and vulnerability mitigation.",
      src: "assets/images/lookbook/gadag-03.jpg"
    },
    {
      id: "gadag-04",
      cityKey: "gadag",
      city: "Gadag-Betageri",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Decision Trees & Applied AI",
      desc: "Mathematical concepts simplified for practical software and cybersecurity analysis.",
      src: "assets/images/lookbook/gadag-04.jpg"
    },
    {
      id: "gadag-05",
      cityKey: "gadag",
      city: "Gadag-Betageri",
      state: "Karnataka",
      date: "Sep 2026",
      title: "Capstone Workshop & Review",
      desc: "Reviewing student implementations and verifying lab results.",
      src: "assets/images/lookbook/gadag-05.jpg"
    },

    // GANGAWATI (2 photos)
    {
      id: "gangawati-01",
      cityKey: "gangawati",
      city: "Gangawati",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Applied AI & Computer Vision",
      desc: "Seminar on OpenCV, real-time image processing, and intelligent algorithms.",
      src: "assets/images/lookbook/gangawati-01.jpg"
    },
    {
      id: "gangawati-02",
      cityKey: "gangawati",
      city: "Gangawati",
      state: "Karnataka",
      date: "Oct 2026",
      title: "AI Technology Lecture",
      desc: "Interactive keynote addressing students on future AI and cybersecurity convergence.",
      src: "assets/images/lookbook/gangawati-02.jpg"
    },

    // MYSORE (4 photos)
    {
      id: "mysore-01",
      cityKey: "mysore",
      city: "Mysore",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Full-Cohort Keynote Session",
      desc: "Lecture on triggers, node automation, and modern web infrastructure.",
      src: "assets/images/lookbook/mysore-01.jpg"
    },
    {
      id: "mysore-02",
      cityKey: "mysore",
      city: "Mysore",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Interactive Lab Mentorship",
      desc: "Engaging computer lab cohort with practical hands-on problem solving.",
      src: "assets/images/lookbook/mysore-02.jpg"
    },
    {
      id: "mysore-03",
      cityKey: "mysore",
      city: "Mysore",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Auditorium Technology Keynote",
      desc: "Addressing a full auditorium of engineering students on industry cybersecurity requirements.",
      src: "assets/images/lookbook/mysore-03.jpg"
    },
    {
      id: "mysore-04",
      cityKey: "mysore",
      city: "Mysore",
      state: "Karnataka",
      date: "Oct 2026",
      title: "Ethical Hacking: Digital Investigation",
      desc: "Comprehensive workshop on digital forensics, ethical hacking tradecraft, and threat investigation.",
      src: "assets/images/lookbook/mysore-04.jpg"
    }
  ];

  const CITY_ORDER = ['hubballi', 'gadag', 'gangawati', 'mysore'];

  const CITY_INFO = {
    'hubballi': {
      title: 'Hubballi, Karnataka',
      meta: 'Sept & Oct 2026 · Hands-On VAPT & Threat Defense Labs',
      count: 11
    },
    'gadag': {
      title: 'Gadag-Betageri, Karnataka',
      meta: 'Sept 2026 · Python Automation & Applied AI Security Labs',
      count: 5
    },
    'gangawati': {
      title: 'Gangawati, Karnataka',
      meta: 'Oct 2026 · Applied AI & Computer Vision Keynotes',
      count: 2
    },
    'mysore': {
      title: 'Mysore, Karnataka',
      meta: 'Oct 2026 · Full-Cohort Keynotes & Ethical Hacking Drills',
      count: 4
    },
    'all': {
      title: 'All Karnataka Cohorts',
      meta: 'Hubballi · Gadag-Betageri · Gangawati · Mysore (22 Total Photos)',
      count: 22
    }
  };

  function initLookbookCylinder() {
    const viewport = document.getElementById('lookbook-viewport');
    const stage = document.getElementById('lookbook-stage');
    if (!viewport || !stage) return;

    const cityTabs = document.querySelectorAll('.lookbook-tab');
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    const prevBtn = document.getElementById('cylinder-prev');
    const nextBtn = document.getElementById('cylinder-next');
    const dotsContainer = document.getElementById('cylinder-dots');
    const hudCity = document.getElementById('lb-hud-city');
    const hudMeta = document.getElementById('lb-hud-meta');
    const counterEl = document.getElementById('lb-counter');

    // Lightbox modal elements
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-full-img');
    const modalLoc = document.getElementById('lightbox-loc');
    const modalCap = document.getElementById('lightbox-caption');
    const modalClose = document.getElementById('lightbox-close');
    const lbModalPrev = document.getElementById('lightbox-prev');
    const lbModalNext = document.getElementById('lightbox-next');

    let currentCity = 'hubballi';
    let currentIndex = 0;
    let currentPhotos = LOOKBOOK_PHOTOS.filter((p) => p.cityKey === currentCity);
    let isTransitioning = false;
    let modalPhotoIndex = 0;

    function getCylinderDimensions() {
      const width = window.innerWidth;
      if (width < 480) {
        return { radius: 300, stepAngle: 36 };
      } else if (width < 768) {
        return { radius: 380, stepAngle: 32 };
      } else if (width < 1024) {
        return { radius: 480, stepAngle: 30 };
      } else {
        return { radius: 560, stepAngle: 28 };
      }
    }

    function renderStageCards() {
      stage.innerHTML = '';
      currentPhotos.forEach((photo, idx) => {
        const card = document.createElement('div');
        card.className = 'cylinder-card';
        card.dataset.index = idx;
        card.dataset.photoId = photo.id;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${photo.title} - ${photo.city}`);

        card.innerHTML = `
          <img class="cylinder-card-img" src="${photo.src}" alt="${photo.title} - ${photo.city}" loading="lazy">
          <div class="cylinder-card-overlay">
            <div class="cylinder-card-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${photo.city}</span>
            </div>
            <h3 class="cylinder-card-title">${photo.title}</h3>
            <p class="cylinder-card-desc">${photo.desc}</p>
            <span class="cylinder-card-date">${photo.date} · Real Workshop Drills</span>
          </div>
        `;

        card.addEventListener('click', () => {
          if (idx === currentIndex) {
            openLightbox(idx);
          } else {
            playCyberSound('click');
            currentIndex = idx;
            updateCardTransforms();
          }
        });

        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (idx === currentIndex) {
              openLightbox(idx);
            } else {
              currentIndex = idx;
              updateCardTransforms();
            }
          }
        });

        stage.appendChild(card);
      });
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      currentPhotos.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `cyl-dot ${idx === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to photo ${idx + 1}`);
        dot.addEventListener('click', () => {
          playCyberSound('click');
          currentIndex = idx;
          updateCardTransforms();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateCardTransforms() {
      const cards = stage.querySelectorAll('.cylinder-card');
      const dims = getCylinderDimensions();
      const radius = dims.radius;
      const stepAngle = dims.stepAngle;

      cards.forEach((card, idx) => {
        const rel = idx - currentIndex;
        const angle = rel * stepAngle;
        const absAngle = Math.abs(angle);

        if (absAngle > 95) {
          card.style.opacity = '0';
          card.style.visibility = 'hidden';
          card.style.pointerEvents = 'none';
          card.style.transform = `rotateY(${angle > 0 ? 95 : -95}deg) translateZ(${radius}px) scale(0.6)`;
          card.classList.remove('active');
        } else {
          card.style.visibility = 'visible';
          card.style.pointerEvents = 'auto';

          let scale = 1.0;
          let opacity = 1.0;
          let zIndex = 25 - Math.abs(rel);
          let filter = 'none';

          if (rel === 0) {
            scale = 1.05;
            opacity = 1.0;
            zIndex = 35;
            filter = 'drop-shadow(0 20px 35px rgba(2, 132, 199, 0.25))';
            card.classList.add('active');
          } else {
            card.classList.remove('active');
            scale = Math.max(0.72, 1 - absAngle / 280);
            opacity = Math.max(0.2, 1 - absAngle / 85);
            const blurAmount = Math.min(3, absAngle / 25);
            const brightness = Math.max(0.65, 1 - absAngle / 180);
            filter = `blur(${blurAmount.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;
          }

          card.style.zIndex = zIndex;
          card.style.opacity = opacity.toFixed(2);
          card.style.filter = filter;
          card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale.toFixed(3)})`;
        }
      });

      // Update counter
      if (counterEl && currentPhotos.length > 0) {
        counterEl.textContent = `Photo ${currentIndex + 1} of ${currentPhotos.length}`;
      }

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.cyl-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function switchCity(newCity, targetIndex = 0) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentCity = newCity;

      // Animate stage exit
      stage.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      stage.style.opacity = '0.15';
      const dims = getCylinderDimensions();
      stage.style.transform = `translateZ(-${dims.radius * 0.75}px) scale(0.92)`;

      // Update tabs
      cityTabs.forEach((tab) => {
        const isAct = tab.dataset.city === newCity;
        tab.classList.toggle('active', isAct);
        tab.setAttribute('aria-selected', isAct ? 'true' : 'false');
      });

      // Update pipeline steps
      pipelineSteps.forEach((step) => {
        step.classList.toggle('active', step.dataset.pipelineCity === newCity);
      });

      // Update HUD info
      const info = CITY_INFO[newCity] || CITY_INFO['all'];
      if (hudCity) hudCity.textContent = info.title;
      if (hudMeta) hudMeta.textContent = info.meta;

      setTimeout(() => {
        if (newCity === 'all') {
          currentPhotos = [...LOOKBOOK_PHOTOS];
        } else {
          currentPhotos = LOOKBOOK_PHOTOS.filter((p) => p.cityKey === newCity);
        }

        currentIndex = Math.min(targetIndex, currentPhotos.length - 1);
        if (currentIndex < 0) currentIndex = 0;

        renderStageCards();
        buildDots();

        // Animate stage entrance
        stage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        stage.style.opacity = '1';
        stage.style.transform = `translateZ(-${dims.radius * 0.75}px) scale(1)`;

        updateCardTransforms();

        setTimeout(() => {
          isTransitioning = false;
        }, 300);
      }, 200);
    }

    function nextCard() {
      if (isTransitioning) return;
      playCyberSound('click');

      if (currentIndex < currentPhotos.length - 1) {
        currentIndex++;
        updateCardTransforms();
      } else {
        // Reached end of current city! Move smoothly to next city in order
        if (currentCity === 'all') {
          currentIndex = 0;
          updateCardTransforms();
        } else {
          playCyberSound('open');
          const curIdx = CITY_ORDER.indexOf(currentCity);
          const nextCity = CITY_ORDER[(curIdx + 1) % CITY_ORDER.length];
          switchCity(nextCity, 0);
        }
      }
    }

    function prevCard() {
      if (isTransitioning) return;
      playCyberSound('click');

      if (currentIndex > 0) {
        currentIndex--;
        updateCardTransforms();
      } else {
        // Reached start of current city! Move smoothly to previous city's last photo
        if (currentCity === 'all') {
          currentIndex = currentPhotos.length - 1;
          updateCardTransforms();
        } else {
          playCyberSound('open');
          const curIdx = CITY_ORDER.indexOf(currentCity);
          const prevCity = CITY_ORDER[(curIdx - 1 + CITY_ORDER.length) % CITY_ORDER.length];
          const prevPhotos = LOOKBOOK_PHOTOS.filter((p) => p.cityKey === prevCity);
          switchCity(prevCity, Math.max(0, prevPhotos.length - 1));
        }
      }
    }

    // Lightbox modal logic
    function openLightbox(photoIndex) {
      if (!modal || photoIndex < 0 || photoIndex >= currentPhotos.length) return;
      modalPhotoIndex = photoIndex;
      const photo = currentPhotos[photoIndex];

      playCyberSound('open');
      modalImg.src = photo.src;
      modalImg.alt = `${photo.title} - ${photo.city}, ${photo.state}`;
      modalLoc.textContent = `${photo.city}, ${photo.state} · ${photo.date}`;
      modalCap.textContent = `${photo.title} — ${photo.desc}`;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!modal) return;
      playCyberSound('click');
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function nextLightboxPhoto() {
      modalPhotoIndex = (modalPhotoIndex + 1) % currentPhotos.length;
      openLightbox(modalPhotoIndex);
    }

    function prevLightboxPhoto() {
      modalPhotoIndex = (modalPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
      openLightbox(modalPhotoIndex);
    }

    if (modalClose) modalClose.addEventListener('click', closeLightbox);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
      });
    }
    if (lbModalPrev) {
      lbModalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        playCyberSound('click');
        prevLightboxPhoto();
      });
    }
    if (lbModalNext) {
      lbModalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        playCyberSound('click');
        nextLightboxPhoto();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!modal || !modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightboxPhoto();
      if (e.key === 'ArrowRight') nextLightboxPhoto();
    });

    // Arrow button listeners
    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    if (nextBtn) nextBtn.addEventListener('click', nextCard);

    // City tab listeners
    cityTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const city = tab.dataset.city;
        if (city === currentCity) return;
        playCyberSound('click');
        switchCity(city, 0);
      });
    });

    // Pipeline step listeners
    pipelineSteps.forEach((step) => {
      step.addEventListener('click', () => {
        const city = step.dataset.pipelineCity;
        if (city === currentCity) return;
        playCyberSound('click');
        switchCity(city, 0);
      });
    });

    // Wheel listener with throttle
    let lastWheelTime = 0;
    viewport.addEventListener('wheel', (e) => {
      const now = Date.now();
      if (now - lastWheelTime < 320) {
        e.preventDefault();
        return;
      }
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 18) {
        e.preventDefault();
        lastWheelTime = now;
        if (delta > 0) {
          nextCard();
        } else {
          prevCard();
        }
      }
    }, { passive: false });

    // Touch swipe support
    let touchStartX = 0;
    let isTouchSwiping = false;
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        isTouchSwiping = true;
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (!isTouchSwiping) return;
      isTouchSwiping = false;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (diffX < -40) {
        nextCard();
      } else if (diffX > 40) {
        prevCard();
      }
    }, { passive: true });

    // Mouse drag support
    let mouseStartX = 0;
    let isMouseDown = false;
    viewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('.cylinder-arrow-btn') || e.target.closest('.cyl-dot')) return;
      mouseStartX = e.clientX;
      isMouseDown = true;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = e.clientX - mouseStartX;
      if (diffX < -45) {
        nextCard();
      } else if (diffX > 45) {
        prevCard();
      }
    });

    // Window resize handler
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dims = getCylinderDimensions();
        stage.style.transform = `translateZ(-${dims.radius * 0.75}px)`;
        updateCardTransforms();
      }, 120);
    });

    // Initial setup
    const initialDims = getCylinderDimensions();
    stage.style.transform = `translateZ(-${initialDims.radius * 0.75}px)`;
    renderStageCards();
    buildDots();
    updateCardTransforms();
  }

  function initCampusGallery() {
    initLookbookCylinder();
  }

  /* ==========================================================================
     11. FAQ ACCORDION INTERACTIVITY
     ========================================================================== */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        playCyberSound('click');

        // Close others
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ==========================================================================
     12. INQUIRY FORM SUBMISSION HANDLER (DIRECT INBOX DELIVERY)
     ========================================================================== */
  function initInquiryForm() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;

    const submitBtn = document.getElementById('form-submit-btn');
    const submitLabel = document.getElementById('form-submit-label');
    const feedbackBox = document.getElementById('form-feedback-container');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      playCyberSound('cmd');

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const org = document.getElementById('form-org').value.trim() || 'Not specified';
      const type = document.getElementById('form-type').value;
      const msg = document.getElementById('form-msg').value.trim();

      if (!name || !email || !msg) return;

      // Loading UI State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.75';
      }
      if (submitLabel) {
        submitLabel.textContent = 'Sending to Jeevan...';
      }
      if (feedbackBox) {
        feedbackBox.style.display = 'none';
        feedbackBox.innerHTML = '';
      }

      const payload = {
        name: name,
        email: email,
        institution: org,
        engagement_type: type,
        requirements_and_dates: msg,
        _subject: `New Workshop Proposal Request: ${name} (${org})`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/jeevndeepbagade@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
          playCyberSound('click');
          form.reset();

          if (feedbackBox) {
            feedbackBox.style.display = 'block';
            feedbackBox.innerHTML = `
              <div class="clay-card" style="padding: 1.5rem; text-align: center; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 18px; margin-top: 1rem;">
                <div style="width: 46px; height: 46px; background: #22c55e; color: #fff; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; box-shadow: 0 8px 16px -4px rgba(34, 197, 94, 0.4);">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h4 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: #166534; margin-bottom: 0.4rem;">Inquiry Sent Successfully!</h4>
                <p style="font-size: 0.9rem; color: #15803d; line-height: 1.5; margin-bottom: 1rem;">
                  Thank you, <strong>${name}</strong>. Your proposal request has been delivered directly to <strong>jeevndeepbagade@gmail.com</strong>.<br>
                  Jeevan will review your requirements and respond within 12–24 hours.
                </p>
                <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                  <a href="https://wa.me/916361536991?text=${encodeURIComponent('Hi Jeevan, I just submitted a workshop proposal request for ' + org + ' via your website.')}" target="_blank" rel="noopener" class="btn btn-sm btn-outline" style="border-color: #22c55e; color: #15803d;">
                    Ping on WhatsApp (+91 6361536991)
                  </a>
                </div>
              </div>
            `;
          }
        } else {
          throw new Error('Submission rejected by gateway');
        }
      } catch (err) {
        console.warn('Background submission failed, triggering direct mailto fallback:', err);
        // Fallback: Open mailto directly
        const subject = encodeURIComponent(`Training Inquiry: ${type} - ${name} (${org})`);
        const body = encodeURIComponent(
          `Dear Jeevan,\n\n` +
          `I would like to schedule a cybersecurity training engagement for our institution.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Institution: ${org}\n` +
          `Engagement: ${type}\n\n` +
          `Requirements:\n${msg}\n\n` +
          `Best regards,\n${name}`
        );
        window.location.href = `mailto:jeevndeepbagade@gmail.com?subject=${subject}&body=${body}`;

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <div class="clay-card" style="padding: 1rem; text-align: center; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; margin-top: 1rem;">
              <p style="font-size: 0.88rem; color: #1e40af; margin-bottom: 0.5rem;">
                Opening your email client to send to <strong>jeevndeepbagade@gmail.com</strong>...
              </p>
              <a href="https://wa.me/916361536991?text=${encodeURIComponent('Hi Jeevan, I would like to schedule a training for ' + org + ': ' + msg)}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
                Or Send via WhatsApp
              </a>
            </div>
          `;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
        if (submitLabel) {
          submitLabel.textContent = 'Send Proposal Request';
        }
      }
    });
  }

  /* ==========================================================================
     13. MOBILE MENU DRAWER
     ========================================================================== */
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-drawer .btn');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      playCyberSound('click');
      drawer.classList.toggle('open', !isOpen);
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     14. LIVE MYSORE IST CLOCK & COPYRIGHT YEAR
     ========================================================================== */
  function initClock() {
    const clockEl = document.getElementById('ist-clock');
    const yearEl = document.getElementById('copyright-year');

    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    if (!clockEl) return;

    function updateIST() {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const now = new Date().toLocaleTimeString('en-US', options);
      clockEl.textContent = `Mysore, Karnataka · IST: ${now}`;
    }
    updateIST();
    setInterval(updateIST, 1000);
  }

  /* ==========================================================================
     INITIALIZE ON DOM CONTENT LOADED
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initWebGLBackground();
    init3DTiltCards();
    initCyberTerminal();
    initWorkshopEstimator();
    initSkillsMatrix();
    initLookbookCylinder();
    initFAQ();
    initInquiryForm();
    initMobileMenu();
    initClock();
  });

})();
