import os

def write_svg(filename, content):
    with open(filename, 'w') as f:
        f.write(content)

# Colors
black = "#0D0D0D"
orange = "#FF6A00"
white = "#FFFFFF"

# Paths
path_v = "M 0 50 L 28 50 L 54 115 L 80 50 L 108 50 L 68 150 L 40 150 Z"
path_slash = "M 120 50 L 148 50 L 108 150 L 80 150 Z"
dot_cx = 146
dot_cy = 20
dot_r = 14

# 1. Icon (160x160)
icon_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <path d="{path_v}" fill="{black}"/>
  <path d="{path_slash}" fill="{orange}"/>
  <circle cx="{dot_cx}" cy="{dot_cy}" r="{dot_r}" fill="{orange}"/>
</svg>"""
write_svg("public/hirewilfred_icon.svg", icon_svg)

# 2. Primary Logo (say, 600 x 160)
# Icon on the left, wordmark on the right.
# Font: Poppins, bold. "hire" is black, "wilfred" is black too? 
# Wait, let's check the brand guide for wordmark color.
# In "PRIMARY", "hirewilfred" is all black!
# Let me double check the first image. Yes, "hirewilfred" is completely black in PRIMARY.
# It uses a clean sans-serif like Poppins.
primary_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 160">
  <g transform="translate(0, 0)">
    <path d="{path_v}" fill="{black}"/>
    <path d="{path_slash}" fill="{orange}"/>
    <circle cx="{dot_cx}" cy="{dot_cy}" r="{dot_r}" fill="{orange}"/>
  </g>
  <text x="180" y="115" font-family="Poppins, Inter, sans-serif" font-weight="700" font-size="76" letter-spacing="-2" fill="{black}">hirewilfred</text>
  <text x="185" y="145" font-family="Poppins, Inter, sans-serif" font-weight="600" font-size="14" letter-spacing="4" fill="{orange}">A SMARTER WORKFORCE.</text>
</svg>"""
write_svg("public/hirewilfred_logo.svg", primary_svg)

# 3. Wordmark Only
wordmark_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100">
  <text x="0" y="75" font-family="Poppins, Inter, sans-serif" font-weight="700" font-size="76" letter-spacing="-2" fill="{black}">hirewilfred</text>
</svg>"""
write_svg("public/hirewilfred_wordmark.svg", wordmark_svg)

# 4. Reverse Logo (for dark background)
# Icon: Black becomes White. Orange stays Orange.
# Text: Black becomes White.
reverse_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 160">
  <g transform="translate(0, 0)">
    <path d="{path_v}" fill="{white}"/>
    <path d="{path_slash}" fill="{orange}"/>
    <circle cx="{dot_cx}" cy="{dot_cy}" r="{dot_r}" fill="{orange}"/>
  </g>
  <text x="180" y="115" font-family="Poppins, Inter, sans-serif" font-weight="700" font-size="76" letter-spacing="-2" fill="{white}">hirewilfred</text>
  <text x="185" y="145" font-family="Poppins, Inter, sans-serif" font-weight="600" font-size="14" letter-spacing="4" fill="{orange}">A SMARTER WORKFORCE.</text>
</svg>"""
write_svg("public/hirewilfred_logo_reverse.svg", reverse_svg)

# 5. Hero Graphic (Big W thing)
# It's essentially the icon but massive, maybe clipped or positioned differently.
# Let's provide a scalable version.
hero_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <path d="{path_v}" fill="{black}"/>
  <path d="{path_slash}" fill="{orange}"/>
  <circle cx="{dot_cx}" cy="{dot_cy}" r="{dot_r}" fill="{orange}"/>
</svg>"""
write_svg("public/hero_graphic.svg", hero_svg)

print("SVG assets generated successfully.")
