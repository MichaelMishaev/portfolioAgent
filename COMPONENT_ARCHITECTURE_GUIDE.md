# 🏗️ Component Architecture Guide

## 📁 New File Structure

```
components/builder/
├── unified/                    ← NEW! Unified component library
│   ├── index.tsx              ← Central exports (backward compat)
│   ├── Hero.tsx               ← Unified Hero (2 variants)
│   ├── Stats.tsx              ← Unified Stats
│   └── Skills.tsx             ← Unified Skills
│
├── split-screen-components.tsx  ← LEGACY (kept for backward compat)
├── craftjs-template-builder.tsx ← Main builder (updated to use both)
└── ...other builders
```

---

## 🎯 Component Hierarchy

### **Unified Components (NEW - Recommended)**

```
unified/
├── Hero
│   ├── Variant: "centered"
│   │   └── Full-width, centered text + gradient background
│   └── Variant: "split-screen"
│       └── Two columns: text + visual with initials
│
├── Stats
│   └── Flexible grid (2-4 columns)
│       └── Dynamic add/remove stats
│
└── Skills
    └── Tag-based display
        └── Customizable title + skills list
```

### **Legacy Components (Deprecated)**

```
split-screen-components.tsx
├── SplitScreenHero    ← Replaced by Hero (variant: "split-screen")
├── SplitScreenStats   ← Replaced by Stats
├── SplitScreenSkills  ← Replaced by Skills
└── SplitScreenContact

craftjs-template-builder.tsx (inline)
├── HeroComponent      ← Replaced by Hero (variant: "centered")
├── AboutComponent
├── ProjectsComponent
├── SkillsComponent
└── ... (12 more components)
```

---

## 🔄 Component Mapping (Old → New)

| Old Component(s) | New Component | How to Use |
|-----------------|---------------|------------|
| `HeroComponent`<br/>`SplitScreenHero` | `Hero` | Use `variant="centered"` or `variant="split-screen"` |
| `SplitScreenStats` | `Stats` | Drop-in replacement (same API) |
| `SplitScreenSkills` | `Skills` | Drop-in replacement (same API) |

---

## 📖 Usage Examples

### **Example 1: Using New Unified Hero**

```typescript
// In the builder
<Element
  is={Hero}
  language="ru"
  variant="centered"  // or "split-screen"
  canvas
/>
```

**Switch Variants Dynamically:**
- User adds Hero component to canvas
- Opens settings panel (right sidebar)
- Clicks "Split Screen" button
- Layout instantly switches! 🎉

### **Example 2: Using Stats Component**

```typescript
<Element
  is={Stats}
  language="ru"
  stats={[
    { value: "150+", label: "Projects", labelRu: "Проектов" },
    { value: "50+", label: "Clients", labelRu: "Клиентов" }
  ]}
  canvas
/>
```

**Dynamic Stats Management:**
- User clicks "Add Stat" button in settings
- New stat row appears
- Fill in value + labels (EN/RU)
- Instantly see it on canvas

---

## 🎨 Styling Conventions

### **Unified Component Styling**

**Toolbox Buttons:**
- Border: `border-purple-200`
- Background: `bg-gradient-to-r from-purple-50 to-pink-50`
- Icon: `✨` (sparkle emoji)
- Text Color: `text-purple-600`

**Legacy Component Styling:**
- Border: `border-gray-200`
- Background: `bg-white`
- Opacity: `opacity-60` (to discourage use)

---

## 🔧 Settings Panel Architecture

### **Unified Hero Settings**

```
[Variant Selector]  ← Toggle between Centered/Split-Screen

[Content Section]
├── Name (EN/RU based on language)
├── Title (EN/RU)
├── Tagline (EN/RU, optional)
├── Location (EN/RU, split-screen only)
├── Availability (EN/RU, split-screen only)
├── Initials (split-screen only)
├── Button Text (EN/RU, optional)
└── Background Image (centered only)

[Colors Section]
├── Gradient From (color picker + hex input)
├── Gradient To (color picker + hex input)
├── Text Color
└── Subtitle Color

[Typography Section]
├── Name Font Size (24-96px slider)
└── Subtitle Font Size (14-48px slider)

[Layout Section]
└── Padding (20-200px slider)
```

### **Unified Stats Settings**

```
[Stats List]
├── Stat 1
│   ├── Value
│   ├── Label (EN)
│   ├── Label (RU)
│   └── [Remove] button
├── Stat 2
│   └── ...
└── Stat N

[Add Stat] button (purple, full-width)
```

---

## 🌐 Bilingual Support Pattern

**All unified components follow this pattern:**

```typescript
interface ComponentProps {
  // Content (English)
  title: string;
  description: string;

  // Content (Russian)
  titleRu: string;
  descriptionRu: string;

  // System
  language?: 'en' | 'ru';
}

// In render
const displayTitle = language === 'ru' ? titleRu : title;
```

**Benefits:**
- ✅ No content loss when switching languages
- ✅ Users can pre-fill both languages
- ✅ Consistent across all components

