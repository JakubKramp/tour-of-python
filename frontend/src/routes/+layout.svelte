<script lang="ts">
  import favicon from '$lib/assets/python-logo-only.png';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
  <Header />
  <main>
    {@render children()}
  </main>
  <Footer />
</div>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  main {
    flex: 1;
    overflow: hidden;
  }
</style>