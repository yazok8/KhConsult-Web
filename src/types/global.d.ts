export {};

// Define a type for the gtag function with overloads for common commands.
type Gtag = {
  (command: 'js', config: Date): void;
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', eventName: string, eventParams?: Record<string, unknown>): void;
};

declare global {
  interface Window {
    gtag: Gtag;
  }
}
