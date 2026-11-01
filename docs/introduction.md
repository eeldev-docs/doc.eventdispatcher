---
sidebar_position: 1
slug: /
description: EventDispatcher is a lightweight global event system for Unreal Engine that lets Blueprints and C++ communicate without direct references.
---

# Introduction

## What is the EventDispatcher plugin?
EventDispatcher is a lightweight global event system for Unreal Engine. It lets Blueprints and C++ classes communicate through events without holding direct references to each other.

Register a listener for an event in one place, for example a UMG Widget, and invoke the event from anywhere else: a GameMode, GameInstance, Level Blueprint, Actor or Component. The sender never needs to know who is listening.

```
Sender  →  Invoke Event (Event.Quest.Completed + struct)  →  Listener(s)
```

## How it works
Every event is identified by a **Gameplay Tag** and can carry **any struct** as payload. Three nodes cover almost everything:

| Node | What it does |
|---|---|
| **Register Event** | Listens for a tag and runs a callback. Returns a handle. |
| **Invoke Event** | Sends the tag with an optional struct payload. |
| **Wait For Event** | Async node that waits for a tag directly in the graph. |

See [Using Events](/docfiles/getting_started/using) for a first example and [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events) for the full guide.

## Features
- **Global events** that can be invoked from anything with a world context (Actors, Components, Widgets, UObjects).
- **Gameplay Tag identifiers**: typo-safe, picked from the tag list, and organized in a hierarchy.
- **Any struct as payload** with Instanced Structs, so one pair of nodes covers every kind of data.
- **Child-tag listening**: a listener on `Event.Quest` can also receive `Event.Quest.Completed`.
- **Handles** to unregister exactly one listener, and **Unregister All Events For Object** for cleanup.
- **Targeted invokes** that reach a single listener instead of everyone. See [Targeting a Listener](/docfiles/guides/targeting).
- **Automatic cleanup** of listeners whose objects have been destroyed.
- **Blueprint and C++ support.** Every node is also a static C++ function.

:::caution Event Identifiers and named events are deprecated
The older Event Identifier (Data Asset) and Name nodes, with their typed variants (Simple, Int, Float, String, …), are deprecated since 2.0 and will be removed in a future major version. They still work, but show a warning when the Blueprint is compiled. See [Migrating to Gameplay Tag Events](/docfiles/legacy/migration).
:::

## Common use cases
UI and HUD updates, quest and inventory changes, game state changes, global notifications and any other communication between systems that should not reference each other directly.

## Requirements
| | |
|---|---|
| Unreal Engine | 5.1 – 5.8 (versions up to 1.6.8 also support 4.27 and 5.0) |
| Target platforms | Windows, Mac, Linux, Android, iOS (see the [Fab listing](https://www.fab.com/listings/dc32d4cf-9875-470f-a4e4-0264c4215724) for the full list) |
| Networking | Events are local to one game instance and are not replicated |

## Where to go next
1. [Install the plugin](/docfiles/getting_started/installing)
2. [Register and invoke your first event](/docfiles/getting_started/using)
3. Read the [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events) guide
4. Read [Dispatching and Timing](/docfiles/concepts/dispatching). Callbacks do not run immediately by default.
