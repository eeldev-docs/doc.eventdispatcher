---
sidebar_position: 2
description: Create an Event Identifier Data Asset that names a global event.
---

# Identifiers

## Event Identifiers
An Event Identifier is a Data Asset that names an event. Listeners and senders pick the same asset, so typos are impossible and renaming the asset updates every reference.

If you prefer plain text names, you can skip this step. See [Identifiers vs. Names](/docfiles/concepts/identifiers-vs-names).

1. Right-click in the Content Browser and select **Miscellaneous → Data Asset**.

![Content Browser context menu with Miscellaneous → Data Asset selected](/img/1.png)

2. Select the **EventIdentifier** class and click **Select**.

![Pick Data Asset Class dialog with EventIdentifier selected](/img/2png.png)

3. Name the asset. In this example it is called **MyEvent**.

![The MyEvent asset open in its editor, with the Event Description field, and shown in the Content Browser](/img/3.png)

The optional **Event Description** field on the asset is only there for your own notes and is not used by the plugin.

:::note
The screenshots on this page are from Unreal Engine 4. The steps are the same in Unreal Engine 5.
:::

## Next step
[Register and invoke your first event](/docfiles/getting_started/using).
