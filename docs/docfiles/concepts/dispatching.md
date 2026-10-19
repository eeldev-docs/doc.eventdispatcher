---
sidebar_position: 3
description: When EventDispatcher callbacks run, in what order, and how to change it with the project settings.
---

# Dispatching and Timing

## Invoked events are queued
By default, an **Invoke** node does not run the callbacks itself. It puts one entry per matching listener in a queue and returns. The queue is processed on the next **poll**, which by default happens every 0.01 seconds. In practice that is the next frame.

This means:
- Code after the **Invoke** node runs **before** the listeners' callbacks.
- If you need a result from a listener, have the listener invoke an event back instead of expecting it to be done when **Invoke** returns.

## Order
Queued events run in the order they were invoked. Listeners of the same event run in the order they were registered.

If a callback invokes another event, the new event is queued and runs on the **following** poll, after everything already in the queue.

## Unregistering cancels pending calls
If a listener is unregistered or destroyed after an event was invoked but before the queue is processed, its callback is skipped. See [Unregistering Events](/docfiles/guides/unregistering).

## Changing the behavior
Three settings in **Project Settings → Game → EventDispatcher Plugin** control dispatching. See [Project Settings](/docfiles/reference/settings) for details.

| Setting | Default | Effect |
|---|---|---|
| **Polling Rate** | `0.01` | Seconds between polls. `0` processes the queue every tick. |
| **Dispatch Immediately** | Off | Runs the callbacks inside the **Invoke** call instead of queueing them. |
| **Dispatch While Paused** | On | When off, queued events wait while the game is paused. |

:::tip When to use Dispatch Immediately
Turn it on if your logic depends on listeners having run by the time **Invoke** returns. Keep in mind that a callback can then run in the middle of the sender's own logic.
:::

## Threading
The plugin must be used from the game thread. Calls from other threads are rejected, and the editor reports an error.
