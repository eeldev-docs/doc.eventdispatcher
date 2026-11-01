---
sidebar_position: 2
slug: /docfiles/concepts/identifiers-vs-names
description: The difference between Event Identifier assets and named events, and when to use each.
---

# Identifiers vs. Names

:::caution Deprecated
This page describes the legacy API, which is deprecated since 2.0 and will be removed in a future major version. Use [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events) instead. See [Migrating to Gameplay Tag Events](/docfiles/legacy/migration).
:::

An event can be identified in two ways:

| | Event Identifier | Name |
|---|---|---|
| What it is | A Data Asset of class **EventIdentifier** | A text string |
| Nodes | **Register Simple Event**, **Invoke Simple Event**, … | **Register Simple Event Name**, **Invoke Simple Event Name**, … |
| Typo-safe | Yes, you pick the asset from a list | No, a misspelled name is a different event |
| Renaming | Rename the asset and every reference follows | Update every node by hand |
| Built at runtime | No | Yes, for example `"DoorOpened_" + DoorID` |
| Comparison | By asset | By text, **case-insensitive** (`MyEvent` = `myevent`) |

## Gameplay Tags
[Gameplay Tag Events](/docfiles/guides/gameplay-tag-events) use a third kind of identifier: a Gameplay Tag. Tags are typo-safe like identifiers, can be organized in a hierarchy, and a listener can choose to also receive child tags.

## They are separate
Identifier events, named events and Gameplay Tag events never reach each other, even if the name matches the asset name. A listener registered with the **MyEvent** asset is **not** called by **Invoke Simple Event Name** with `"MyEvent"`, and the other way around. Use the same kind on both sides.

## Which should I use?
Use **Gameplay Tags**. Event Identifiers and Names are deprecated. Tags are typo-safe like identifiers, need no asset per event, support hierarchies and send any struct with a single pair of nodes.

If the event name was built at runtime, for example `"DoorOpened_" + DoorID`, use one tag such as `Event.Door.Opened` and either pass the door as **Optional Target** or send the ID in the payload. See [Migrating to Gameplay Tag Events](/docfiles/legacy/migration).

An empty name or a missing identifier is rejected, and the editor reports *No EventIdentifier was specified*.
