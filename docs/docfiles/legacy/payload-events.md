---
sidebar_position: 5
slug: /docfiles/guides/payload-events
description: Send any data with an event by passing an object as a payload.
---

# Payload Events

:::caution Deprecated
This page describes the legacy API, which is deprecated since 2.0 and will be removed in a future major version. Use [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events) instead. See [Migrating to Gameplay Tag Events](/docfiles/legacy/migration).
:::

A Payload event sends an object with the event. The object can hold any variables you want.

:::tip
To send a struct instead of an object, use [Gameplay Tag Events](/docfiles/guides/gameplay-tag-events). You don't need to create an object for each event.
:::

## Creating the payload object
1. Create a new Blueprint Class. Under **All Classes**, search for and select **PayloadObject**.

![Pick Parent Class dialog with PayloadObject selected](/img/create_payload.png)

2. Open the Blueprint and check that the parent class is **Payload Object**.

![BP_Payload Class Settings showing Payload Object as parent class](/img/payload_settings.png)

3. Add the variables you want to send. Enable **Instance Editable** and **Expose on Spawn** so you can set them directly when the object is created.

![BP_Payload with the variables MyBool and MyString, with Instance Editable and Expose on Spawn enabled](/img/payload_variables.png)

:::tip
**PayloadObject** is a convenient base class, but any object can be sent as a payload. You can also pass an existing Actor, Widget or Data Asset.
:::

## Registering a Payload event
Call **Register Payload Event** (or **Register Payload Event Name**). The callback receives the object as **Payload**. Cast it to your payload class to read the variables.

![Register Payload Event bound to a Custom Event that casts Payload to BP_Payload and prints My String](/img/register_payload-1.png)

## Invoking a Payload event
Create the payload with **Construct Object from Class**, fill in the variables, and pass it to **Invoke Payload Event**.

![Construct BP_Payload with My String set, passed to Invoke Payload Event](/img/invoke_payload-2.png)

:::note
These two screenshots show an older version of the name-based nodes. Today they are called **Register Payload Event Name** / **Invoke Payload Event Name**, the name pin is called **Event Identifier**, and the invoke node also has an **Optional Target** pin.
:::

## Payload lifetime
The plugin keeps the payload object alive until every listener has received it. You don't need to store a reference to it just to make sure it arrives. After delivery the normal garbage collection rules apply: if a listener needs to keep the object, it should store it in a variable.
