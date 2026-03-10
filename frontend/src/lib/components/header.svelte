<script lang="ts">
  import pythonLogo from '$lib/assets/python-logo.svg';

  let menuOpen = false;
  let sidebarOpen = false;

  // Later, fetch this from your Go backend: fetch('/api/lessons')
  const lessons = [
    { slug: 'introduction', title: 'Introduction', group: 'Basics' },
    { slug: 'variables', title: 'Variables', group: 'Basics' },
    { slug: 'data-types', title: 'Data Types', group: 'Basics' },
    { slug: 'control-flow', title: 'Control Flow', group: 'Basics' },
    { slug: 'functions', title: 'Functions', group: 'Functions' },
    { slug: 'arguments', title: 'Arguments', group: 'Functions' },
    { slug: 'lambda', title: 'Lambda', group: 'Functions' },
    { slug: 'lists', title: 'Lists', group: 'Data Structures' },
    { slug: 'dicts', title: 'Dictionaries', group: 'Data Structures' },
    { slug: 'sets', title: 'Sets', group: 'Data Structures' },
    { slug: 'classes', title: 'Classes', group: 'OOP' },
    { slug: 'inheritance', title: 'Inheritance', group: 'OOP' },
    { slug: 'modules', title: 'Modules', group: 'Advanced' },
    { slug: 'decorators', title: 'Decorators', group: 'Advanced' },
    { slug: 'generators', title: 'Generators', group: 'Advanced' },
  ];

  const grouped = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.group]) acc[lesson.group] = [];
    acc[lesson.group].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);
</script>

{#if sidebarOpen}
  <div class="overlay" onclick={() => sidebarOpen = false}></div>
{/if}

<aside class="sidebar" class:open={sidebarOpen}>
  <div class="sidebar-header">
    <span>Lessons</span>
    <button onclick={() => sidebarOpen = false} aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
  <nav class="sidebar-nav">
    {#each Object.entries(grouped) as [group, items]}
      <div class="lesson-group">
        <span class="group-label">{group}</span>
        {#each items as lesson}
          <a href="/lessons/{lesson.slug}" class="lesson-link" onclick={() => sidebarOpen = false}>
            {lesson.title}
          </a>
        {/each}
      </div>
    {/each}
  </nav>
</aside>

<header>
  <nav>
    <div class="logo">
      <a href="https://www.python.org/psf-landing/" target="_blank">
        <img src={pythonLogo} alt="Python logo" width="32" height="32" />
      </a>
      <a href="/" class="logo-text-link">
        <span class="logo-text">A Tour of <em>Python</em></span>
      </a>
    </div>

    <div class="nav-links" class:open={menuOpen}>
      <button class="nav-link lessons-btn" onclick={() => sidebarOpen = true}>
        Lessons
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <a href="https://github.com" class="github-btn" target="_blank">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        GitHub
      </a>
    </div>

    <button class="menu-toggle" onclick={() => menuOpen = !menuOpen} aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="progress-bar">
    <div class="progress-fill"></div>
  </div>
</header>

<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap');

  /* Header */
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    background: #0d1117;
    border-bottom: 1px solid #1e2936;
    font-family: 'DM Sans', sans-serif;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 24px;
    height: 56px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo a {
    display: flex;
    align-items: center;
  }

  .logo img {
    transition: transform 0.3s ease;
  }

  .logo a:first-child:hover img {
    transform: rotate(-8deg) scale(1.05);
  }

  .logo-text-link {
    text-decoration: none;
  }

  .logo-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 600;
    color: #8b949e;
    letter-spacing: -0.3px;
  }

  .logo-text em {
    font-style: normal;
    color: #FFD43B;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #8b949e;
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
  }

  .nav-link:hover {
    color: #e6edf3;
    background: #161b22;
  }

  .lessons-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  .github-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 8px;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #0d1117;
    background: #FFD43B;
    text-decoration: none;
    transition: background 0.15s, transform 0.15s;
  }

  .github-btn:hover {
    background: #ffc107;
    transform: translateY(-1px);
  }

  .progress-bar { height: 2px; background: #1e2936; }

  .progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #4B8BBE, #FFD43B);
    border-radius: 0 2px 2px 0;
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .menu-toggle span {
    display: block;
    width: 20px;
    height: 2px;
    background: #8b949e;
    border-radius: 2px;
  }

  /* Overlay */
  .overlay {
    position: fixed;
    top: 58px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 199;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
  }

  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 58px;
    right: 0;
    z-index: 200;
    height: calc(100vh - 58px);
    width: 280px;
    background: #0d1117;
    border-left: 1px solid #1e2936;
    transform: translateY(-110%);
    opacity: 0;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
  }

  .sidebar.open {
    transform: translateY(0);
    opacity: 1;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #1e2936;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    color: #FFD43B;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .sidebar-header button {
    background: none;
    border: none;
    cursor: pointer;
    color: #8b949e;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    transition: color 0.15s, background 0.15s;
  }

  .sidebar-header button:hover {
    color: #e6edf3;
    background: #161b22;
  }

  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
  }

  .lesson-group {
    margin-bottom: 8px;
  }

  .group-label {
    display: block;
    padding: 8px 20px 4px;
    font-size: 11px;
    font-weight: 600;
    color: #3d4f61;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .lesson-link {
    display: block;
    padding: 7px 20px 7px 28px;
    font-size: 14px;
    color: #8b949e;
    text-decoration: none;
    transition: color 0.15s, background 0.15s, border-left-color 0.15s;
    border-left: 2px solid transparent;
    margin: 0 8px;
    border-radius: 0 6px 6px 0;
  }

  .lesson-link:hover {
    color: #e6edf3;
    background: #161b22;
    border-left-color: #FFD43B;
  }

  @media (max-width: 640px) {
    .menu-toggle { display: flex; }

    .nav-links {
      display: none;
      position: absolute;
      top: 57px;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      background: #0d1117;
      border-bottom: 1px solid #1e2936;
      padding: 12px 16px;
      gap: 4px;
    }

    .nav-links.open { display: flex; }
    .github-btn { margin-left: 0; justify-content: center; }
  }
</style>