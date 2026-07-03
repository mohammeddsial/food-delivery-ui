const fs = require('fs');
const path = require('path');

const THEMES = [
    { id: 'neumorphism', name: 'light', label: 'Light', font: 'Lucide' },
    { id: 'glassmorphism', name: 'dark', label: 'Dark', font: 'Remix' },
    { id: 'neubrutalism', name: 'modern', label: 'Modern', font: 'Tabler' }
];

const src = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

THEMES.forEach(t => {
    let html = src;

    // 1. Replace body tag
    html = html.replace(
        '<body class="p-6 h-screen w-screen flex overflow-hidden">',
        '<body style="margin:0;padding:0;background:#0a0a0a;display:flex;justify-content:center;align-items:center;min-height:100vh;overflow:hidden;">'
    );

    // 2. Find and replace the left panel + viewport grid with single viewport
    const leftPanelStart = html.indexOf('<!-- LEFT PANEL: Controller + Palette Editor -->');
    const designPickerStart = html.indexOf('<!-- DESIGN PICKER MODAL');

    if (leftPanelStart !== -1 && designPickerStart !== -1) {
        const before = html.substring(0, leftPanelStart);
        const after = html.substring(designPickerStart);

        const viewportHtml = `
    <!-- STANDALONE VIEWPORT: ${t.label.toUpperCase()} -->
    <div style="display:flex;justify-content:center;align-items:center;width:100vw;height:100vh;">
        <div id="viewport-${t.id}"
            class="phone-viewport theme-${t.id} rounded-[40px] border-[10px] border-slate-950 shadow-2xl"
            role="region" aria-label="${t.label} theme viewport">
        </div>
    </div>

`;
        html = before + viewportHtml + after;
    }

    // 3. Modify renderAllViewports() to only render this theme
    html = html.replace(
        "const views = ['neumorphism', 'glassmorphism', 'neubrutalism'];",
        `const views = ['${t.id}'];`
    );

    // 4. Modify window.onload to skip controller functions
    html = html.replace(
        /window\.onload = function \(\) \{[\s\S]*?\};/,
        `window.onload = function () {
            renderAllViewports();
            applyAllPalettes();
        };`
    );

    const outFile = path.join(__dirname, `viewport-${t.name}.html`);
    fs.writeFileSync(outFile, html, 'utf8');
    console.log(`✅ Generated viewport-${t.name}.html (${(html.length / 1024).toFixed(0)} KB)`);
});

console.log('\nDone! Open any file in a browser and take a full-page scroll screenshot.');
