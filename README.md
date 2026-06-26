```markdown
# GenAI Core Lab

An interactive, modular web application designed to help users visualize and understand the foundational concepts of Large Language Models (LLMs) and Generative AI. Built with React and Tailwind CSS v4, this platform turns complex theoretical concepts into intuitive, real-time visual sandboxes.

## Features

- **Module 1: Text Tokenization**: Visualize how raw text is broken down into sub-word tokens and mapped to permanent statistical Token IDs before being passed downstream into an LLM.
- **Module 2: Vector Embeddings**: Observe how words are converted into geometric coordinates within a vector space, demonstrating semantic proximity through real-time Cosine Similarity calculations.
- **Module 3: Self-Attention Mechanism**: Interact with a transformer attention matrix heatmap to witness how models evaluate contextual dependencies and resolve pronoun ambiguities dynamically.

---

## Architecture & Scalability

The platform uses a **modular, plugin-based architecture**. Each educational module lives in its own self-contained directory under `src/modules/`. This design ensures that new modules (e.g., RAG Pipelines, Prompt Engineering Sandbox) can be integrated seamlessly into the global layout without modifying or disrupting existing module code.

```text
ai-learning-hub/
├── src/
│   ├── components/          # Shared global UI components (Layout, Shell)
│   │   └── Layout.jsx
│   ├── modules/             # Independent AI Educational Modules
│   │   ├── tokenizer/       # Module 1: Tokenizer Core
│   │   │   ├── mockData.js
│   │   │   └── TokenizerModule.jsx
│   │   ├── embeddings/      # Module 2: Embeddings Core
│   │   │   ├── mockEmbeddingsData.js
│   │   │   └── EmbeddingsModule.jsx
│   │   └── attention/       # Module 3: Attention Core
│   │       ├── mockAttentionData.js
│   │       └── AttentionModule.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css

```

---

## Tech Stack

* **Frontend Library**: React (JavaScript / `.jsx`)
* **Build Tool**: Vite
* **Styling Engine**: Tailwind CSS v4 (Native Vite plugin architecture, zero-config file installation)
* **Icon Pack**: Lucide React

---

## Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### Installation

1. Clone the repository to your local machine:
```bash
git clone [https://github.com/YOUR_USERNAME/genai-core-lab.git](https://github.com/YOUR_USERNAME/genai-core-lab.git)

```


2. Navigate into the project directory:
```bash
cd ai-learning-hub

```


3. Install the project dependencies:
```bash
npm install

```



### Running the Project

Launch the local development server with the following command:

```bash
npm run dev

```

Once started, open your browser and navigate to the local URL provided in your terminal (typically `http://localhost:5173`).

---

## Production Build

To compile the application down into optimized, static HTML, CSS, and JavaScript files ready for deployment (Vercel, Netlify, etc.), run:

```bash
npm run build

```

The output files will be generated in the root `/dist` directory.

```

```