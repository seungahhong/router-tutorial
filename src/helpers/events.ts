export type eventHandler<T extends Event> = (event: T) => void;
export type hashEventHandler<T extends HashChangeEvent> = (event: T) => void;

export function on(
  target: HTMLElement | Window,
  eventName: string,
  handler: eventHandler<Event>,
) {
  if (target) {
    target.addEventListener(eventName, handler);
  }
}

export function remove(
  target: HTMLElement | Window,
  eventName: string,
  handler: eventHandler<Event>,
) {
  if (target) {
    target.removeEventListener(eventName, handler);
  }
}

export function emit(target: HTMLElement, eventName: string, value?: string) {
  const event = new CustomEvent(eventName, { detail: value });
  target.dispatchEvent(event);
}
