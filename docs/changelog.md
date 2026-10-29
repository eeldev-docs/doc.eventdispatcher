---
sidebar_position: 4
description: Changes in each version of the EventDispatcher plugin.
---

# Changelog

## 2.0.0
Existing Event Identifier and named events work as before, so Blueprints from 1.6.x need no changes.

- New [Gameplay Tag events](/docfiles/guides/gameplay-tag-events): **Register Event** and **Invoke Event** use a Gameplay Tag as identifier and send any struct as payload.
- Listeners can optionally receive child tags (**Include Child Tags**).
- **Register Event** returns a handle. Added **Unregister Event By Handle** and **Is Event Handle Registered**.
- Added **Unregister All Events For Object**, which removes every listener an object registered, for all event types.
- Added the async node **Wait For Event**.
- C++: added `UEventManager::Get()` and `RemoveEventByHandle()`.
- Requires Unreal Engine 5.0 or newer. Unreal Engine 4.27 is no longer supported. The module depends on `GameplayTags`, and on `StructUtils` for Unreal Engine 5.0 – 5.4.

## 1.6.8
- Invoked events now run in the order they were invoked, and the queue no longer has a limit of 100 entries.
- Unregistering a listener cancels its already queued calls.
- **Unregister Events** no longer stops later events from being queued.
- Payload objects are kept alive until every listener has received them.
- Listeners whose objects have been destroyed are removed automatically.
- Registering the same callback twice is ignored.
- Warnings are logged when an event is invoked or registered with a mismatched type, or registered without a callback.
- **Unregister … By Object** with an empty **Object** no longer removes every listener; it logs a warning instead.
- New project settings: **Dispatch Immediately** and **Dispatch While Paused**. **Polling Rate** changes now apply without restarting.
- Fixed a crash in **Debug Event Manager** with named events.
- Fixed a crash when unregistering events from inside a callback.
- Fixed problems with several game instances, such as Play In Editor with multiple players.
- `UEventIdentifier` can now be used from other C++ modules.

## 1.6.7
- Added **Unregister Event By Object** and **Unregister Event Name By Object**.

## 1.6.6
- Compatibility update for newer Unreal Engine 5 versions (new ticker API).

## 1.6.5
- Unreal Engine 5.0 support.
- Added **Unregister Event Name**.

## 1.6.4
- Internal improvements to the event queue.

## 1.6.3
- Added named events: every Register and Invoke node has a **Name** variant that takes a string instead of an Event Identifier.

## 1.6.2
- Added the **Optional Target** pin to every Invoke node.