---

## 🚀 Adding New Unified Components (Guide)

### **Step 1: Create Component File**

```typescript
// components/builder/unified/MyComponent.tsx
"use client";

import { useNode, useEditor } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface MyComponentProps {
  title: string;
  titleRu: string;
  language?: 'en' | 'ru';
}

export const MyComponent = ({
  title = "Default Title",
  titleRu = "Заголовок по умолчанию",
  language = 'en'
}: MyComponentProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({ selected: state.events.selected }));

  const { actions: editorActions } = useEditor();
  const displayTitle = language === 'ru' ? titleRu : title;

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`py-20 border-2 ${selected ? "border-blue-500" : "border-transparent"}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold">{displayTitle}</h2>
      </div>
    </section>
  );
};

// Settings Panel
function MyComponentSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as MyComponentProps,
  }));

  return (
    <div className="space-y-4 p-4">
      <Label>Title (EN)</Label>
      <Input
        value={props.title}
        onChange={(e) => setProp((props: MyComponentProps) =>
          (props.title = e.target.value)
        )}
      />

      <Label>Title (RU)</Label>
      <Input
        value={props.titleRu}
        onChange={(e) => setProp((props: MyComponentProps) =>
          (props.titleRu = e.target.value)
        )}
      />
    </div>
  );
}

// Craft.js Config
MyComponent.craft = {
  displayName: "My Component",
  props: {
    title: "Default Title",
    titleRu: "Заголовок по умолчанию",
    language: 'en' as 'en' | 'ru',
  },
  related: {
    settings: MyComponentSettings,
  },
};
```

### **Step 2: Export from Index**

```typescript
// components/builder/unified/index.tsx
export { MyComponent } from "./MyComponent";
```

### **Step 3: Add to Resolver**

```typescript
// craftjs-template-builder.tsx
import { MyComponent } from "@/components/builder/unified";

<Editor
  resolver={{
    MyComponent,  // Add here
    ...
  }}
>
```

### **Step 4: Add to Toolbox**

```typescript
// In Toolbox component
<button
  ref={(ref) => {
    if (ref && !isMobile) {
      connectors.create(ref, <Element is={MyComponent} language={language} canvas />);
    }
  }}
  className="w-full p-3 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:border-purple-400 cursor-pointer"
>
  <div className="font-semibold text-sm flex items-center gap-2">
    <span className="text-purple-600">✨</span>
    My Component
  </div>
  <div className="text-xs text-gray-600 mt-1">
    Component description
  </div>
</button>
```

---

## 🎯 Best Practices

### **DO:**
- ✅ Use unified components for new templates
- ✅ Add bilingual support (EN/RU) to all props
- ✅ Follow the naming convention: `ComponentName` (no suffix)
- ✅ Use variants instead of creating duplicate components
- ✅ Add proper TypeScript types
- ✅ Include delete button when selected
- ✅ Add responsive classes (`sm:`, `md:`, `lg:`)

### **DON'T:**
- ❌ Create new legacy components
- ❌ Skip bilingual support
- ❌ Forget to add to resolver
- ❌ Use inconsistent styling
- ❌ Hard-code text (always use props)

---

## 📊 Performance Impact

**Before:**
- 15+ component definitions in one file
- Duplicate logic between similar components
- ~3,500 lines in craftjs-template-builder.tsx

**After:**
- Modular architecture (separate files)
- Shared logic in unified components
- ~3,700 lines total (but much better organized)

**Bundle Size Impact:**
- Minimal (components are tree-shakeable)
- Legacy components can be removed later

---

## 🔮 Future Roadmap

### **Q1 2026: Complete Unified Library**
- [ ] Unified Contact component
- [ ] Unified About component
- [ ] Unified Gallery component
- [ ] Unified Testimonials component
- [ ] Unified Pricing component

### **Q2 2026: Advanced Features**
- [ ] Theme presets (dark-mode, minimalist, etc.)
- [ ] Component animations library
- [ ] AI-powered component suggestions

### **Q3 2026: Deprecation**
- [ ] Remove legacy components
- [ ] Migrate all existing templates
- [ ] Clean up codebase

---

## 🆘 Troubleshooting

### **Issue: Component not appearing in toolbox**
**Solution:** Check resolver in `craftjs-template-builder.tsx`

### **Issue: Settings panel not showing**
**Solution:** Verify `related: { settings: ComponentSettings }` in `.craft` config

### **Issue: Bilingual text not switching**
**Solution:** Check `language` prop is being passed to component

### **Issue: Drag & drop not working on mobile**
**Solution:** Ensure `handleMobileAdd` is wired up correctly

---

## 📚 Related Documentation

- [Craft.js Documentation](https://craft.js.org/)
- [Component API Reference](./API_REFERENCE.md)
- [Builder Usage Guide](./BUILDER_GUIDE.md)

---

**Last Updated:** November 3, 2025
**Maintainer:** Development Team
**Questions?** Check existing components in `/unified/` for examples
