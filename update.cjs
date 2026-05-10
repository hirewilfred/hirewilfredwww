const fs = require('fs');
const files = ['claire.html', 'sam.html', 'olivia.html', 'david.html', 'maya.html', 'theo.html'];

files.forEach(f => {
    const p = 'agents/' + f;
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        c = c.replace('<a href="theo.html">Theo — Community</a>\r\n                </div>', '<a href="theo.html">Theo — Community</a>\r\n                    <a href="quinn.html">Quinn — Bookkeeper</a>\r\n                </div>');
        c = c.replace('<a href="theo.html">Theo — Community</a>\n                </div>', '<a href="theo.html">Theo — Community</a>\n                    <a href="quinn.html">Quinn — Bookkeeper</a>\n                </div>');
        fs.writeFileSync(p, c);
    }
});
