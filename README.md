# Demo Simulator

A simulated messenger demo application that hosts chat interfaces for different platforms under URLs like `demo.agentsupply.ai/<client>?platform=<platform>`.

## Features

- **Multi-platform chat simulation**: WhatsApp, Instagram, Messenger, and Website chat widgets
- **Authentic UI/UX**: Each platform mimics the real interface design and colors
- **Shared chat logic**: Reusable chat hook with placeholder API integration
- **URL-based routing**: Dynamic client and platform selection via URL parameters
- **Responsive design**: Works on desktop and mobile devices
- **Static hosting ready**: Built for deployment on Cloudflare Pages

## Supported Platforms

- **WhatsApp**: Green theme with characteristic message bubbles
- **Instagram**: Clean white interface with gradient accents
- **Messenger**: Facebook blue theme with rounded message bubbles
- **Website**: Full-screen mock website with bottom-left chat widget

## Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd demo-simulator

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Testing Different Platforms

Visit these URLs to test different platforms:

- **WhatsApp**: `http://localhost:5173/?client=DemoClient&platform=whatsapp`
- **Instagram**: `http://localhost:5173/?client=DemoClient&platform=instagram`
- **Messenger**: `http://localhost:5173/?client=DemoClient&platform=messenger`
- **Website**: `http://localhost:5173/?client=DemoClient&platform=web`
- **Invalid Platform**: `http://localhost:5173/?client=DemoClient&platform=invalid` (shows 404)

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` directory, ready for static hosting.

## Deployment

### Cloudflare Pages

1. **Connect Repository**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your Git repository

2. **Build Settings**:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)

3. **Environment Variables** (if needed):
   - Add any environment variables in the Cloudflare Pages settings

4. **Deploy**:
   - Click "Save and Deploy"
   - Your site will be available at `https://your-project-name.pages.dev`

### Custom Domain Setup

1. **Add Custom Domain**:
   - In Cloudflare Pages, go to your project settings
   - Navigate to "Custom domains"
   - Add your domain (e.g., `demo.agentsupply.ai`)

2. **DNS Configuration**:
   - Add a CNAME record pointing to your Cloudflare Pages URL
   - Or use Cloudflare's automatic DNS management

3. **Subdomain Mapping** (Optional):
   - For subdomain routing, configure your DNS to point `*.demo.agentsupply.ai` to your Pages deployment
   - The app will handle the routing based on URL parameters

## URL Structure

The application uses URL parameters to determine which chat interface to display:

```
https://demo.agentsupply.ai/?client=<client_name>&platform=<platform_name>
```

### Parameters

- **client** (string): The client name to display in the chat interface
- **platform** (string): The platform to simulate
  - `whatsapp` - WhatsApp chat interface
  - `instagram` - Instagram chat interface
  - `messenger` - Facebook Messenger chat interface
  - `web` - Website mock with chat widget

### Examples

- `https://demo.agentsupply.ai/?client=AcmeCorp&platform=whatsapp`
- `https://demo.agentsupply.ai/?client=TechStartup&platform=instagram`
- `https://demo.agentsupply.ai/?client=EcommerceStore&platform=web`

## How to Add a New Client Demo

You can easily create a new demo for any client and platform by constructing a URL like:

```
https://demo.agentsupply.ai/?client=<client_name>&platform=<platform_name>
```

### Supported Platforms
- whatsapp
- instagram
- messenger
- web

### Adding a Homepage Screenshot (Website Demo)
For the website chatbot demo, you can show a screenshot or custom background by adding a `bg` query parameter:

```
https://demo.agentsupply.ai/?client=AcmeCorp&platform=web&bg=https://example.com/acme-homepage.png
```
- The `bg` parameter should be a direct link to an image (PNG, JPG, etc).
- The image will be shown as a static, non-interactive background with the chatbot widget overlayed in the bottom-left.

### Example URLs
- WhatsApp: `https://demo.agentsupply.ai/?client=AcmeCorp&platform=whatsapp`
- Instagram: `https://demo.agentsupply.ai/?client=AcmeCorp&platform=instagram`
- Messenger: `https://demo.agentsupply.ai/?client=AcmeCorp&platform=messenger`
- Website (with screenshot): `https://demo.agentsupply.ai/?client=AcmeCorp&platform=web&bg=https://example.com/acme-homepage.png`

### Steps to Add a New Client Demo
1. (Optional) Take a screenshot of the client's homepage and upload it somewhere accessible (e.g., S3, Cloudflare R2, Imgur, etc).
2. Construct the demo URL with the appropriate `client`, `platform`, and (for web) `bg` parameter.
3. Share the URL with the client or prospect.

---

## Script for Generating Demo URLs

You can generate demo URLs by filling in the client name, platform, and (optionally) the homepage screenshot URL:

```
https://demo.agentsupply.ai/?client=<client_name>&platform=<platform_name>[&bg=<homepage_image_url>]
```

Example (replace values as needed):
```
https://demo.agentsupply.ai/?client=AcmeCorp&platform=web&bg=https://example.com/acme-homepage.png
```

---

## Branding

All demos include a small "Powered by Agent Supply" badge in the bottom right.

## Project Structure

```
demo-simulator/
├── src/
│   ├── components/
│   │   ├── WhatsAppChat.jsx      # WhatsApp chat interface
│   │   ├── InstagramChat.jsx     # Instagram chat interface
│   │   ├── MessengerChat.jsx     # Messenger chat interface
│   │   └── WebsiteChatMock.jsx   # Website mock with chat widget
│   ├── hooks/
│   │   └── useChat.js           # Shared chat logic hook
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # App entry point
│   └── index.css                # Tailwind CSS imports
├── public/                      # Static assets
├── dist/                        # Production build output
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Development

### Adding New Platforms

1. Create a new component in `src/components/`
2. Import and add the case in `src/App.jsx`
3. Update the supported platforms list in the 404 page

### Customizing Chat Logic

The chat functionality is centralized in `src/hooks/useChat.js`. To integrate with a real API:

1. Replace the `sendMessage` function with your API call
2. Update the message structure if needed
3. Add error handling for API failures

### Styling

The project uses Tailwind CSS for styling. Each platform component uses authentic colors and layouts:

- **WhatsApp**: `#075e54`, `#dcf8c6`, `#e5ddd5`
- **Instagram**: Gradient backgrounds, white/light gray
- **Messenger**: `#1877f2`, white, light gray
- **Website**: Blue gradients, white cards

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Dependencies

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

## Support

For questions or issues, please contact the development team.
