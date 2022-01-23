[
  'requestFullscreen',
  'exitFullscreen',
  'fullscreenElement',
  'fullscreenEnabled',
].forEach((each) => (document[each] = () => {}));
