/**
 * https://svelte.dev/playground/cb0b845fce1a43aabf4421989acaca39?version=3.55.1
 */
export function resizeInputOnDynamicContent(node: HTMLInputElement) {
  const measuringElement = document.createElement('div');
  document.body.appendChild(measuringElement);

  /** duplicate the styles of the existing node, but
  remove the measuring element from the viewport. */
  function duplicateAndSet() {
    const styles = window.getComputedStyle(node);
    measuringElement.innerHTML = node.value;
    measuringElement.style.fontSize = styles.fontSize;
    measuringElement.style.fontFamily = styles.fontFamily;
    measuringElement.style.paddingLeft = styles.paddingLeft;
    measuringElement.style.paddingRight = styles.paddingRight;
    measuringElement.style.boxSizing = 'border-box';
    measuringElement.style.border = styles.border;
    measuringElement.style.width = 'max-content';
    measuringElement.style.position = 'absolute';
    measuringElement.style.top = '0';
    measuringElement.style.left = '-9999px';
    measuringElement.style.overflow = 'hidden';
    measuringElement.style.visibility = 'hidden';
    measuringElement.style.whiteSpace = 'pre';
    measuringElement.style.height = '0';
    node.style.width = `${measuringElement.offsetWidth}px`;
  }

  duplicateAndSet();
  /** listen to any style changes */
  const observer = new MutationObserver(duplicateAndSet);
  observer.observe(node, { attributes: true, childList: true, subtree: true });

  node.addEventListener('input', duplicateAndSet);
  return {
    destroy() {
      observer.disconnect();
      node.removeEventListener('input', duplicateAndSet);
    }
  };
}
