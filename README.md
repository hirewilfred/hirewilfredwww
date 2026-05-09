# Hire Wilfred — The AI Staffing Agency

Canada's AI staffing agency. Pre-trained AI employees for sales, marketing, finance, legal, and admin — placed in 48 hours, hosted on Canadian soil, at one-third the salary of a human hire.

## What's in this repo

Static landing site for `hirewilfred.ai`.

- `index.html` — single-page marketing site (hero, roster, salary guide, ROI calculator, sovereignty section, pricing, footer)
- `style.css` — design system (orange / black / soft yellow palette)
- `script.js` — smooth scroll, scroll animations, live ROI calculator
- `*.png` / `*.jpg` — candidate portraits and hero imagery

## Sections

1. **Hero** — framed Patria-style layout with eyebrow label, "Hire a smarter workforce" headline, and three contrast cards (rating, video hook, savings stat)
2. **A staffing firm, reinvented** — Robert Half analogy + Canadian wedge
3. **Meet the Roster** — 6-card mosaic of named AI employees (Claire, Sam, Olivia, David, Maya, Theo)
4. **Salary Guide** — AI vs. human (loaded) cost table with annual savings %
5. **ROI Calculator** — interactive: pick role + seat count + province, see live savings
6. **Canadian Wedge** — PIPEDA / Law 25 / data residency
7. **Industries** — Legal, Healthcare/Dental, Financial, MSP, Gov/Edu, Pro Services
8. **How a placement works** — 6-step staffing-agency vs. Wilfred comparison
9. **Pricing** — Junior / Senior / Manager / Sovereign tiers (CAD)
10. **CTA + footer**

## Run locally

It's a static site — open `index.html` directly, or serve from any static host:

```bash
python -m http.server 8000
# or
npx serve .
```

## Stack (planned)

- **Compute & data:** Azure Canada Central (Container Apps, Postgres Flexible Server, Blob, Key Vault)
- **Inference:** AWS Bedrock (ca-central-1) for Claude — sovereignty path
- **Orchestration:** n8n self-hosted + Antigravity agent runtime
- **Observability:** Langfuse + Azure Monitor
- **Frontend (next):** Next.js App Router for tenant portal
