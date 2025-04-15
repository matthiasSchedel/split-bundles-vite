export interface EventPayload {
  eventName: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
  };
  eventData?: {
    value?: number;
    currency?: string;
    contentType?: string;
    contentIds?: string[];
    [key: string]: any;
  };
  customData?: Record<string, any>;
}

export interface TrackerOptions {
  debug?: boolean;
  disableCookies?: boolean;
}

export type EventCallback = (eventPayload: EventPayload) => void;
