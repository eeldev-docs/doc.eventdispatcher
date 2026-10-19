---
sidebar_position: 3
description: Log category, warnings and debug tools in the EventDispatcher plugin.
---

# Logging and Debugging

## Log category
The plugin logs to the **LogEventDispatcher** category. Warnings and errors are always shown. To also see every register, invoke and unregister, enable verbose logging with the console command:

```
Log LogEventDispatcher Verbose
```

## Debug Event Manager
Call the **Debug Event Manager** node to print every registered listener (name and type) and every queued event to the Output Log.

## Messages

| Message | Meaning |
|---|---|
| *Event (X) was invoked as T but no listener is registered with that type* | Listeners exist for X, but with a different [type](/docfiles/concepts/event-types). |
| *Event (X) is registered as both A and B* | The same event is used with two types. Use one type per event. |
| *Event (X) was registered without a bound callback* | The **Callback** pin was not connected. The listener was not added. |
| *No Object was specified, nothing was unregistered* | **Unregister … By Object** was called without an **Object**. |
| *Event (X) was invoked but has no listeners* (verbose) | Nobody is listening, or the [identifier or name](/docfiles/concepts/identifiers-vs-names) does not match. |
| *Event (X) is already registered for this callback* (verbose) | A duplicate registration was ignored. |
| *No EventIdentifier was specified* | The **Event Identifier** pin is empty. |
| *No GameInstance found* | The world context has no Game Instance, for example in an editor-only utility. |
