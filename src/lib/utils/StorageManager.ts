import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

interface EventHandlers<V> {
  change: (key: string, newValue: V | null) => void;
  clear: () => void;
}

type Event = keyof EventHandlers<any>;
type UpdateEvent = Record<"change", Record<string, EventHandlers<any>["change"]>>;
type ClearEvent = Record<"clear", Record<string, EventHandlers<any>["clear"]>>;
type Events = UpdateEvent & ClearEvent;

export default class StorageManager {
  private events: Events;

  constructor() {
    this.events = {} as Events;
  }

  public async get<V>(key: string) {
    const serialisedValue = await AsyncStorage.getItem(key);
    if (!serialisedValue) return null;
    return JSON.parse(serialisedValue) as V;
  }

  public async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));

    for (const handler of Object.values(this.events.change ?? {})) {
      handler(key, value);
    }
  }

  public async remove(key: string) {
    await AsyncStorage.removeItem(key);

    for (const handler of Object.values(this.events.change ?? {})) {
      handler(key, null);
    }
  }

  public async clear() {
    await AsyncStorage.clear();

    for (const handler of Object.values(this.events.clear ?? {})) {
      handler();
    }
  }

  public addEventListener<E extends Event, V = void>(eventName: E, handler: EventHandlers<V>[E]) {
    const id = uuid.v4() as string;
    if (!this.events[eventName]) this.events[eventName] = {};
    this.events[eventName as Event][id] = handler;

    return id;
  }

  public removeEventListener(id: string) {
    let eventName: Event | undefined = undefined;

    for (const [currEventName, handlers] of Object.entries(this.events)) {
      for (const currId in handlers) {
        if (currId === id) eventName = currEventName as Event;
      }
    }

    if (!eventName) return;

    delete this.events[eventName][id];
  }

  public removeEventListeners(eventName: Event) {
    delete this.events[eventName];
  }
}
