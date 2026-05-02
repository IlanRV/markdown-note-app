# Markdown Note App

A lightweight Node.js application that takes a folder of `.md` files and serves them as beautifully rendered HTML pages. Drop your markdown notes into the `notes/` directory and the app will list them on a home page where you can click through to read each one. It uses only **express** and **marked** — no native binary dependencies, no build tools, no frameworks.

## Features

- Reads all `.md` files from the `notes/` folder automatically
- Converts markdown to HTML using [marked](https://github.com/markedjs/marked)
- Serves rendered notes on a clean, styled HTML page
- Includes a home page listing all available notes
- Checkbox / to-do list support in markdown
- Zero native dependencies — runs in any Node.js environment, including WebAssembly sandboxes

## How to Run

```bash
# Install dependencies and start the server
npm install && npm start
```

The app will be available at **http://localhost:4000**.

For development (Node.js ≥18.11 `--watch` flag):

```bash
npm run dev
```

## Usage

1. Add `.md` files to the `notes/` folder.
2. Start the server with `npm start`.
3. Open **http://localhost:4000** in your browser.
4. Click any note title to view the rendered HTML.

```
notes/
├── hello.md   → http://localhost:4000/note/hello
└── todo.md    → http://localhost:4000/note/todo
```

## Endpoints

| Route | Description |
|---|---|
| `GET /` | Lists all available notes with links |
| `GET /note/:slug` | Renders the matching `.md` file as HTML |

## License

MIT
