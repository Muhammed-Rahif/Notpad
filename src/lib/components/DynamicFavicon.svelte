<script lang="ts">
  import AppLogo from '@/components/AppLogo.svelte';
  import { onMount } from 'svelte';
  import { Notpad } from '@/helpers/notpad';

  let appLogo: SVGElement | undefined = $state();

  function injectStyleToSvg(svg: SVGElement, styles: string = ''): string {
    if (!svg || !(svg instanceof SVGElement)) {
      throw new Error('Invalid SVG element provided. Only SVG elements are accepted.');
    }

    const clonedSvg = svg.cloneNode(true) as SVGElement;

    // Create a <style> element
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.textContent = styles;

    clonedSvg.insertBefore(styleElement, clonedSvg.firstChild);

    const serializer = new XMLSerializer();
    return serializer.serializeToString(clonedSvg);
  }

  onMount(() => {
    Notpad.stores.settings.subscribe(async () => {
      if (!appLogo) return;
      await new Promise((resolve) => setTimeout(resolve, 50));

      const accentColor = getComputedStyle(document.querySelector('.fill-accent')!).fill;
      const accentForegroundColor = getComputedStyle(
        document.querySelector('.fill-accent-foreground')!
      ).fill;
      const styles = `
      .fill-accent {
        fill: ${accentColor};
      }
      .fill-accent-foreground {
        fill: ${accentForegroundColor};
      }
    `;

      const logoString = injectStyleToSvg(appLogo, styles);
      const base64Content = btoa(unescape(encodeURIComponent(logoString)));
      const dataUrl = `data:image/svg+xml;base64,${base64Content}`;

      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (link as any).rel = 'icon';
        document.head.appendChild(link);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (link as any).href = dataUrl;
    });
  });
</script>

<AppLogo class="hidden" bind:ref={appLogo} />
