import { Notpad } from '@/helpers/notpad';
import { get } from 'svelte/store';
import {
  TypeEffectSound,
  TypeEffectVibration,
  TypeEffectVolume,
  type SettingsType
} from '@/types/SettingsType';

export class TypeEffectPlayer {
  private audioContext: AudioContext;
  private audioBuffer: AudioBuffer | null = null;
  private audioReady: Promise<void> = Promise.resolve();
  private settings: SettingsType['typeEffect'] = {} as SettingsType['typeEffect'];

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  public init = () => {
    this.subscribeToSettings();
    this.settings = get(Notpad.stores.settings).typeEffect;
  };

  private async loadAudio(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      console.log('Audio loaded successfully!');
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }

  private subscribeToSettings(): void {
    Notpad.stores.settings.subscribe((settings) => {
      const typeEffect = settings.typeEffect;
      this.settings.volume = typeEffect.volume;
      this.settings.vibration = typeEffect.vibration;
      this.settings.sound = typeEffect.sound;

      const audioUrl = TypeEffectSound[typeEffect.sound];
      if (audioUrl) this.audioReady = this.loadAudio(audioUrl);
    });
  }

  private calculatePan(key: string): number {
    // Define key regions based on the sections of the keyboard
    const farLeftKeys = 'qaz';
    const leftKeys = 'wsxedc';
    const centerKeys = 'rfvtgb';
    const rightKeys = 'yuhnjm';
    const farRightKeys = 'ikolp;';

    key = key.toLowerCase(); // Normalize key to lowercase for comparison

    if (farLeftKeys.includes(key)) {
      return -0.5; // Far-left
    } else if (leftKeys.includes(key)) {
      return -0.3; // Left
    } else if (centerKeys.includes(key)) {
      return 0; // Center
    } else if (rightKeys.includes(key)) {
      return 0.3; // Right
    } else if (farRightKeys.includes(key)) {
      return 0.5; // Far-right
    } else {
      return 0; // Default to center if key is not found in any section
    }
  }

  private triggerVibration(strength: number): void {
    if ('vibrate' in navigator) {
      const duration = Math.max(1, Math.min(100, Math.round(strength * 100)));
      navigator.vibrate(duration);
    } else {
      console.warn('Vibration API is not supported on this device.');
    }
  }

  public async play(key?: string): Promise<void> {
    this.resumeAudioContext();
    await this.audioReady;

    if (!this.audioBuffer) {
      console.warn('Audio not loaded yet!');
      return;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;

    const panner = this.audioContext.createStereoPanner();
    panner.pan.value = key ? this.calculatePan(key) : 0;

    const volume = TypeEffectVolume[this.settings.volume];
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = volume;

    source.connect(panner).connect(gainNode).connect(this.audioContext.destination);
    source.start(0);

    const vibration = TypeEffectVibration[this.settings.vibration];
    if (vibration > 0) this.triggerVibration(vibration);
  }

  public resumeAudioContext(): void {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
