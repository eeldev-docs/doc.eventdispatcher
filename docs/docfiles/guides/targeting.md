---
sidebar_position: 3
description: Invoke an event on a single listener with the Optional Target pin.
---

# Targeting a Listener

Every **Invoke** node has an **Optional Target** pin.

- **Empty**: every listener registered for the event is called.
- **Set**: only the listener registered **by that object** is called.

## What counts as "the object"
The target is compared with the object that called **Register**. In Blueprint that is the Blueprint the **Register** node is in (*self*). In C++ it is the first argument (`WorldContextObject`).

For example, with ten enemies that each register for **TakeHit** on **BeginPlay**, you can hit one of them by invoking **TakeHit** with that enemy as **Optional Target**.

Each enemy registers itself:

![An enemy registers TakeHit on BeginPlay. Its callback OnTakeHit prints the enemy's name](/img/blueprints/targeting-listener.png)

The sender passes the enemy it wants to reach:

![Invoke Simple Event Name with TakeHit and the Enemy variable as Optional Target](/img/blueprints/targeting-sender.png)

Only that enemy prints its message. The other nine are not called.

:::caution
If the event was registered by a different object than the one you pass as target, for example a component registered on behalf of its owner, the target does not match and nothing is called.
:::
