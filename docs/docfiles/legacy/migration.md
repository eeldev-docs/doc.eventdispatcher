---
sidebar_position: 1
description: Move from the deprecated Event Identifier and named events to Gameplay Tag events.
---

# Migrating to Gameplay Tag Events

Since 2.0, the Event Identifier and Name nodes are **deprecated**. They still work in 2.x, but:

- Existing nodes show a deprecation warning when the Blueprint is compiled.
- The nodes no longer appear in the Blueprint context menu.
- They will be removed in a future major version.

[Gameplay Tag Events](/docfiles/guides/gameplay-tag-events) replace all of them with one set of nodes: **Register Event**, **Invoke Event** and **Wait For Event**.

## Why
| | Event Identifier | Name | Gameplay Tag |
|---|---|---|---|
| Typo-safe | Yes | No | Yes |
| Needs an asset per event | Yes | No | No |
| Hierarchy and child-tag listening | No | No | Yes |
| Data | One fixed type per node | One fixed type per node | Any struct |
| Unregister one listener | By object | By object | By handle |
| Async **Wait For Event** node | No | No | Yes |

## Node mapping

| Deprecated node | Replacement |
|---|---|
| Register *Type* Event, Register *Type* Event Name | **Register Event** |
| Invoke *Type* Event, Invoke *Type* Event Name | **Invoke Event** |
| Unregister Event By Object, Unregister Event Name By Object | **Unregister Event By Handle**, or **Unregister All Events For Object** |
| Unregister Event, Unregister Event Name | **Unregister Event By Handle** for each listener |

**Unregister Events**, **Debug Event Manager** and the project settings are not deprecated and work for every event.

## Step by step
1. **Create a tag for each event.** An Event Identifier asset `MyEvent` or a name `"MyEvent"` becomes a tag such as `Event.MyEvent` in **Project Settings → Project → GameplayTags**.
2. **Replace the data with a struct.**
   - *Simple*: send no payload.
   - *Int, Float, Bool, String, Vector*: create a struct with one variable of that type, for example `S_ScoreChanged` with **Score** (Integer).
   - *String + Float, String + Int*: send the existing **StringFloat** or **StringInt** struct, or your own.
   - *Payload*: move the object's variables into a struct. If you need to send an existing object, add an object reference variable to the struct.
3. **Replace the listener.** Swap **Register *Type* Event** for **Register Event** with the new tag. In the callback, use **Get Instanced Struct Value** on **Payload** to read your struct. Store the returned **Handle** if you unregister the listener manually.
4. **Replace the sender.** Swap **Invoke *Type* Event** for **Invoke Event** with the same tag. Connect your struct through **Make Instanced Struct** to **Payload**. **Optional Target** works as before.
5. **Replace the unregister calls** as shown in the table above.

:::warning Migrate both sides of an event together
Tag events, identifier events and named events never reach each other. A listener moved to **Register Event** is not called by an old **Invoke Simple Event**, and the other way around.
:::

## Example: an Int event
Before, a listener used **Register Int Event Name** with `"ScoreChanged"` and the sender used **Invoke Int Event Name** with the score.

After:
- Tag: `Event.Score.Changed`.
- Struct: `S_ScoreChanged` with **Score** (Integer).
- Listener: **Register Event** with `Event.Score.Changed`. The callback reads **Payload** with **Get Instanced Struct Value** as `S_ScoreChanged` and breaks out **Score**.
- Sender: **Invoke Event** with `Event.Score.Changed`, and **Make S_ScoreChanged** → **Make Instanced Struct** → **Payload**.

## Events built from runtime names
Named events were sometimes built at runtime, for example `"DoorOpened_" + DoorID`. With tags, use one tag for the event and tell the instances apart in one of these ways:

- **Optional Target**: each door registers `Event.Door.Opened` itself, and the sender passes the door it wants to reach as **Optional Target**. See [Targeting a Listener](/docfiles/guides/targeting).
- **Payload**: send the ID in the struct, and let the listener ignore events with another ID.
- **Child tags**: if the set of instances is known in advance, add tags such as `Event.Door.Opened.Front`. A listener on `Event.Door.Opened` with **Include Child Tags** receives all of them.

## C++
The deprecated functions do not produce C++ compiler warnings in 2.x, but will be removed together with the Blueprint nodes. Replace them in the same way:

| Deprecated | Replacement |
|---|---|
| `RegisterIntEvent(this, Identifier, Callback)` | `RegisterEvent(this, Tag, Callback)` with an `FTagEventDelegate` |
| `InvokeIntEvent(this, Target, Identifier, 42)` | `InvokeEvent(this, Tag, FInstancedStruct::Make(FScoreChanged{ 42 }), Target)` |
| `UnregisterEventByObject(this, Identifier, this)` | `UnregisterEventByHandle(this, Handle)` or `UnregisterAllEventsForObject(this, this)` |

See [Using EventDispatcher from C++](/docfiles/guides/cplusplus) for complete examples.
