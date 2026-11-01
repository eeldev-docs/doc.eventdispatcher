---
sidebar_position: 3
slug: /docfiles/concepts/event-types
description: The event types in EventDispatcher and the data each one carries.
---

# Event Types

:::caution Deprecated
This page describes the legacy API, which is deprecated since 2.0 and will be removed in a future major version. Use [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events) instead. See [Migrating to Gameplay Tag Events](/docfiles/legacy/migration).
:::

## Gameplay Tag events
**Register Event** and **Invoke Event** use a Gameplay Tag as identifier and send any struct as payload, so a single pair of nodes covers every kind of data. This is the recommended way for new projects. See [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events).

## Typed events
The typed events each carry one fixed kind of data. Every type has its own **Register** and **Invoke** nodes, in an identifier version and a [Name version](/docfiles/concepts/identifiers-vs-names).

| Type | Register node | Invoke node | Data sent | Callback receives |
|---|---|---|---|---|
| Simple | Register Simple Event | Invoke Simple Event | nothing | nothing |
| Payload | Register Payload Event | Invoke Payload Event | **Payload** (Object) | `Payload` (Object) |
| String | Register String Event | Invoke String Event | **String** | `String` |
| Int | Register Int Event | Invoke Int Event | **Value** (Integer) | `Value` (Integer) |
| Float | Register Float Event | Invoke Float Event | **Value** (Float) | `Value` (Float) |
| Bool | Register Bool Event | Invoke Bool Event | **Value** (Boolean) | `Value` (Boolean) |
| Vector | Register Vector Event | Invoke Vector Event | **Data** (Vector) | `Data` (Vector) |
| String + Float | Register String Float Event | Invoke String Float Event | **Data** (`StringFloat` struct) | `Data` with **String** and **Float** |
| String + Int | Register String Int Event | Invoke String Int Event | **Data** (`StringInt` struct) | `Data` with **String** and **Value** |

Use **Make StringFloat** / **Make StringInt** to build the struct when invoking, and **Break** to read it in the callback.

### Example: an Int event
The callback gets one pin for the data, here **Value**. The sender passes the value to the same pin on the **Invoke** node.

![Register Int Event Name with ScoreChanged, a callback that prints Value, and Invoke Int Event Name with the Score variable](/img/blueprints/typed-int-event.png)

### Example: a String + Float event
Break **Data** in the callback, and build it with **Make StringFloat** when invoking.

![Register String Float Event Name with Damage, a callback that breaks Data into String and Float, and Invoke String Float Event Name with Make StringFloat](/img/blueprints/typed-string-float-event.png)

### The type must match
A typed listener is only called when the event is invoked with **the same type** it was registered with. If you register **MyEvent** as an Int event and invoke it with **Invoke Float Event**, nothing is called, and this warning is written to the log:

```
Event (MyEvent) was invoked as Float but no listener is registered with that type
```

Registering the same identifier with two different types also logs a warning. Use one type per event.

## Need more data?
If none of the built-in types fit, send an object with a [Payload event](/docfiles/guides/payload-events). The object can hold any variables you need.
