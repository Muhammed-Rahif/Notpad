import type { Action } from 'svelte/action';

export const longpress: Action<
  HTMLDivElement,
  number | undefined,
  { 'on:longpress': (e: CustomEvent<string>) => void }
> = (node, threshold = 500) => {
  const handle_mousedown = () => {
    // let start = Date.now();

    const timeout = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, threshold);

    const cancel = () => {
      clearTimeout(timeout);
      node.removeEventListener('mousemove', cancel);
      node.removeEventListener('mouseup', cancel);
    };

    node.addEventListener('mousemove', cancel);
    node.addEventListener('mouseup', cancel);
  };

  node.addEventListener('mousedown', handle_mousedown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handle_mousedown);
    }
  };
};
