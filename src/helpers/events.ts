export type eventHandler<T extends Event> = (event: T) => void;

export function on(
  target: HTMLElement,
  eventName: string,
  handler: eventHandler<Event>,
) {
  target.addEventListener(eventName, handler);
}

export function remove(
  target: HTMLElement,
  eventName: string,
  handler: eventHandler<Event>,
) {
  target.removeEventListener(eventName, handler);
}

export function emit(target: HTMLElement, eventName: string, value?: string) {
  const event = new CustomEvent(eventName, { detail: value });
  target.dispatchEvent(event);
}
