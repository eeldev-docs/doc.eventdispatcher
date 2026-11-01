---
sidebar_position: 1
description: How to install and enable the EventDispatcher plugin in an Unreal Engine project.
---

# Installing the Plugin

## Install from Fab
1. Add the plugin to your library on [Fab](https://www.fab.com/listings/dc32d4cf-9875-470f-a4e4-0264c4215724).
2. In the Epic Games Launcher, open **Unreal Engine → Library → Fab Library**, find **EventDispatcher** and click **Install to Engine**.
3. Open your project, go to **Edit → Plugins**, search for **EventDispatcher** and enable it.
4. Restart the editor when prompted.

The Blueprint nodes are now available under the **Event Dispatcher** category.

## Using the plugin from C++
If you call the plugin from C++, add the `EventDispatcher` module to your module's `.Build.cs`:

```csharp
PrivateDependencyModuleNames.AddRange(new string[] { "EventDispatcher", "GameplayTags" });
```

On Unreal Engine 5.1 – 5.4, also add `"StructUtils"` to use `FInstancedStruct`. See [Using EventDispatcher from C++](/docfiles/guides/cplusplus) for examples.

## Next step
[Register and invoke your first event](/docfiles/getting_started/using).
