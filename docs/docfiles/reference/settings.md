---
sidebar_position: 2
description: The EventDispatcher project settings.
---

# Project Settings

The settings are in **Edit → Project Settings → Game → EventDispatcher Plugin** and are saved in `Config/DefaultEngine.ini`.

| Setting | Default | Description |
|---|---|---|
| **Polling Rate** | `0.01` | How often, in seconds, the queue of invoked events is processed. `0` processes it every tick. Only used when **Dispatch Immediately** is off. |
| **Dispatch Immediately** | Off | Runs the callbacks directly inside the **Invoke** call instead of queueing them until the next poll. |
| **Dispatch While Paused** | On | Keeps processing queued events while the game is paused. When off, queued events wait until the game is unpaused. |

Changes take effect immediately, including during Play In Editor.

:::note
The polling rate uses real time and is not affected by time dilation (slow motion).
:::

See [Dispatching and Timing](/docfiles/concepts/dispatching) for how these settings affect when callbacks run.
