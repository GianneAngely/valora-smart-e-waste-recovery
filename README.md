# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- TensorFlow.js with COCO-SSD for client-side object detection

## Features

### 🤖 Client-Side Object Detection

This application uses TensorFlow.js with the COCO-SSD model to detect e-waste/electronics in real-time directly in the browser:

- **Real-time detection**: Detects objects at ~20-30 FPS on modern devices
- **Offline capable**: Works completely offline after initial model load (~5MB, cached by browser)
- **No backend required**: All detection happens client-side in the browser
- **Visual feedback**: Color-coded bounding boxes (green for electronics)
- **Auto-mapping**: Detected objects are automatically mapped to e-waste categories

#### Supported Electronics Detection:
- Smartphones (cell phone)
- Laptops
- Keyboards
- Mice
- Remote controls
- Monitors/TVs
- Microwaves
- Small appliances (toasters, hair dryers, etc.)

#### Usage:
1. Open the Scan page
2. Wait for the AI model to load (first time only)
3. Point your camera at electronic devices or upload a photo
4. See real-time bounding boxes and detected items
5. Manual selection is available as a fallback option

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
