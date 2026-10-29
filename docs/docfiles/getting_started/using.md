---
sidebar_position: 3
description: Register a listener for a global event and invoke it from anywhere.
---

# Using Events

Every event has two sides: a **listener** that registers a callback, and a **sender** that invokes the event. They only share the event's identifier.

## Registering an Event
In the Blueprint that should react to the event, call **Register Simple Event** (for example on **BeginPlay**). Select your identifier and connect a **Custom Event** to the **Callback** pin.

![Register Simple Event on BeginPlay with MyEvent, bound to the Custom Event OnMyEvent that prints a string](/img/blueprints/using-register.png)

The listener stays registered until it is [unregistered](/docfiles/guides/unregistering) or destroyed.

## Invoking an Event
From any other Blueprint, call **Invoke Simple Event** with the same identifier.

![Invoke Simple Event with MyEvent and an empty Optional Target, triggered by pressing key 1](/img/blueprints/using-invoke.png)

Every listener registered for **MyEvent** now runs its callback.

:::info Callbacks run on the next poll
By default, an invoked event is queued and the callbacks run a moment later (on the next poll, normally the next frame), not inside the **Invoke** call. See [Dispatching and Timing](/docfiles/concepts/dispatching) if you need them to run immediately.
:::

The **Invoke** nodes also have an **Optional Target** pin. Leave it empty to reach every listener, or see [Targeting a Listener](/docfiles/guides/targeting).

## Using a name instead of an identifier
Every node has a **Name** variant, for example **Register Simple Event Name** and **Invoke Simple Event Name**, that takes a text name instead of a Data Asset. A listener registered with a name is only reached by an invoke with the same name. See [Identifiers vs. Names](/docfiles/concepts/identifiers-vs-names).

## Sending data with an event
A Simple event carries no data. To send a value, use one of the typed events (String, Int, Float, Bool, Vector, String + Float, String + Int), or send any object as a [payload](/docfiles/guides/payload-events). See [Event Types](/docfiles/concepts/event-types).
