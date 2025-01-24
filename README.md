# AI YouTube Video Summariser


Ai YouTube Video Summariser is an AI-powered web application that transforms the way you interact with YouTube videos. It provides concise summaries, detailed transcripts, and an intelligent chatbot to answer your questions about the video content, saving you time and enhancing your understanding.

![image](https://github.com/user-attachments/assets/2a9e63aa-e071-4729-b61f-a9f68df23b5e)

## Features

*   **AI-Generated Summaries:** Get straight to the core ideas of any YouTube video with ViewScribe's accurate and concise summaries.
*   **Interactive Chatbot:**  Have a conversation about the video content. Ask questions, clarify concepts, and dive deeper into the topics discussed.
*   **Full Transcripts:** Access the complete video transcript for detailed review or reference.
*   **User-Friendly Interface:** A clean and intuitive design makes it easy to use.
*   **Fast and Efficient:** Powered by state-of-the-art AI models for quick processing and response times.

## Technologies Used

**Frontend:**

*   **React:** For building the user interface.
*   **TypeScript:** For type-safe JavaScript development.
*   **Vite:** For fast development and optimized builds.
*   **Shadcn UI:** For reusable UI components.
*   **Tailwind CSS:** For styling and responsive design.
*   **React Query:** For data fetching and caching.

**Backend:**

*   **Python:** The primary language for backend logic.
*   **Flask:** For creating the web application and API.
*   **yt-dlp:** For downloading audio from YouTube videos.
*   **DeepSeek API:** For generating video summaries and powering the chatbot.
*   **Whisper API (via DeepInfra):** For accurate audio transcription.

## Getting Started

### Prerequisites

*   **Node.js and npm:** Make sure you have Node.js (version 18 or later) and npm installed on your system.
*   **Python 3:** Python 3.9 or later is required for the backend.
*   **FFmpeg:** FFmpeg must be installed and accessible in your system's PATH. Used by `yt-dlp` for audio processing.
*   **API Keys:**
    *   Obtain a DeepSeek API key from [DeepSeek's website](https://platform.deepseek.com/).
    *   Get a Whisper API key from [DeepInfra](https://deepinfra.com/).

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/koushikpraneeth-ai-youtube-video-summariser.git
    cd koushikpraneeth-ai-youtube-video-summariser.git
    ```

2. **Frontend Setup:**

    ```bash
    # Navigate to the frontend directory
    cd ..
    # Install frontend dependencies
    npm install
    ```

3. **Backend Setup:**

    ```bash
    # Navigate to the backend directory
    cd backend
    # Create a virtual environment (recommended)
    python3 -m venv venv
    # Activate the virtual environment (Linux/macOS)
    source venv/bin/activate
    # Install backend dependencies
    pip install -r requirements.txt
    ```

4. **Set API Keys:**

    *   In the `backend` directory, create a new file named `.env`.
    *   Add your DeepSeek and Whisper API keys to the `.env` file:

        ```
        DEEPSEEK_API_KEY=your_deepseek_api_key
        WHISPER_API_KEY=your_whisper_api_key
        ```

### Running the Application

1. **Start the Backend Server:**

    ```bash
    # Make sure you are in the `backend` directory and have the virtual environment activated.
    flask run --port=5001
    ```

2. **Start the Frontend Development Server:**

    ```bash
    # Open a new terminal and navigate to the root directory of the project
    # koushikpraneeth-ai-youtube-video-summariser.git
    # Start the frontend server
    npm run dev
    ```

3. **Access the Application:**

    Open your web browser and go to `http://localhost:8080`.

## Usage

1. **Paste a YouTube URL:** Copy the URL of a YouTube video and paste it into the input field on the ViewScribe homepage.
2. **Get the Summary:** Click the "Summarize" button. ViewScribe will process the video and display the summary and transcript.
3. **Chat with the AI:**  Use the chat interface to ask questions about the video content. The AI chatbot will provide answers based on the transcript and summary.

## Project Structure
Use code with caution.
Markdown
Directory structure:
└── koushikpraneeth-ai-youtube-video-summariser.git/
    ├── README.md
    ├── bun.lockb
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── backend/
    │   ├── app.py
    │   └── requirements.txt
    ├── public/
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── components/
        │   ├── Chat.tsx
        │   ├── Summary.tsx
        │   ├── Transcript.tsx
        │   ├── VideoInput.tsx
        │   ├── VideoPlayer.tsx
        │   └── ui/
        │       ├── accordion.tsx
        │       ├── alert-dialog.tsx
        │       ├── alert.tsx
        │       ├── aspect-ratio.tsx
        │       ├── avatar.tsx
        │       ├── badge.tsx
        │       ├── breadcrumb.tsx
        │       ├── button.tsx
        │       ├── calendar.tsx
        │       ├── card.tsx
        │       ├── carousel.tsx
        │       ├── chart.tsx
        │       ├── checkbox.tsx
        │       ├── collapsible.tsx
        │       ├── command.tsx
        │       ├── context-menu.tsx
        │       ├── dialog.tsx
        │       ├── drawer.tsx
        │       ├── dropdown-menu.tsx
        │       ├── form.tsx
        │       ├── hover-card.tsx
        │       ├── input-otp.tsx
        │       ├── input.tsx
        │       ├── label.tsx
        │       ├── menubar.tsx
        │       ├── navigation-menu.tsx
        │       ├── pagination.tsx
        │       ├── popover.tsx
        │       ├── progress.tsx
        │       ├── radio-group.tsx
        │       ├── resizable.tsx
        │       ├── scroll-area.tsx
        │       ├── select.tsx
        │       ├── separator.tsx
        │       ├── sheet.tsx
        │       ├── sidebar.tsx
        │       ├── skeleton.tsx
        │       ├── slider.tsx
        │       ├── sonner.tsx
        │       ├── switch.tsx
        │       ├── table.tsx
        │       ├── tabs.tsx
        │       ├── textarea.tsx
        │       ├── toast.tsx
        │       ├── toaster.tsx
        │       ├── toggle-group.tsx
        │       ├── toggle.tsx
        │       ├── tooltip.tsx
        │       └── use-toast.ts
        ├── hooks/
        │   ├── use-mobile.tsx
        │   └── use-toast.ts
        ├── lib/
        │   └── utils.ts
        └── pages/
            └── Index.tsx


Project Link: (https://github.com/your-username/koushikpraneeth-ai-youtube-video-summariser.git)
