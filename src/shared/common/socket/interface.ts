export interface ConnectionOptions {
  url: string;
  wsKey: string;
  reconnection: boolean;
  reconnectionAttempts: number;
  maxMissedHeartbeats: number;
  reconnectionDelay: number;
  onMessageCallback: ((message: any) => void) | null;
}
