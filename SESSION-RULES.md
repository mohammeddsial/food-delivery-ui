# SESSION-RULES.md (Food Delivery UI Playground)

**Project:** Food Delivery UI Playground – 3‑theme design engine + 28+ component cards  
**Full context:** See [PROJECT-BACKGROUND.md](PROJECT-BACKGROUND.md) for file structure, themes, workflows, and project state.

---

## ⛔ 1. Chat Start Protocol (MANDATORY — NO EXCEPTIONS)

> **STOP. DO NOT WRITE ANY CODE YET.**  
> Before doing ANY work — no code, no files, no edits, no suggestions — you MUST:
>
> 1. Read this entire SESSION-RULES.md  
> 2. Ask the user the 4 clarifying questions below  
> 3. WAIT for the user's answers  
> 4. Only AFTER the user confirms → begin work  
>
> **If you skip this and start coding immediately, you are violating the #1 rule of this project.**  
> This applies to EVERY prompt, EVERY chat, EVERY session. No exceptions.

### Questions I MUST Ask Before ANY Task:

1. **What component are we working on?** (Module ID + name — e.g. `category-tiles`, `recommended-for-you`, or a new component?)
2. **Which layout variant?** (`v1` Image Top, `v2` Image Left, or `v3` Minimal?)
3. **Target all 3 themes equally, or prioritize one?** (Neumorphism / Glassmorphism / Neubrutalism)
4. **Any hardcoded brand colours or theme‑specific exceptions needed?** (If yes, isolate them. If no, everything uses CSS variables.)

---

## 2. Default Style Mapping (LOCKED — DO NOT CHANGE)

**This mapping is immutable across all sessions:**

| Viewport | Theme | Style |
|----------|-------|-------|
| View 1 (Left) | Neumorphism (Light) | `default` |
| View 2 (Middle) | Glassmorphism (Dark) | `option 1` |
| View 3 (Right) | Neubrutalism (Modern) | `option 2` |

Located at `index.html` line: `const DEFAULT_STYLE_BY_THEME = { neumorphism: 'default', glassmorphism: 'option 1', neubrutalism: 'option 2' };`

> **NEVER change this mapping.** Each viewport must always show its own unique variant.

---

## 3. Parent‑Driven Styling (NON‑NEGOTIABLE)

**ALL visual styling must be inherited from the parent viewport using CSS variables.**

### CSS Variables I MUST Use

| Category | Variable |
| :--- | :--- |
| Corners | `var(--card-radius)` |
| Borders | `var(--card-border)` |
| Shadows | `var(--card-shadow)` |
| Padding/Spacing | `var(--card-padding)`, `var(--card-gap)` |
| Typography | `var(--card-font-size)`, `var(--card-line-height)` |
| Image Corners | `var(--card-img-radius)` |
| Hero Height | `var(--card-hero-height)` |
| Theme Colours | `var(--text-primary)`, `var(--text-secondary)`, `var(--card-bg)`, `var(--accent)` |

### FORBIDDEN Hardcodes

- `border-radius: 16px;` → use `var(--card-radius)`
- `box-shadow: 0 4px 20px ...;` → use `var(--card-shadow)`
- `font-family: 'Inter', sans-serif;` → use parent inheritance
- `color: #1A1A1A;` → use `var(--text-primary)`
- `background: #FFFFFF;` → use `var(--card-bg)`

**Exception:** Small accent elements (gold badges, green tags, logos) can be hardcoded. Main card structure MUST be variable‑driven.

---

## 3. Shortcuts

| Command | Meaning |
| :--- | :--- |
| `build {name}: {variants}, {elements}, follow rules` | Create new card HTML |
| `fix {file}: {issue} in {theme}` | Fix an issue |
| `register {id}: {name}, styles: [{list}]` | Register in main engine |
| `brg {name}: {details}` | Build, Register, Gallery (full workflow) |
| `v1` / `v2` / `v3` | Image Top / Image Left / Minimal |
| `cv` | Use CSS variables |

---

## 4. Commit Convention

- `feat(component): add Limited-Time Deal with 3 variants`
- `fix(engine): correct RTL layout on Glassmorphism viewport`
- `style(variables): update --card-radius to match new design spec`
- `perf(images): lazy-load all Unsplash images`
- `docs(rules): update OPEN-CODE-RULES.md`
