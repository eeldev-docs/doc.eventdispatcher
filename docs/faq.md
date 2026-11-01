---
sidebar_position: 3
sidebar_label: FAQ & Troubleshooting
description: Answers to common questions and problems with the EventDispatcher plugin.
---

# FAQ & Troubleshooting

## My callback is never called
Check these in order:

1. **Same tag on both sides.** The listener only receives the exact tag it registered, unless **Include Child Tags** is on. A tag event is never reached by the deprecated identifier or name nodes, and the other way around.
2. **Same payload struct.** **Get Instanced Struct Value** takes the **Not Valid** path if the payload is another struct type.
3. **Register ran before Invoke.** Events are not stored for later listeners. If the sender invokes the event before the listener has registered, for example both on **BeginPlay**, the listener misses it.
4. **Optional Target matches.** If a target is set, only the listener registered by that exact object is called. See [Targeting a Listener](/docfiles/guides/targeting).
5. **The listener is still alive and registered.** Destroyed objects and unregistered listeners are skipped.

Enable `Log LogEventDispatcher Verbose` to see every register and invoke. See [Logging and Debugging](/docfiles/reference/logging).

## My callback runs later than expected
Callbacks are queued and run on the next poll, normally the next frame. Turn on **Dispatch Immediately** if they must run inside the **Invoke** call. See [Dispatching and Timing](/docfiles/concepts/dispatching).

## My callback is called twice
Registering the same callback again is ignored, so two calls mean two different listeners: for example two instances of the same Blueprint, or the same event registered with two different Custom Events.

## Do events work in multiplayer?
Events are local to each game instance and are not replicated. Use an RPC or a replicated variable to reach other machines, then invoke the event locally. See [Scope and Lifetime](/docfiles/concepts/lifetime).

## Do listeners survive level changes?
Yes. Events live in the Game Instance. Listeners on objects that are destroyed by the level change are removed automatically.

## Can I send more than one value?
Yes. Send a struct that holds all the values as the payload of a [Gameplay Tag event](/docfiles/guides/gameplay-tag-events).

## Which tag events does a listener receive?
By default only the exact tag it registered. With **Include Child Tags** it also receives child tags, so `Event.Quest` receives `Event.Quest.Completed`. The callback's **Event Tag** pin shows which tag was invoked.

## Does the payload object get garbage collected before it arrives?
No. The plugin keeps it alive until every listener has received it.

## Should I still use Event Identifiers or named events?
No. They are deprecated since 2.0 and will be removed in a future major version. Existing Blueprints keep working but show a warning when compiled. See [Migrating to Gameplay Tag Events](/docfiles/legacy/migration).
