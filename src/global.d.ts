declare global {
  declare const $myMessage: { error: (content: string) => void; success: (content: string) => void; info: (content: string) => void };
  declare const $myReload: () => void;
  interface Window {
    $myReload: $myReload;
    $myMessage: $myMessage;
  }
}
export {};
