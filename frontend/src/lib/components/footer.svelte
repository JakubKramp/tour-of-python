<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchQuote, type Quote } from '$lib/quotes';

    let quote: Quote | null = null;

    onMount(async () => {
        quote = await fetchQuote();
    });
</script>

<footer>
    <div class="quote-section">
        {#if quote}
            <span class="quote-mark">"</span>
            <p class="quote-text">{quote.text}</p>
            <span class="quote-speaker">— {quote.speaker}, Monty Python's Flying Circus</span>
        {:else}
            <span class="quote-placeholder">Loading wisdom...</span>
        {/if}
    </div>

    <div class="links">
        <a href="https://github.com" target="_blank" class="footer-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
        </a>
    </div>
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Fraunces:ital,wght@0,400;1,400&display=swap');

    footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 28px;
        height: 48px;
        background: #0d1117;
        border-top: 1px solid #1e2936;
        width: 100%;
    }

    .quote-section {
        display: flex;
        align-items: center;
        gap: 8px;
        overflow: hidden;
    }

    .quote-mark {
        font-family: 'Fraunces', serif;
        font-size: 24px;
        color: #FFD43B;
        line-height: 1;
        opacity: 0.6;
        flex-shrink: 0;
    }

    .quote-text {
        font-family: 'Fraunces', serif;
        font-style: italic;
        font-size: 13px;
        color: #8b949e;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .quote-speaker {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #3d4f61;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .quote-placeholder {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #3d4f61;
        font-style: italic;
    }

    .links {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
        margin-left: 24px;
    }

    .footer-link {
        display: flex;
        align-items: center;
        gap: 5px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #3d4f61;
        text-decoration: none;
        transition: color 0.15s;
    }

    .footer-link:hover {
        color: #8b949e;
    }
</style>