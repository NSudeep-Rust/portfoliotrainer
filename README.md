# Jeevan Bagade — Certified Trainer Portfolio (`portfoliotrainer`)

An ultra-modern, high-performance portfolio website for **Jeevan Bagade**, freelance **Certified Trainer** for Cybersecurity, VAPT, SOC & Technology based in Mysore, Karnataka, India.

Built with a clean **Clay White** design system, interactive 3D WebGL particle constellation, scroll-driven interactions, real-time command terminal, and instant workshop scope estimator.

---

## 🌐 Live Deployments & Endpoints

- **Custom Domain (HTTPS via DuckDNS):** [https://jeevan-bagade-trainer.duckdns.org](https://jeevan-bagade-trainer.duckdns.org)
- **AWS CloudFront (Global CDN + HTTPS):** [https://d3vhf0on1qafxv.cloudfront.net](https://d3vhf0on1qafxv.cloudfront.net)
- **AWS S3 Website Endpoint:** [http://jeevan-bagade-trainer.s3-website.ap-south-2.amazonaws.com](http://jeevan-bagade-trainer.s3-website.ap-south-2.amazonaws.com)
- **GitHub Repository:** [https://github.com/NSudeep-Rust/portfoliotrainer](https://github.com/NSudeep-Rust/portfoliotrainer)

---

## 🚀 Key Features & Highlights

1. **Clay White Design System:**
   - Soft porcelain clay aesthetic (`#f1f5f9`) with pillowy pure-white cards (`#ffffff`).
   - Multi-layered soft drop shadows and subtle inner top-bevel highlights for a tactile feel.
   - High-contrast slate typography (`#0f172a` / `#334155`) for crisp legibility.
   - Interactive 3D Card Tilt with specular reflections.

2. **3D Interactive WebGL Core (Three.js):**
   - Rotating geodesic wireframe sphere, octahedron core, orbital rings, and dynamic floating particle constellation.
   - Mouse-parallax reactivity and scroll-driven perspective rotation.
   - Resilient HTML5 2D canvas fallback.

3. **Interactive Security Terminal Simulator:**
   - Real-time Linux shell simulator (`root@jeevan-sec:~#`) supporting interactive commands (`whoami`, `skills`, `workshops`, `certs`, `tools`, `quote`, `contact`, `clear`).
   - Quick command action chips for mobile and desktop one-tap execution.
   - Command history navigation (Up/Down arrow keys).

4. **Interactive Workshop Scope & Quote Estimator:**
   - Dynamic configurator for college HODs, coordinators, and training vendors.
   - Configure format (1-day, 2-day, multi-day FDP), domain tracks, cohort sizes, and location modes.
   - Live updates to total lab hours, VM setup requirements, and auto-fills an official inquiry draft.

5. **Filterable Skills & Practical Lab Matrix:**
   - Filter tabs: VAPT & Offensive, Security Tools, Cloud & AI, DevOps & Python.
   - Instant real-time search filtering across tools and protocols.

6. **On-Campus Photo Gallery & Lightbox:**
   - Authentic workshop captures across Mysore, Bengaluru, Pune, Dharwad, Hubballi, and Hyderabad.
   - Location filtering + full-screen lightbox with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`).

7. **Audio Feedback & IST Clock:**
   - Futuristic subtle audio feedback on button clicks and terminal execution (toggleable in header).
   - Real-time Indian Standard Time (UTC+5:30) digital clock in the footer.

---

## 🛠️ Stack & Technology

- **HTML5:** Semantic architecture, accessible landmarks, and SEO OpenGraph meta tags.
- **CSS3:** Custom design tokens, Claymorphic shadows, responsive grid/flexbox, keyframe animations, 3D CSS transforms.
- **Vanilla JavaScript:** 100% vanilla ES6+, zero build steps, self-contained Three.js local library.
- **AWS Infrastructure:** S3 Bucket (`ap-south-2`), CloudFront Distribution, automated cache invalidation.
- **CI/CD:** Multi-stage GitHub Actions workflow deploying to both GitHub Pages and AWS S3/CloudFront on every push.

---

## 💻 Running Locally

Run a local HTTP server from the root directory:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.
