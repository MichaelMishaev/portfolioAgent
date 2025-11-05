# Claude Code Commands

## Available Slash Commands

### `/seo` - World-Class Professional SEO Agent

Activates a professional SEO expert that audits and optimizes your entire site for search engines.

**Quick Start**:
```bash
# Full SEO audit
/seo

# Or just mention it naturally
"Run an SEO audit"
"Optimize meta tags"
"Add schema markup"
"Improve Core Web Vitals"
```

**Capabilities**:
- ✅ Full SEO audits with scored reports (0-100)
- ✅ Meta tags optimization (title, description, OG, Twitter)
- ✅ Structured data (JSON-LD schema: Organization, Product, FAQ)
- ✅ Performance optimization (Core Web Vitals: LCP, FID, CLS)
- ✅ Sitemap.xml & robots.txt generation
- ✅ Content SEO (keywords, readability, internal linking)
- ✅ Multilingual SEO (EN/RU with hreflang tags)

**Documentation**: See `/docs/seo-agent-guide.md` for full guide

---

## Command File Structure

```
.claude/
├── commands/
│   └── seo.md          # SEO agent configuration
└── README.md           # This file
```

## How to Use

### Method 1: Slash Command
Type `/seo` followed by your request:
```
/seo run full audit
/seo optimize meta tags
/seo add schema markup
```

### Method 2: Natural Language
Just mention "SEO" in your request:
```
"I need an SEO audit"
"Can you optimize the SEO on the homepage?"
"Add structured data to templates"
```

## Creating New Commands

To create a new command:

1. Create a new markdown file in `.claude/commands/`
2. Name it `your-command.md`
3. Write the agent's behavior and instructions
4. Use it with `/your-command` or natural language

Example structure:
```markdown
# Your Agent Name

You are a [role description]...

## Your Expertise
- List of capabilities
- Areas of knowledge

## Tasks You Handle
1. Task 1
2. Task 2

## Your Work Process
- Step 1
- Step 2
```

---

**Need Help?** Check the documentation in `/docs/` or ask Claude directly!
