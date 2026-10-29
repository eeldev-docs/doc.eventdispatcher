---
sidebar_position: 4
description: Stop listening to events with the Unregister nodes.
---

# Unregistering Events

| Node | Removes |
|---|---|
| **Unregister Event By Object** | The listeners that **one object** registered for an identifier |
| **Unregister Event Name By Object** | The listeners that **one object** registered for a name |
| **Unregister Event** | **All** listeners for an identifier, from every object |
| **Unregister Event Name** | **All** listeners for a name, from every object |
| **Unregister Event By Handle** | The single listener a [Register Event](/docfiles/guides/gameplay-tag-events) handle refers to |
| **Unregister All Events For Object** | **Every** listener that **one object** registered, for any event and type |
| **Unregister Events** | **Every** listener for every event, and the whole queue |

## Stop listening from one object
In most cases you want an object to stop listening without affecting anyone else. Use **Unregister All Events For Object** with *self* as **Object**, for example on **EndPlay** or when a Widget is closed. Use **Unregister Event By Object** to remove only one event.

![Unregister All Events For Object with self on End Play, and Unregister Event By Object with MyEvent and self from a Custom Event](/img/blueprints/unregister.png)

**Object** must be set. If it is empty, nothing is removed and a warning is logged. To remove every listener, use **Unregister Event** instead.

## Effect on queued events
Unregistering also cancels calls that are already queued for the removed listeners. A listener that is unregistered in the same frame as an event was invoked will not receive it. **Unregister Events** clears the whole queue.

It is safe to unregister from inside a callback, including **Unregister Events**.

## Do I have to unregister?
Not for destroyed objects. They are removed automatically (see [Scope and Lifetime](/docfiles/concepts/lifetime)). Unregister when an object that is still alive should stop listening, or when you want to clear events on purpose, for example when returning to the main menu.
