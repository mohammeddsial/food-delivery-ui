#!/usr/bin/env node
/**
 * Smoke test for index.html.
 *
 * Run this after ANY change to index.html, before considering the work done:
 *
 *   node smoke-test.js
 *
 * Exits with code 0 if everything passes, 1 if anything fails.
 *
 * This exists because of a real incident: removing a feature left dangling
 * references to a deleted variable. Since the affected variable had been
 * changed to `const`, reassigning it threw a silent runtime error that
 * aborted renderAllViewports() - so nothing rendered and no interaction
 * (module reordering, design picker, etc.) ever visibly updated the page,
 * with zero indication in the UI that anything was wrong. This script
 * catches that whole class of bug (syntax errors, duplicated/mismatched
 * function blocks, stale identifiers, and silent render failures) plus
 * exercises the core interactive features end-to-end in a real browser.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const INDEX_PATH = path.resolve(__dirname, 'index.html');

// Identifiers that have been deliberately removed from the codebase in the
// past. If any of these show up again, it almost certainly means a future
// edit left dangling references (the exact bug this script exists to catch).
const REMOVED_IDENTIFIERS = [
    'stateSimulationByTheme', 'syncStateSimUI', 'updateSimulations',
    'orderToggleBtn', 'birthdayToggleBtn', 'weatherSelect', 'timeSelect',
    'countdownInput', 'initControllerEvents', 'activeConfigTheme',
    'defaultStateSimulation'
];

let failed = 0;
function check(name, ok, detail) {
    const status = ok ? 'PASS' : 'FAIL';
    console.log(`[${status}] ${name}${detail ? ' - ' + detail : ''}`);
    if (!ok) failed++;
}

async function findRowByLabel(page, labelSubstring) {
    const rows = await page.$$('.module-row');
    for (const r of rows) {
        const label = await r.$eval('.mod-label', el => el.textContent).catch(() => '');
        if (label.includes(labelSubstring)) return r;
    }
    return null;
}

async function main() {
    const html = fs.readFileSync(INDEX_PATH, 'utf8');
    const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
    check('index.html contains inline <script>', !!scriptMatch);
    const js = scriptMatch ? scriptMatch[1] : '';

    // 1. Static: JS syntax must be valid
    try {
        new Function(js);
        check('JS syntax valid', true);
    } catch (e) {
        check('JS syntax valid', false, e.message);
    }

    // 2. Static: no duplicate top-level function declarations
    //    (catches bad string-replace edits that duplicate a block)
    const fnNames = [...js.matchAll(/^\s*function\s+(\w+)\s*\(/gm)].map(m => m[1]);
    const counts = new Map();
    fnNames.forEach(n => counts.set(n, (counts.get(n) || 0) + 1));
    const dupes = [...counts.entries()].filter(([, c]) => c > 1);
    check('No duplicate function declarations', dupes.length === 0,
        dupes.map(([n, c]) => `${n}x${c}`).join(', '));

    // 3. Static: no stale references to identifiers removed in the past
    const stale = REMOVED_IDENTIFIERS.filter(id => new RegExp(`\\b${id}\\b`).test(js));
    check('No stale references to removed identifiers', stale.length === 0, stale.join(', '));

    if (failed > 0) {
        console.log('\nStopping before browser checks - fix static errors above first.');
        process.exit(1);
    }

    // 4. Live: boot in a real browser, watch for runtime errors
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text()); });

    await page.goto('http://localhost:8080/index.html', { waitUntil: 'load', timeout: 30000 }).catch(async () => {
        // Fallback to file:// if HTTP server not running
        await page.goto('file:///' + INDEX_PATH.replace(/\\/g, '/'), { waitUntil: 'load', timeout: 30000 });
    });
    await page.waitForTimeout(1200);

    check('No console/page errors on boot', errors.length === 0, errors.join(' | '));

    for (const theme of ['neumorphism', 'glassmorphism', 'neubrutalism']) {
        const count = await page.$eval(`#viewport-${theme}`, el => el.children.length).catch(() => 0);
        check(`Viewport "${theme}" rendered content`, count > 0, `${count} children`);
    }

    const switcherLabels = await page.$$eval('#viewSwitcherContainer button', els => els.map(e => e.textContent));
    check('View switcher has Light/Dark/Modern', JSON.stringify(switcherLabels) === JSON.stringify(['Light', 'Dark', 'Modern']), switcherLabels.join(','));

    const moduleRowCount = await page.$$eval('.module-row', els => els.length);
    check('Module Orchestrator lists modules', moduleRowCount > 0, `${moduleRowCount} rows`);

    const dragHandles = await page.$$eval('.module-row .drag-handle', els => els.length);
    check('Drag handles present on all rows', dragHandles === moduleRowCount, `${dragHandles}/${moduleRowCount}`);

// 5. Style variant radio: confirm options exist
    const heroRow = await findRowByLabel(page, 'Video Reel Hero');
    check('Found a module with style variants', !!heroRow);
    if (heroRow) {
        const radios = await heroRow.$$eval('.variant-radios input', els => els.length);
        check('Module has style variant radio options', radios > 0, `${radios} radio(s)`);
    }

    // 6. Drag-and-drop reorder sanity check
    const beforeOrder = await page.$$eval('.mod-label', els => els.slice(0, 3).map(e => e.textContent));
    const dragRows = await page.$$('.module-row');
    if (dragRows.length >= 3) {
        // Scroll the module orchestrator into view first
        await dragRows[0].evaluate(el => el.scrollIntoView({ block: 'center' }));
        await page.waitForTimeout(300);
        const sourceBox = await dragRows[0].boundingBox();
        const targetBox = await dragRows[2].boundingBox();
        await page.mouse.move(sourceBox.x + 8, sourceBox.y + sourceBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(targetBox.x + 8, targetBox.y + targetBox.height - 2, { steps: 10 });
        await page.mouse.up();
        await page.waitForTimeout(300);
        const afterOrder = await page.$$eval('.mod-label', els => els.slice(0, 3).map(e => e.textContent));
        check('Drag-and-drop reorders module list', JSON.stringify(beforeOrder) !== JSON.stringify(afterOrder), `${beforeOrder} -> ${afterOrder}`);
    }

    // 7-10. WCAG accessibility checks
    await runWcagChecks(page);

    await browser.close();

    console.log('\n' + (failed === 0 ? '✅ All checks passed' : `❌ ${failed} check(s) failed`));
    process.exit(failed === 0 ? 0 : 1);
}

async function runWcagChecks(page) {
    // 7. WCAG: Buttons must have discernible text (check viewport content only)
    const buttonsWithoutAriaLabel = await page.$$eval('[id^="viewport-"] button, [id^="viewport-"] [role="button"]', els => {
        return els.filter(el => {
            const text = (el.textContent || '').trim();
            const ariaLabel = el.getAttribute('aria-label');
            const ariaLabelledby = el.getAttribute('aria-labelledby');
            const title = el.getAttribute('title');
            return !text && !ariaLabel && !ariaLabelledby && !title;
        }).length;
    }).catch(() => 0);
    check('Buttons have discernible text (aria-label/text)', buttonsWithoutAriaLabel === 0, `${buttonsWithoutAriaLabel} buttons without text/aria-label`);

    // 8. WCAG: Form elements must have labels (check viewport content only)
    const formElementsWithoutLabels = await page.$$eval('[id^="viewport-"] input, [id^="viewport-"] select, [id^="viewport-"] textarea', els => {
        return els.filter(el => {
            const id = el.id;
            const ariaLabel = el.getAttribute('aria-label');
            const ariaLabelledby = el.getAttribute('aria-labelledby');
            const title = el.getAttribute('title');
            const hasLabel = id ? !!document.querySelector(`label[for="${id}"]`) : false;
            return !ariaLabel && !ariaLabelledby && !title && !hasLabel;
        }).length;
    }).catch(() => 0);
    check('Form elements have labels', formElementsWithoutLabels === 0, `${formElementsWithoutLabels} form elements without labels`);

    // 9. WCAG: Scrollable regions must have keyboard access
    const scrollableWithoutTabindex = await page.$$eval('.scrollable-content', els => {
        return els.filter(el => {
            const style = window.getComputedStyle(el);
            const isScrollable = (style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight;
            const tabindex = el.getAttribute('tabindex');
            return isScrollable && tabindex !== '0' && tabindex !== '-1';
        }).length;
    }).catch(() => 0);
    check('Scrollable regions have keyboard access (tabindex)', scrollableWithoutTabindex === 0, `${scrollableWithoutTabindex} scrollable regions without tabindex`);

    // 10. WCAG: Check minimum color contrast on key text elements
    const contrastIssues = await page.evaluate(() => {
        const issues = [];
        const themes = ['neumorphism', 'glassmorphism', 'neubrutalism'];
        themes.forEach(theme => {
            const vp = document.getElementById(`viewport-${theme}`);
            if (!vp) return;
            const textEls = vp.querySelectorAll('span, div, p, button, a');
            for (const el of textEls) {
                if (el.children.length > 0) continue;
                const style = window.getComputedStyle(el);
                const color = style.color;
                const fontSize = parseFloat(style.fontSize);
                if (fontSize > 14 || !color) continue;
                const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (!m) continue;
                const a = m[4] ? parseFloat(m[4]) : 1;
                if (a < 0.3) {
                    issues.push(`${theme}: low opacity text ${color}`);
                    break;
                }
            }
        });
        return issues;
    }).catch(() => []);
    check('No critically low-opacity text (<0.3)', contrastIssues.length === 0, contrastIssues.slice(0, 3).join(', '));
}

main().catch(e => {
    console.error('Smoke test crashed:', e);
    process.exit(1);
});
