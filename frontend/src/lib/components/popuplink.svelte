<script lang="ts">
    let { href, text } = $props();

    let showPopup = $state(false);
    let triggerEl: HTMLSpanElement;

    const isPeopleLink = href?.startsWith('/people/');

    const person = isPeopleLink ? {
        name: 'Guido van Rossum',
        bio: 'Creator of Python. Benevolent Dictator For Life (retired).',
        avatar_url: '',
        links: [
            { label: 'Twitter', url: 'https://twitter.com/gvanrossum' },
            { label: 'GitHub', url: 'https://github.com/gvanrossum' },
        ]
    } : null;

    function positionPopup() {
        if (!triggerEl) return;
        const rect = triggerEl.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const top = spaceBelow > 220 ? rect.bottom + 8 : rect.top - 220 - 8;
        return `top: ${top}px; left: ${rect.left}px;`;
    }

    function handleClick() {
        showPopup = !showPopup;
    }

    function handleOutsideClick(e: MouseEvent) {
        if (triggerEl && !triggerEl.contains(e.target as Node)) {
            showPopup = false;
        }
    }
</script>

<svelte:window onclick={handleOutsideClick} />

{#if isPeopleLink}
  <span
          bind:this={triggerEl}
          class="person-link"
          role="button"
          tabindex="0"
          onclick={(e) => { e.stopPropagation(); handleClick(); }}
  >
    {text}
  </span>

    {#if showPopup && person}
        <div class="popup" style={positionPopup()}>
            <div class="popup-content">
                <div class="popup-top">
                    {#if person.avatar_url}
                        <img src={person.avatar_url} alt={person.name} class="avatar" />
                    {:else}
                        <div class="avatar-placeholder">{person.name[0]}</div>
                    {/if}
                    <div class="popup-info">
                        <span class="popup-name">{person.name}</span>
                        <span class="popup-bio">{person.bio}</span>
                    </div>
                </div>
                {#if person.links?.length}
                    <div class="popup-links">
                        {#each person.links as link}
                            <a href={link.url} target="_blank" class="popup-link">{link.label}</a>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    {/if}
{:else}
    <a {href}>{text}</a>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=DM+Sans:wght@400;500&display=swap');

    .person-link {
        color: #4B8BBE;
        border-bottom: 1px dashed #4B8BBE66;
        cursor: pointer;
        transition: color 0.15s, border-color 0.15s;
        font-family: inherit;
    }

    .person-link:hover {
        color: #6fafd4;
        border-bottom-color: #6fafd4;
    }

    :global(.popup) {
        position: fixed;
        z-index: 9999;
        width: 280px;
        background: #0d1117;
        border: 1px solid #1e2936;
        border-radius: 10px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
        overflow: hidden;
        animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    :global(.popup-content) {
        padding: 16px;
    }

    :global(.popup-top) {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        margin-bottom: 12px;
    }

    :global(.avatar) {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #1e2936;
        flex-shrink: 0;
    }

    :global(.avatar-placeholder) {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #161b22;
        border: 2px solid #1e2936;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'JetBrains Mono', monospace;
        font-size: 18px;
        color: #FFD43B;
        flex-shrink: 0;
    }

    :global(.popup-info) {
        display: flex;
        flex-direction: column;
        gap: 4px;
        overflow: hidden;
    }

    :global(.popup-name) {
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #e6edf3;
    }

    :global(.popup-bio) {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #8b949e;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    :global(.popup-links) {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding-top: 10px;
        border-top: 1px solid #1e2936;
    }

    :global(.popup-link) {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #4B8BBE;
        text-decoration: none;
        background: rgba(75, 139, 190, 0.1);
        border: 1px solid rgba(75, 139, 190, 0.2);
        padding: 3px 8px;
        border-radius: 4px;
        transition: background 0.15s, border-color 0.15s;
    }

    :global(.popup-link:hover) {
        background: rgba(75, 139, 190, 0.2);
        border-color: rgba(75, 139, 190, 0.4);
    }
</style>