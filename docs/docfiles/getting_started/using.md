---
sidebar_position: 2
description: Create an event tag, register a listener for it and invoke it from anywhere.
---

# Using Events

Every event has two sides: a **listener** that registers a callback, and a **sender** that invokes the event. They only share the event's **Gameplay Tag**.

## 1. Create a tag
Open **Project Settings → Project → GameplayTags** and add a tag for your event, for example:

```
Event.Quest.Completed
```

Any Gameplay Tag works. Starting your event tags with a root like `Event.` keeps them together in the tag picker.

## 2. Register a listener
In the Blueprint that should react to the event, call **Register Event** (for example on **BeginPlay**). Pick the **Event Tag** and connect a **Custom Event** to the **Callback** pin.

![Register Event on BeginPlay with Event.Quest and Include Child Tags, saving the handle in Quest Handle. The callback OnQuestEvent prints the Event Tag](/img/blueprints/tag-register.png)

The callback receives the **Event Tag** that was invoked and the **Payload** that was sent. Save the returned **Handle** if you want to [unregister](/docfiles/guides/unregistering) this listener later. Otherwise it stays registered until its object is destroyed.

## 3. Invoke the event
From any other Blueprint, call **Invoke Event** with the same tag. Leave **Payload** unconnected to send no data, or connect a **Make Instanced Struct** with any struct to send data.

![Make String Int connected to Make Instanced Struct, passed as Payload to Invoke Event with Event.Quest.Completed](/img/blueprints/tag-invoke.png)

Every listener registered for **Event.Quest.Completed** now runs its callback.

:::info Callbacks run on the next poll
By default, an invoked event is queued and the callbacks run a moment later (on the next poll, normally the next frame), not inside the **Invoke Event** call. See [Dispatching and Timing](/docfiles/concepts/dispatching) if you need them to run immediately.
:::

**Invoke Event** also has an **Optional Target** pin. Leave it empty to reach every listener, or see [Targeting a Listener](/docfiles/guides/targeting).

## Next steps
- Read the payload in the callback, listen to child tags and use **Wait For Event**: [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events).
- Stop listening: [Unregistering Events](/docfiles/guides/unregistering).
- Use the plugin from code: [Using EventDispatcher from C++](/docfiles/guides/cplusplus).
