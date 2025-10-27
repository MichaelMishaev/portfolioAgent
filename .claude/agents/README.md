# Portfolio Project Subagents

This directory contains specialized AI subagents designed specifically for the portfolio template project. Each subagent is an expert in a particular domain and can be invoked to handle specific tasks.

## Available Subagents

### 1. template-builder 🏗️
**Purpose:** Create and modify portfolio templates

**When to use:**
- Building new templates from scratch
- Modifying existing template layouts
- Adding new features to templates
- Following consistent patterns across templates

**Example invocations:**
```
> Use the template-builder to create a new glassmorphism template
> Ask template-builder to add a testimonials section to the minimalist template
> Have template-builder fix the responsive issues in the hero section
```

**Key responsibilities:**
- Create route and component files
- Follow established design patterns
- Ensure responsive design
- Update template registry
- Maintain code quality

---

### 2. template-tester 🧪
**Purpose:** Automated testing with Playwright

**When to use:**
- After creating or modifying templates
- Before deployment
- For regression testing
- When investigating bugs

**Example invocations:**
```
> Use template-tester to test all 20 templates
> Ask template-tester to verify the new 3D template works on mobile
> Have template-tester check for console errors across all templates
```

**Key responsibilities:**
- Write comprehensive test suites
- Run visual, responsive, and interaction tests
- Report bugs with detailed reproduction steps
- Verify accessibility standards
- Performance testing

**Available test commands:**
```bash
npm test                  # Run all tests
npm run test:ui           # Interactive UI mode
npm run test:headed       # See browser while testing
npm run test:debug        # Debug mode
npm run test:report       # View test report
```

---

### 3. design-reviewer 🎨
**Purpose:** Design consistency and UX evaluation

**When to use:**
- After completing a template
- For design consistency audits
- Before major releases
- When redesigning sections

**Example invocations:**
```
> Use design-reviewer to audit the Y2K template design
> Ask design-reviewer to check consistency across all templates
> Have design-reviewer evaluate the new color scheme
```

**Key responsibilities:**
- Visual consistency checks
- Typography and spacing review
- Color and contrast evaluation
- UX flow analysis
- Accessibility audits
- Competitive analysis

**Review criteria:**
- Visual hierarchy
- Design system compliance
- User experience
- Responsive design quality
- Animation smoothness

---

### 4. performance-optimizer ⚡
**Purpose:** Performance optimization and Core Web Vitals

**When to use:**
- After adding heavy features (3D, animations)
- Before production deployment
- When performance issues are reported
- Regular optimization audits

**Example invocations:**
```
> Use performance-optimizer to audit the 3D template
> Ask performance-optimizer to reduce bundle size
> Have performance-optimizer fix animation jank in the kinetic typography template
```

**Key responsibilities:**
- Core Web Vitals optimization
- Bundle size reduction
- Animation performance
- Image optimization
- Code splitting
- Memory leak detection

**Optimization areas:**
- JavaScript bundle size
- Image assets
- Animation smoothness
- Network performance
- Rendering efficiency

---

## How to Use Subagents

### Automatic Invocation
Claude Code will automatically delegate tasks to the appropriate subagent based on context:

```
> I need to create a new template with a cyberpunk theme
[Claude will automatically use template-builder]

> Test all templates for mobile responsiveness
[Claude will automatically use template-tester]
```

### Explicit Invocation
You can explicitly request a specific subagent:

```
> Use the template-builder subagent to...
> Ask design-reviewer to...
> Have performance-optimizer check...
```

### Chaining Subagents
For complex workflows, chain multiple subagents:

```
> First use template-builder to create a new template,
  then use template-tester to verify it works,
  and finally use design-reviewer to check consistency
```

---

## Workflow Examples

### Creating a New Template
1. **template-builder**: Creates the template structure
2. **design-reviewer**: Checks design consistency
3. **template-tester**: Runs automated tests
4. **performance-optimizer**: Optimizes performance

```
> Create a new minimalist blog template, then review and test it
```

### Fixing a Bug
1. **template-tester**: Reproduces and documents the bug
2. **template-builder**: Implements the fix
3. **template-tester**: Verifies the fix works
4. **design-reviewer**: Ensures no design regressions

```
> The dark mode template has a layout issue on mobile. Fix it and verify.
```

### Optimizing Performance
1. **performance-optimizer**: Audits and identifies issues
2. **template-builder**: Implements optimizations
3. **template-tester**: Verifies functionality still works
4. **performance-optimizer**: Confirms improvements

```
> The 3D template is loading slowly. Optimize it.
```

---

## Best Practices

### When to Use Each Subagent

**Use template-builder when:**
- Creating new templates or components
- Modifying layout or structure
- Adding new features or sections
- Refactoring template code

**Use template-tester when:**
- After any code changes
- Before committing changes
- For regression testing
- Investigating reported bugs

**Use design-reviewer when:**
- Completing a template
- Making design changes
- Ensuring brand consistency
- Preparing for launch

**Use performance-optimizer when:**
- Adding heavy features
- Noticing slowdowns
- Before production deployment
- Regular maintenance

### Subagent Combinations

**New Feature Development:**
```
template-builder → design-reviewer → template-tester → performance-optimizer
```

**Bug Fix:**
```
template-tester → template-builder → template-tester
```

**Design Refresh:**
```
design-reviewer → template-builder → design-reviewer
```

**Performance Issue:**
```
performance-optimizer → template-builder → performance-optimizer
```

---

## Configuration

Each subagent can be customized by editing its `.md` file in this directory:

```
.claude/agents/
├── template-builder.md
├── template-tester.md
├── design-reviewer.md
└── performance-optimizer.md
```

### Modifying Subagents

To modify a subagent:
1. Edit the `.md` file
2. Update the system prompt
3. Adjust tool permissions if needed
4. Save and test

Use `/agents` command in Claude Code to manage subagents through the UI.

---

## Tools Access

Each subagent has specific tool access:

| Subagent | Tools |
|----------|-------|
| template-builder | Read, Write, Edit, Glob, Grep, Bash |
| template-tester | Read, Write, Bash, Glob, Grep |
| design-reviewer | Read, Grep, Glob |
| performance-optimizer | Read, Edit, Bash, Grep, Glob |

---

## Project Context

These subagents are optimized for this portfolio template project which uses:

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS 4.0
- **Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **3D Graphics:** Three.js + React Three Fiber
- **Data Viz:** Recharts
- **Testing:** Playwright
- **TypeScript:** Strict mode enabled

---

## Tips

1. **Be specific:** The more context you provide, the better the subagent performs
2. **Chain intelligently:** Use multiple subagents for complex tasks
3. **Trust the experts:** Each subagent is specialized - let them do their job
4. **Review results:** Always review subagent outputs before committing
5. **Iterate:** Don't hesitate to ask subagents to refine their work

---

## Need Help?

Use the `/agents` command in Claude Code to:
- View all available subagents
- Create new subagents
- Edit existing subagents
- See subagent documentation

For project-specific questions, consult:
- `README.md` - Project overview
- `ARCHITECTURE.md` - System architecture
- `docs/` - Additional documentation
