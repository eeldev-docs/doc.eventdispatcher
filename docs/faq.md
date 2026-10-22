---
sidebar_position: 3
sidebar_label: FAQ & Troubleshooting
description: Answers to common questions and problems with the EventDispatcher plugin.
---

# FAQ & Troubleshooting

## My callback is never called
Check these in order:

1. **Same identifier on both sides.** An identifier event is never reached by a name invoke, and the other way around. See [Identifiers vs. Names](/docfiles/concepts/identifiers-vs-names).
2. **Same type on both sides.** A listener registered as Int is not called by **Invoke Float Event**. The log shows a warning when this happens.
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
Use a [Gameplay Tag event](/docfiles/guides/gameplay-tag-events) with a struct that holds all the values. Alternatives are a [Payload event](/docfiles/guides/payload-events) with an object, or the String + Float / String + Int types for simple pairs.

## Which tag events does a listener receive?
By default only the exact tag it registered. With **Include Child Tags** it also receives child tags, so `Event.Quest` receives `Event.Quest.Completed`. The callback's **Event Tag** pin shows which tag was invoked.

## Does the payload object get garbage collected before it arrives?
No. The plugin keeps it alive until every listener has received it.
