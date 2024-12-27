class TypeSoundPlayer {
  private audioContext: AudioContext;
  private audioUrl: string;
  private audioBuffer: AudioBuffer | null = null;
  private audioReady: Promise<void>;

  constructor(audioUrl: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.audioUrl = audioUrl;
    this.audioReady = this.loadAudio();
  }

  private async loadAudio(): Promise<void> {
    try {
      const response = await fetch(this.audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      console.log('Audio loaded successfully!');
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }

  private calculatePan(key: string): number {
    // Map the keyboard layout to a pan value
    const leftKeys = 'qwertasdfgzxcvb'; // Example keys for the left side
    const rightKeys = 'yuiophjkl;nm'; // Example keys for the right side

    if (leftKeys.includes(key.toLowerCase())) {
      return -1; // Full left
    } else if (rightKeys.includes(key.toLowerCase())) {
      return 1; // Full right
    } else {
      return 0; // Center for unsupported keys
    }
  }

  public async play(key: string): Promise<void> {
    await this.audioReady; // Ensure audio is loaded
    if (!this.audioBuffer) {
      console.warn('Audio not loaded yet!');
      return;
    }

    // Create a buffer source for each play
    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;

    // Create a stereo panner
    const panner = this.audioContext.createStereoPanner();
    panner.pan.value = this.calculatePan(key);

    // Connect the source to the panner and the destination
    source.connect(panner).connect(this.audioContext.destination);

    // Start the sound
    source.start(0);
  }

  public resumeAudioContext(): void {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Instantiate TypeSoundPlayer once and use it globally
const soundPlayer = new TypeSoundPlayer('http://localhost:5173/Notpad/click.wav');

// Event Listener
window.addEventListener('keydown', (event: KeyboardEvent): void => {
  soundPlayer.resumeAudioContext();
  soundPlayer.play(event.key);
});
