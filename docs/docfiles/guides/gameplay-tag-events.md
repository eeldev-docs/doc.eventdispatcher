---
sidebar_position: 1
description: Use Gameplay Tags as event identifiers and send any struct as payload with Register Event, Invoke Event and Wait For Event.
---

# Gameplay Tag Events

Gameplay Tag events are the recommended way to use EventDispatcher. One set of nodes covers every kind of data:

- The event is identified by a **Gameplay Tag**, for example `Game.Quest.Completed`.
- Any **struct** can be sent as payload, or nothing at all.
- **Register Event** returns a **handle** that unregisters exactly that listener.
- **Wait For Event** waits for an event directly in the Blueprint graph.

## Creating tags
Add your event tags in **Project Settings → Project → GameplayTags**, or in a tag Data Table or `.ini` file as for any other Gameplay Tag. A common convention is a root like `Event.`:

```
Event.Quest
Event.Quest.Completed
Event.Inventory.ItemAdded
```

## Registering
Call **Register Event**, pick the **Event Tag** and connect a Custom Event to **Callback**. The callback receives:

- **Event Tag**: the tag the event was invoked with.
- **Payload**: an *Instanced Struct* with the data that was sent.

Save the returned **Handle** in a variable if you want to unregister this listener later.

![Register Event on BeginPlay with Event.Quest and Include Child Tags, saving the handle in Quest Handle. The callback OnQuestEvent prints the Event Tag](/img/blueprints/tag-register.png)

### Listening to child tags
Expand the node and enable **Include Child Tags** to also receive events invoked with child tags. A listener on `Event.Quest` then receives `Event.Quest.Completed` and `Event.Quest.Started` too. The **Event Tag** pin tells you which one was invoked.

## Invoking
Call **Invoke Event** with the tag. To send data:

1. Create any struct, for example a Blueprint Structure `S_QuestCompleted` with **QuestId** and **Reward**.
2. Connect a **Make Instanced Struct** node to **Payload** and plug your struct into it.

![Make String Int connected to Make Instanced Struct, passed as Payload to Invoke Event with Event.Quest.Completed](/img/blueprints/tag-invoke.png)

The example uses the plugin's **StringInt** struct so that it works without creating a struct first. Your own struct is connected the same way.

Leave **Payload** unconnected to send no data. **Optional Target** works as for the other events, see [Targeting a Listener](/docfiles/guides/targeting).

## Reading the payload
In the callback, use **Get Instanced Struct Value** on **Payload** and select your struct type. The **Valid** output runs when the payload is that struct type, and **Not Valid** runs otherwise.

![Get Instanced Struct Value on Payload, broken into String and Value on Valid, with a message printed on Not Valid](/img/blueprints/tag-read-payload.png)

## Unregistering

| Node | Removes |
|---|---|
| **Unregister Event By Handle** | The single listener the handle refers to. The handle is reset. |
| **Unregister All Events For Object** | Every listener (of any event type) that an object registered |

**Is Event Handle Registered** tells you whether a handle still refers to a registered listener. See also [Unregistering Events](/docfiles/guides/unregistering).

![Is Event Handle Registered on Quest Handle into a Branch, which calls Unregister Event By Handle on True](/img/blueprints/tag-unregister-by-handle.png)

## Wait For Event
**Wait For Event** is an async node that registers for you and fires its **On Event** output when the event is invoked.

| Pin | Description |
|---|---|
| **Event Tag** | The tag to wait for |
| **Only Trigger Once** | On (default): stop after the first event. Off: keep firing until **End Task** is called. |
| **Include Child Tags** | Also fire for child tags (advanced pin) |
| **Async Task** | The running wait. Store it in a variable to call **End Task** later. |
| **On Event** | Fires with **Event Tag** and **Payload** |

The wait stops automatically when the Blueprint that started it is destroyed. To stop a repeating wait earlier, save **Async Task** in a variable and call **End Task** on it.

![Wait For Event on BeginPlay with Event.Quest.Completed and Only Trigger Once off, saving Async Task in Wait Task and printing the Event Tag on every event. A Custom Event StopWaiting calls End Task on Wait Task](/img/blueprints/tag-wait-for-event.png)

**Unregister All Events For Object** also removes the listeners of every **Wait For Event** that the object started, so those waits never fire again.

## Requirements
Gameplay Tag events require Unreal Engine 5.0 or newer. On Unreal Engine 5.0 – 5.4 they use the **Struct Utils** plugin, which is enabled together with EventDispatcher. From 5.5, Instanced Structs are part of the engine.
