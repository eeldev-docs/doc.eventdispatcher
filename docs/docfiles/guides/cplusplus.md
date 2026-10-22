---
sidebar_position: 5
description: Register, invoke and unregister EventDispatcher events from C++.
---

# Using EventDispatcher from C++

Every Blueprint node is a static function on `UEventManager`, so the C++ API matches the Blueprint API.

## Setup
Add the module to your `.Build.cs`:

```csharp
PrivateDependencyModuleNames.AddRange(new string[] { "EventDispatcher" });
```

Include the header:

```cpp
#include "EventDispatcherManager.h"
```

## Callbacks must be UFUNCTIONs
The callbacks are dynamic delegates, so the function you bind must be a `UFUNCTION()`. Lambdas and raw function pointers are not supported.

```cpp
UCLASS()
class AScoreDisplay : public AActor
{
	GENERATED_BODY()

protected:
	virtual void BeginPlay() override;
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;

	UFUNCTION()
	void OnScoreChanged(int32 NewScore);

	UPROPERTY(EditAnywhere)
	UEventIdentifier* ScoreChangedEvent;
};
```

## Registering

```cpp
void AScoreDisplay::BeginPlay()
{
	Super::BeginPlay();

	FIntEventDelegate Callback;
	Callback.BindDynamic(this, &AScoreDisplay::OnScoreChanged);

	UEventManager::RegisterIntEvent(this, ScoreChangedEvent, Callback);
}
```

The first argument is the world context and also the object that [Optional Target](/docfiles/guides/targeting) and **Unregister … By Object** match against.

For a named event:

```cpp
UEventManager::RegisterIntEventName(this, TEXT("ScoreChanged"), Callback);
```

## Invoking

```cpp
UEventManager::InvokeIntEvent(this, nullptr, ScoreChangedEvent, 42);
UEventManager::InvokeIntEventName(this, nullptr, TEXT("ScoreChanged"), 42);
```

The second argument is the optional target. Pass `nullptr` to reach every listener.

## Unregistering

```cpp
void AScoreDisplay::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	UEventManager::UnregisterEventByObject(this, ScoreChangedEvent, this);

	Super::EndPlay(EndPlayReason);
}
```

## Gameplay Tag events
`RegisterEvent` returns a handle. Any `USTRUCT` can be sent with `FInstancedStruct::Make`. Add `GameplayTags` to your module dependencies.

```cpp
UFUNCTION()
void OnQuestEvent(FGameplayTag EventTag, const FInstancedStruct& Payload);

FEventListenerHandle QuestHandle;
```

```cpp
FTagEventDelegate Callback;
Callback.BindDynamic(this, &AQuestLog::OnQuestEvent);
QuestHandle = UEventManager::RegisterEvent(this, QuestTag, Callback, true);

UEventManager::InvokeEvent(this, QuestCompletedTag, FInstancedStruct::Make(FQuestCompleted{ QuestId, Reward }));

UEventManager::UnregisterEventByHandle(this, QuestHandle);
UEventManager::UnregisterAllEventsForObject(this, this);
```

Read the payload with `Payload.GetPtr<FQuestCompleted>()`, which returns `nullptr` if the payload is another type.

## Delegate types

| Event type | Delegate | Callback signature |
|---|---|---|
| Gameplay Tag | `FTagEventDelegate` | `void(FGameplayTag EventTag, const FInstancedStruct& Payload)` |
| Simple | `FSimpleEventDelegate` | `void()` |
| Payload | `FPayloadEventDelegate` | `void(UObject* Payload)` |
| String | `FStringEventDelegate` | `void(const FString& String)` |
| Int | `FIntEventDelegate` | `void(int32 Value)` |
| Float | `FFloatEventDelegate` | `void(float Value)` |
| Bool | `FBoolEventDelegate` | `void(bool Value)` |
| Vector | `FVectorEventDelegate` | `void(const FVector& Data)` |
| String + Float | `FStringFloatEventDelegate` | `void(const FStringFloat& Data)` |
| String + Int | `FStringIntEventDelegate` | `void(const FStringInt& Data)` |

## Inspecting the manager
The manager is a Game Instance subsystem:

```cpp
UEventManager* Manager = GetGameInstance()->GetSubsystem<UEventManager>();
const int32 NumListeners = Manager->GetNumRegisteredEvents();
const int32 NumPending = Manager->GetNumQueuedEvents();
```
