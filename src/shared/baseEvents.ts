export interface EventData {
  eventName: string;
  payload: Record<string, any>;
}

export class BaseEventHandler {
  protected sendEvent(data: EventData): void {
    console.log(
      `Base event handler sending event: ${data.eventName}`,
      data.payload
    );
  }

  protected validateEvent(data: EventData): boolean {
    return !!data.eventName && !!data.payload;
  }
}

export const createEventPayload = (
  data: Record<string, any>
): Record<string, any> => {
  return {
    timestamp: new Date().toISOString(),
    ...data,
  };
};
