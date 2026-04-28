declare global {
  interface Window {
    clarity?: (eventType: string, eventName: string) => void;
  }
}

export { };
