import os
import glob

cwd = 'c:/Users/Vince Greco/Projects/HireWilfred'

# 1. Update index.html
with open(os.path.join(cwd, 'index.html'), 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '''<title>Hire Wilfred | Canada's AI Workforce Conductor</title>''',
    '''<title>AI Staffing & Workforce Solutions in Canada | Hire Wilfred</title>'''
)

content = content.replace(
    '''<meta name="description" content="Wilfred is Canada's AI workforce conductor. He hires, manages, and replaces an entire team of pre-trained AI employees for you — sales, marketing, finance, legal, admin. Canadian-hosted, CAD-billed, PIPEDA-ready.">''',
    '''<meta name="description" content="Looking to scale without headcount? Hire Wilfred provides fully managed AI employees (SDRs, Bookkeepers, Receptionists) for Canadian SMEs and HR firms. Based in Hamilton & Oakville. Packages from $2,000/mo.">'''
)

content = content.replace(
    '''                <h1 class="hero-title reveal-item delay-100 reveal-active">
                    Fill the gap.<br>Not the headcount.
                </h1>''',
    '''                <h1 class="hero-title reveal-item delay-100 reveal-active">
                    Fill the gap.<br>Not the headcount.
                </h1>
                <h2 class="hero-subtitle reveal-item delay-200 reveal-active" style="font-size: 1.25rem; font-weight: 500; color: rgba(255,255,255,0.85); margin: 0 0 1.5rem 0; line-height: 1.4;">
                    The Fully Managed AI Staffing Agency for Canadian SMEs
                </h2>'''
)

content = content.replace(
    '''<p>&copy; 2026 Wilfred AI Staffing Inc. Made in Canada. Hosted in Canada.</p>''',
    '''<p>&copy; 2026 Wilfred AI Staffing Inc. Headquartered in Hamilton, Ontario. Serving SMEs across Canada.</p>'''
)

content = content.replace(
    '''<h2 class="section-title light">Your clients need this work done.<br>You don't need a new competitor.</h2>''',
    '''<h2 class="section-title light">AI Staffing Partner Program for<br>Canadian HR &amp; Consulting Firms.</h2>'''
)

# Insert schema markup before </head>
schema = '''
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Hire Wilfred",
      "image": "https://hirewilfred.ai/wilfred_portrait.png",
      "@id": "",
      "url": "https://hirewilfred.ai",
      "telephone": "",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hamilton",
        "addressRegion": "ON",
        "addressCountry": "CA"
      },
      "priceRange": "$2000-$5000",
      "description": "Hire Wilfred provides fully managed AI employees (SDRs, Bookkeepers, Receptionists) for Canadian SMEs and HR firms.",
      "areaServed": ["Hamilton", "Burlington", "Oakville", "Canada"]
    }
    </script>
'''
content = content.replace('</head>', schema + '</head>')

with open(os.path.join(cwd, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(content)


# 2. Update partners.html
with open(os.path.join(cwd, 'partners.html'), 'r', encoding='utf-8') as f:
    content_p = f.read()

content_p = content_p.replace(
    '''<title>Hire Wilfred | Canada's AI Workforce Conductor</title>''',
    '''<title>AI Workforce Partner Program for HR Firms | Hire Wilfred</title>'''
)

content_p = content_p.replace(
    '''<meta name="description" content="Wilfred is Canada's AI workforce conductor. He hires, manages, and replaces an entire team of pre-trained AI employees for you — sales, marketing, finance, legal, admin. Canadian-hosted, CAD-billed, PIPEDA-ready.">''',
    '''<meta name="description" content="Partner with Wilfred to offer AI staffing solutions to your SME clients. Add a recurring revenue line to your HR or consulting firm with zero technical overhead. Hosted in Canada.">'''
)

content_p = content_p.replace(
    '''<p>&copy; 2026 Wilfred AI Staffing Inc. Made in Canada. Hosted in Canada.</p>''',
    '''<p>&copy; 2026 Wilfred AI Staffing Inc. Headquartered in Hamilton, Ontario. Serving SMEs across Canada.</p>'''
)

content_p = content_p.replace(
    '''<h2 class="section-title light">Your clients need this work done.<br>You don't need a new competitor.</h2>''',
    '''<h2 class="section-title light">AI Staffing Partner Program for<br>Canadian HR &amp; Consulting Firms.</h2>'''
)

with open(os.path.join(cwd, 'partners.html'), 'w', encoding='utf-8') as f:
    f.write(content_p)

# 3. Update all other HTML files to use the local footer address
for filepath in glob.glob(os.path.join(cwd, '**/*.html'), recursive=True):
    if filepath.endswith('index.html') or filepath.endswith('partners.html'): continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content_other = f.read()
    new_content_other = content_other.replace(
        '''<p>&copy; 2026 Wilfred AI Staffing Inc. Made in Canada. Hosted in Canada.</p>''',
        '''<p>&copy; 2026 Wilfred AI Staffing Inc. Headquartered in Hamilton, Ontario. Serving SMEs across Canada.</p>'''
    )
    if content_other != new_content_other:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content_other)

print('Update successful')
