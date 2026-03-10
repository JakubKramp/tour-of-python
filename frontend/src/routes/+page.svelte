<script lang="ts">
    import { onMount } from 'svelte';

    let editorContainer: HTMLDivElement;
    let outputText = '';
    let isRunning = false;
    let editorInstance: any = null;

    // Placeholder markdown content
    const markdownContent = 'test';

    // Simple markdown renderer
    function renderMarkdown(md: string): string {
        return md
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```python\n([\s\S]+?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<[h|p|pre])/gm, '')
            .trim();
    }

    onMount(async () => {
        // Load Monaco editor
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js';
        script.onload = () => {
            (window as any).require.config({
                paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }
            });
            (window as any).require(['vs/editor/editor.main'], () => {
                editorInstance = (window as any).monaco.editor.create(editorContainer, {
                    value: `# Welcome to A Tour of Python!\nprint("Hello, World!")`,
                    language: 'python',
                    theme: 'vs-dark',
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    renderLineHighlight: 'line',
                    padding: { top: 16, bottom: 16 },
                    smoothScrolling: true,
                    cursorSmoothCaretAnimation: 'on',
                });
            });
        };
        document.head.appendChild(script);
    });

    async function runCode() {
        if (!editorInstance) return;
        isRunning = true;
        outputText = '';

        const code = editorInstance.getValue();

        try {
            // Replace with your Go backend URL
            const res = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            outputText = data.output || data.error || 'No output';
        } catch {
            outputText = '⚠ Could not connect to backend';
        } finally {
            isRunning = false;
        }
    }
</script>

<div class="layout">
    <!-- Left: Markdown -->
    <div class="panel markdown-panel">
        <div class="panel-header">
            <span class="lesson-tag">Lesson 1</span>
            <span class="lesson-title">Introduction</span>
        </div>
        <div class="markdown-content">
            <p>{@html renderMarkdown(markdownContent)}</p>
        </div>
        <div class="lesson-nav">
            <button class="nav-btn" disabled>← Previous</button>
            <span class="lesson-progress">1 / 15</span>
            <button class="nav-btn">Next →</button>
        </div>
    </div>

    <!-- Right: Editor + Output -->
    <div class="panel editor-panel">
        <div class="panel-header">
            <span class="file-name">main.py</span>
            <button class="run-btn" onclick={runCode} disabled={isRunning}>
                {#if isRunning}
                    <span class="spinner"></span> Running...
                {:else}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    Run
                {/if}
            </button>
        </div>

        <div class="editor-wrapper">
            <div bind:this={editorContainer} class="editor-container"></div>
        </div>

        <div class="output-panel">
            <div class="output-header">
                <span>Output</span>
                {#if outputText}
                    <button class="clear-btn" onclick={() => outputText = ''}>Clear</button>
                {/if}
            </div>
            <pre class="output-content">{outputText || '// Run your code to see output here'}</pre>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,wght@0,400;0,600;1,400&display=swap');

    :global(body) {
        background: #090d13;
        overflow: hidden;
    }

    .layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: calc(100vh - 58px);
        overflow: hidden;
    }

    /* Panel base */
    .panel {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-right: 1px solid #1e2936;
    }

    .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 44px;
        background: #0d1117;
        border-bottom: 1px solid #1e2936;
        flex-shrink: 0;
    }

    /* Markdown panel */
    .markdown-panel {
        background: #0a0f16;
    }

    .lesson-tag {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #4B8BBE;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        background: rgba(75, 139, 190, 0.1);
        padding: 3px 8px;
        border-radius: 4px;
        border: 1px solid rgba(75, 139, 190, 0.2);
    }

    .lesson-title {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #3d4f61;
    }

    .markdown-content {
        flex: 1;
        overflow-y: auto;
        padding: 32px 36px;
        color: #c9d1d9;
        font-family: 'Fraunces', serif;
        font-size: 16px;
        line-height: 1.8;
        scrollbar-width: thin;
        scrollbar-color: #1e2936 transparent;
    }

    .markdown-content :global(h2) {
        font-family: 'Fraunces', serif;
        font-size: 26px;
        font-weight: 600;
        color: #e6edf3;
        margin: 0 0 16px;
        line-height: 1.3;
    }

    .markdown-content :global(h3) {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        font-weight: 600;
        color: #FFD43B;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 28px 0 12px;
    }

    .markdown-content :global(strong) {
        color: #e6edf3;
        font-weight: 600;
    }

    .markdown-content :global(code) {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        background: #161b22;
        color: #FFD43B;
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid #1e2936;
    }

    .markdown-content :global(pre) {
        background: #0d1117;
        border: 1px solid #1e2936;
        border-radius: 8px;
        padding: 16px 20px;
        overflow-x: auto;
        margin: 16px 0;
    }

    .markdown-content :global(pre code) {
        background: none;
        border: none;
        padding: 0;
        color: #c9d1d9;
        font-size: 13px;
    }

    .lesson-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px;
        border-top: 1px solid #1e2936;
        background: #0d1117;
        flex-shrink: 0;
    }

    .nav-btn {
        padding: 6px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 500;
        color: #8b949e;
        background: #161b22;
        border: 1px solid #1e2936;
        cursor: pointer;
        transition: color 0.15s, border-color 0.15s;
    }

    .nav-btn:hover:not(:disabled) {
        color: #e6edf3;
        border-color: #30363d;
    }

    .nav-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .lesson-progress {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #3d4f61;
    }

    /* Editor panel */
    .editor-panel {
        background: #0d1117;
        border-right: none;
    }

    .file-name {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #8b949e;
    }

    .run-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 5px 14px;
        border-radius: 6px;
        font-size: 13px;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        color: #0d1117;
        background: #FFD43B;
        border: none;
        cursor: pointer;
        transition: background 0.15s, transform 0.15s;
    }

    .run-btn:hover:not(:disabled) {
        background: #ffc107;
        transform: translateY(-1px);
    }

    .run-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .spinner {
        width: 12px;
        height: 12px;
        border: 2px solid #0d111766;
        border-top-color: #0d1117;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        display: inline-block;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .editor-wrapper {
        flex: 1;
        overflow: hidden;
        min-height: 0;
    }

    .editor-container {
        width: 100%;
        height: 100%;
    }

    .output-panel {
        height: 180px;
        border-top: 1px solid #1e2936;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        background: #090d13;
    }

    .output-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height: 36px;
        border-bottom: 1px solid #1e2936;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #3d4f61;
        text-transform: uppercase;
        letter-spacing: 1px;
        flex-shrink: 0;
    }

    .clear-btn {
        background: none;
        border: none;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #3d4f61;
        cursor: pointer;
        transition: color 0.15s;
    }

    .clear-btn:hover { color: #8b949e; }

    .output-content {
        flex: 1;
        overflow-y: auto;
        padding: 12px 16px;
        margin: 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        color: #8b949e;
        line-height: 1.6;
        scrollbar-width: thin;
        scrollbar-color: #1e2936 transparent;
    }
</style>