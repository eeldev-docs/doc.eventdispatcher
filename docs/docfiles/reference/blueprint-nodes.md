---
sidebar_position: 1
description: All Blueprint nodes in the EventDispatcher plugin.
---

# Blueprint Nodes

All nodes are in the **Event Dispatcher** category and are also available as static C++ functions on `UEventManager`. The world context pin is filled in automatically in Blueprint.

## Register
Starts listening to an event. **Callback** is the event (usually a Custom Event) that runs when the event is invoked.

| Node | Pins |
|---|---|
| Register *Type* Event | **Event Identifier** (EventIdentifier asset), **Callback** |
| Register *Type* Event Name | **Event Identifier** (String), **Callback** |

*Type* is one of Simple, Payload, String, Int, Float, Bool, Vector, String Float or String Int. See [Event Types](/docfiles/concepts/event-types) for each callback's signature.

## Invoke
Triggers an event. By default the callbacks run on the next poll, see [Dispatching and Timing](/docfiles/concepts/dispatching).

| Node | Pins |
|---|---|
| Invoke *Type* Event | **Optional Target**, **Event Identifier** (EventIdentifier asset), data pin |
| Invoke *Type* Event Name | **Optional Target**, **Event Identifier** (String), data pin |

The data pin depends on the type: none for Simple, **Payload**, **String**, **Value** (Int, Float, Bool) or **Data** (Vector, String Float, String Int). See [Targeting a Listener](/docfiles/guides/targeting) for **Optional Target**.

## Unregister

| Node | Pins | Removes |
|---|---|---|
| Unregister Event By Object | **Event Identifier**, **Object** | The listeners **Object** registered for the identifier |
| Unregister Event Name By Object | **Event Identifier** (String), **Object** | The listeners **Object** registered for the name |
| Unregister Event | **Event Identifier** | All listeners for the identifier |
| Unregister Event Name | **Event Identifier** (String) | All listeners for the name |
| Unregister Events | | All listeners and all queued events |

See [Unregistering Events](/docfiles/guides/unregistering).

## Debug

| Node | Description |
|---|---|
| Debug Event Manager | Prints every registered listener and every queued event to the Output Log. See [Logging and Debugging](/docfiles/reference/logging). |
