# AI-Powered Image Captioning App 

A responsive React web application that integrates with OpenAI's Vision API (`gpt-4o-mini`) to dynamically generate detailed textual descriptions for uploaded images. 

## Key Features
- **Asynchronous Data URL Processing:** Utilizes JavaScript's `FileReader` API to read and convert raw local image files into clean Base64 data URLs for immediate UI rendering and API transmission.
- **Robust Error Handling & Exponential Retry Logic:** Implements a state-driven retry mechanism (`maxRetries = 3`) with network timeout management to gracefully handle intermittent server connection or API throttling errors.
- **Modern Neubrutalism UI:** Styled using Tailwind CSS with a bold, retro-cyberpunk aesthetic, offering real-time system status feedback (Idle, Loading, Success, Error).

## Live System Demo
Below is a demonstration of the application successfully communicating with the OpenAI Vision API, processing an IoT microcontroller circuit and outputting a highly accurate contextual description:

![Application Output Demonstration](https://github.com/Atousa98/React-OpenAI-Vision-Captioner/releases/download/v1.0.0/Tool.png)

## Technical Stack
- **Frontend Framework:** React.js (Functional Components, Hooks)
- **Styling:** Tailwind CSS (Custom Neubrutalism Shadows and Layouts)
- **Icons:** Lucide-React
- **AI Integration:** OpenAI Chat Completions API (Vision-Capable Models)

## How to Run & Configure Locally

### 1. Clone the Repository
```bash
git clone [https://github.com/Atousa98/Image-Captioning-App.git](https://github.com/Atousa98/Image-Captioning-App.git)
cd Image-Captioning-App
```

### 2. Install Dependencies
Ensure you have Node.js installed, then execute:
```bash
npm install
```

### 3. API Configuration
For security reasons, the personal OpenAI API key has been removed from the public code. To run this app locally:
1. Open `src/App.jsx`.
2. Locate line 14: `const apiKey = "";`
3. Paste your valid OpenAI API Key inside the quotations: `const apiKey = "your-sk-proj-key";`

> ⚠️ **Security Warning:** Never commit or push your actual API key back to any public repository.

### 4. Launch the Local Development Server
```bash
npm start
```
The application will automatically open and run at `http://localhost:3000`.

---
*Developed as part of the Intelligent Media curriculum, 2026.*