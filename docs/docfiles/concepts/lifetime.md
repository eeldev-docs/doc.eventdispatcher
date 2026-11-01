---
sidebar_position: 4
description: Where events live, how long listeners stay registered, and what happens across levels and in multiplayer.
---

# Scope and Lifetime

## Events belong to the Game Instance
All events and listeners are stored in a subsystem of the **Game Instance**. This means:

- Events work across every Actor, Widget and object in the same game instance.
- Listeners **survive level changes**. A listener on an object that persists across levels, such as a Widget or the Game Instance, keeps receiving events after the level changes.
- Each game instance has its own events. When you test multiplayer in the editor (Play In Editor with several players), each client is separate.

## Events are not replicated
Events only run on the machine where they are invoked. To notify other players, send a replicated RPC or variable first, then invoke the event locally on each machine that should react.

## How long a listener stays registered
A listener stays registered until one of these happens:

- It is removed with one of the [Unregister nodes](/docfiles/guides/unregistering).
- The object that owns the callback is destroyed. It is then removed automatically.
- The Event Identifier asset it was registered with is unloaded (deprecated identifier events only).
- The game instance shuts down.

Destroyed listeners are cleaned up automatically, so destroyed Actors never receive callbacks. Unregistering explicitly is still good practice for objects that should stop listening while they are alive.

## Registering twice
Registering the same callback for the same event and type again is ignored, so calling **Register** on every **BeginPlay** is safe. Two different callbacks, or the same callback on two different objects, are separate listeners and are both called.
