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
Sender  →  Global Event ("MyEvent")  →  Listener(s)
```

## Features
- **Global events** that can be invoked from anything with a world context (Actors, Components, Widgets, UObjects).
- **Blueprint and C++ support.** Every function is a Blueprint node and a static C++ function.
- **Gameplay Tag events** with any struct as payload, child-tag listening, handles and a **Wait For Event** async node. See [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events).
- **Typed events**: Simple (no data), Payload (any object), String, Int, Float, Bool, Vector, String + Float and String + Int. See [Event Types](/docfiles/concepts/event-types).
- **Three ways to identify events**: Gameplay Tags, Data Asset identifiers or plain names. See [Identifiers vs. Names](/docfiles/concepts/identifiers-vs-names).
- **Targeted invokes** that reach a single listener instead of everyone. See [Targeting a Listener](/docfiles/guides/targeting).
- **Automatic cleanup** of listeners whose objects have been destroyed.

## Common use cases
UI and HUD updates, quest and inventory changes, game state changes, global notifications and any other communication between systems that should not reference each other directly.

## Requirements
| | |
|---|---|
| Unreal Engine | 5.0 – 5.8 (versions up to 1.6.8 also support 4.27) |
| Target platforms | Windows, Mac, Linux, Android, iOS (see the [Fab listing](https://www.fab.com/listings/dc32d4cf-9875-470f-a4e4-0264c4215724) for the full list) |
| Networking | Events are local to one game instance and are not replicated |

## Where to go next
1. [Install the plugin](/docfiles/getting_started/installing)
2. [Create an Event Identifier](/docfiles/getting_started/identifiers)
3. [Register and invoke your first event](/docfiles/getting_started/using)
4. Move on to [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events)
5. Read [Dispatching and Timing](/docfiles/concepts/dispatching). Callbacks do not run immediately by default.
