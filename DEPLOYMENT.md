# Portfolio Deployment Guide

## Project Structure

```
Portfolio-claude-gracious-ritchie-op5u93/
├── index.html                 # Main portfolio page
├── css/
│   └── style.css             # Portfolio styles
├── js/
│   └── main.js               # Portfolio JavaScript
├── assets/                   # Portfolio assets (images, icons)
│   ├── photo.png
│   └── favicon.svg
└── demos/                    # Individual demo projects
    ├── lumiere/             # Luxury fashion e-commerce
    │   ├── index.html       # Landing page
    │   ├── shop.html        # Product catalog
    │   ├── about.html       # Brand story
    │   └── contact.html     # Contact form
    ├── devdash/             # Analytics dashboard
    │   └── index.html
    ├── taskly/              # Kanban board
    │   └── index.html
    ├── shopmanager/         # Inventory system
    │   └── index.html
    ├── aura/                # Scent finder
    │   └── index.html
    └── listed/              # Product copy studio
        └── index.html
```

## Deployment Instructions

### Option 1: Netlify Drag & Drop (Recommended)

1. Open [Netlify Drop](https://app.netlify.com/drop)
2. Drag the entire `Portfolio-claude-gracious-ritchie-op5u93` folder
3. Wait for deployment to complete
4. Your site will be live at `https://[random-name].netlify.app`
5. Optional: Configure custom domain in Netlify settings

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to project folder
cd Portfolio-claude-gracious-ritchie-op5u93

# Deploy
netlify deploy --prod
```

### Option 3: GitHub Pages

1. Create a new GitHub repository
2. Push the entire project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin [your-repo-url]
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Set source to "main" branch, root folder
5. Your site will be live at `https://[username].github.io/[repo-name]`

### Option 4: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to project: `cd Portfolio-claude-gracious-ritchie-op5u93`
3. Deploy: `vercel --prod`

## Demo Links After Deployment

Once deployed, your demos will be accessible at:

- **Main Portfolio**: `https://your-domain.com/`
- **Lumière**: `https://your-domain.com/demos/lumiere/`
- **DevDash**: `https://your-domain.com/demos/devdash/`
- **Taskly**: `https://your-domain.com/demos/taskly/`
- **ShopManager**: `https://your-domain.com/demos/shopmanager/`
- **Aura**: `https://your-domain.com/demos/aura/`
- **Listed**: `https://your-domain.com/demos/listed/`

## Features by Demo

### Lumière (Multi-page Luxury Fashion)
- ✅ Landing page with hero and featured products
- ✅ Shop page with 20 real product photos
- ✅ Working filters (category) and sorting (price, name)
- ✅ About page with brand story
- ✅ Contact form with validation
- ✅ Real Unsplash photography
- ✅ Fully responsive

### DevDash (Analytics Console)
- ✅ Custom SVG charts (no libraries)
- ✅ Sortable/searchable data tables
- ✅ Dark/light theme toggle
- ✅ CSV export functionality
- ✅ Mobile sidebar

### Taskly (Kanban Board)
- ✅ Drag-and-drop tasks
- ✅ Inline editing
- ✅ Label filters
- ✅ Keyboard shortcuts
- ✅ JSON export
- ✅ Undo on delete
- ✅ LocalStorage persistence

### ShopManager (Inventory System)
- ✅ Full CRUD operations
- ✅ Search and filters
- ✅ Restock with undo
- ✅ Reorder queue
- ✅ CSV export
- ✅ Live preview cards

### Aura (Scent Finder)
- ✅ Natural language queries
- ✅ On-device scoring (no API)
- ✅ Save to shelf
- ✅ Side-by-side comparison
- ✅ 16 fragrance database

### Listed (Product Copy Studio)
- ✅ Live editing workspace
- ✅ Readiness scoring
- ✅ Live storefront preview
- ✅ Copy/download functionality
- ✅ Auto-save to localStorage

## Technical Notes

- **No build process required** — All demos are static HTML/CSS/JS
- **No dependencies** — Only Google Fonts externally loaded
- **LocalStorage** — Used for persistence (gracefully degrades)
- **Images** — Lumière uses Unsplash; other demos use inline SVG
- **Browser support** — Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile-optimized** — All demos responsive with tested breakpoints

## Customization

### Update Contact Information

1. Edit `index.html` — Update email, phone, and bio
2. Edit `js/main.js` — Update `EMAIL` constant at the top
3. Edit `demos/lumiere/contact.html` — Update contact details

### Update Project Descriptions

Edit `js/main.js` → `PROJECTS` array to modify:
- Project titles
- Descriptions
- Technology tags
- Demo links

### Change Colors/Branding

Each demo has its own color scheme defined in CSS variables at the top of each file. Example from Lumière:

```css
:root {
  --paper: #f5efe3;
  --ink: #2c2620;
  --accent: #8b7355;
}
```

## Performance

All demos are optimized for performance:
- Lazy loading images where appropriate
- Minimal CSS/JS (no frameworks)
- Efficient DOM updates
- No external API calls (except Unsplash images in Lumière)

## Security

- No user authentication or sensitive data
- No server-side code
- No external API keys exposed
- Safe for public deployment

## Known Limitations

These are **portfolio demonstrations**, not production applications:
- No real payment processing
- No real email sending
- No real database
- No user accounts
- LocalStorage data is browser-specific

## Support

For issues or questions about deployment:
- Check browser console for errors
- Verify all file paths are correct
- Ensure images load (check Unsplash availability)
- Test in multiple browsers

## License

This is a portfolio project by Vincent Somido.  
Images in Lumière are from Unsplash and subject to [Unsplash License](https://unsplash.com/license).

---

**Last Updated**: November 12, 2026  
**Total Demos**: 6 individual projects + main portfolio  
**Total Files**: ~40 HTML/CSS/JS files  
**Ready for deployment**: ✅ Yes
