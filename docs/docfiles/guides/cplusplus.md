---
sidebar_position: 5
description: Register, invoke and unregister EventDispatcher events from C++.
---

# Using EventDispatcher from C++

Every Blueprint node is a static function on `UEventManager`, so the C++ API matches the Blueprint API.

## Setup
Add the modules to your `.Build.cs`. On Unreal Engine 5.1 – 5.4, also add `StructUtils`:

```csharp
PrivateDependencyModuleNames.AddRange(new string[] { "EventDispatcher", "GameplayTags" });
```

Include the header:

```cpp
#include "EventDispatcherManager.h"
```

## Callbacks must be UFUNCTIONs
The callbacks are dynamic delegates, so the function you bind must be a `UFUNCTION()`. Lambdas and raw function pointers are not supported.

```cpp
USTRUCT(BlueprintType)
struct FQuestCompleted
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 QuestId = 0;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 Reward = 0;
};

UCLASS()
class AQuestLog : public AActor
{
	GENERATED_BODY()

protected:
	virtual void BeginPlay() override;
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;

	UFUNCTION()
	void OnQuestEvent(FGameplayTag EventTag, const FInstancedStruct& Payload);

	UPROPERTY(EditAnywhere)
	FGameplayTag QuestTag;

	FEventListenerHandle QuestHandle;
};
```

## Registering
`RegisterEvent` returns a handle. The last argument is **Include Child Tags**.

```cpp
void AQuestLog::BeginPlay()
{
	Super::BeginPlay();

	FTagEventDelegate Callback;
	Callback.BindDynamic(this, &AQuestLog::OnQuestEvent);

	QuestHandle = UEventManager::RegisterEvent(this, QuestTag, Callback, true);
}
```

The first argument is the world context and also the object that [Optional Target](/docfiles/guides/targeting) and **Unregister All Events For Object** match against.

## Invoking
Any `USTRUCT` can be sent with `FInstancedStruct::Make`. The optional target is the last argument.

```cpp
UEventManager::InvokeEvent(this, QuestCompletedTag, FInstancedStruct::Make(FQuestCompleted{ QuestId, Reward }));
UEventManager::InvokeEvent(this, QuestCompletedTag, FInstancedStruct::Make(FQuestCompleted{ QuestId, Reward }), TargetActor);
UEventManager::InvokeEvent(this, QuestStartedTag, FInstancedStruct());
```

## Reading the payload
`Payload.GetPtr<FQuestCompleted>()` returns `nullptr` if the payload is another type or empty.

```cpp
void AQuestLog::OnQuestEvent(FGameplayTag EventTag, const FInstancedStruct& Payload)
{
	if (const FQuestCompleted* Completed = Payload.GetPtr<FQuestCompleted>())
	{
		UE_LOG(LogTemp, Log, TEXT("%s: quest %d, reward %d"), *EventTag.ToString(), Completed->QuestId, Completed->Reward);
	}
}
```

## Unregistering

```cpp
void AQuestLog::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	UEventManager::UnregisterEventByHandle(this, QuestHandle);
	UEventManager::UnregisterAllEventsForObject(this, this);

	Super::EndPlay(EndPlayReason);
}
```

## Inspecting the manager
The manager is a Game Instance subsystem. `UEventManager::Get` returns it from any world context object, or `nullptr` if there is no world or game instance. All functions must be called on the game thread:

```cpp
if (UEventManager* Manager = UEventManager::Get(this))
{
	const int32 NumListeners = Manager->GetNumRegisteredEvents();
	const int32 NumPending = Manager->GetNumQueuedEvents();
	const bool bRegistered = Manager->IsHandleRegistered(QuestHandle);
	Manager->RemoveEventByHandle(QuestHandle);
}
```

## Deprecated functions
The Event Identifier and Name functions (`RegisterIntEvent`, `InvokeIntEventName`, `UnregisterEventByObject`, …) are deprecated and will be removed in a future major version. See [Migrating to Gameplay Tag Events](/docfiles/legacy/migration).

| Event type | Delegate | Callback signature |
|---|---|---|
| Gameplay Tag | `FTagEventDelegate` | `void(FGameplayTag EventTag, const FInstancedStruct& Payload)` |
| Simple (deprecated) | `FSimpleEventDelegate` | `void()` |
| Payload (deprecated) | `FPayloadEventDelegate` | `void(UObject* Payload)` |
| String (deprecated) | `FStringEventDelegate` | `void(const FString& String)` |
| Int (deprecated) | `FIntEventDelegate` | `void(int32 Value)` |
| Float (deprecated) | `FFloatEventDelegate` | `void(float Value)` |
| Bool (deprecated) | `FBoolEventDelegate` | `void(bool Value)` |
| Vector (deprecated) | `FVectorEventDelegate` | `void(const FVector& Data)` |
| String + Float (deprecated) | `FStringFloatEventDelegate` | `void(const FStringFloat& Data)` |
| String + Int (deprecated) | `FStringIntEventDelegate` | `void(const FStringInt& Data)` |
