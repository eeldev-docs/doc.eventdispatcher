---
sidebar_position: 2
description: The difference between Event Identifier assets and named events, and when to use each.
---

# Identifiers vs. Names

An event can be identified in two ways:

| | Event Identifier | Name |
|---|---|---|
| What it is | A Data Asset of class **EventIdentifier** | A text string |
| Nodes | **Register Simple Event**, **Invoke Simple Event**, … | **Register Simple Event Name**, **Invoke Simple Event Name**, … |
| Typo-safe | Yes, you pick the asset from a list | No, a misspelled name is a different event |
| Renaming | Rename the asset and every reference follows | Update every node by hand |
| Built at runtime | No | Yes, for example `"DoorOpened_" + DoorID` |
| Comparison | By asset | By text, **case-insensitive** (`MyEvent` = `myevent`) |

## They are separate
Identifier events and named events never reach each other, even if the name matches the asset name. A listener registered with the **MyEvent** asset is **not** called by **Invoke Simple Event Name** with `"MyEvent"`, and the other way around. Use the same kind on both sides.

## Which should I use?
- Use **Event Identifiers** for fixed, project-wide events. They are safer and easier to refactor.
- Use **Names** when the event name is built at runtime or comes from data, such as per-instance events.

An empty name or a missing identifier is rejected, and the editor reports *No EventIdentifier was specified*.
