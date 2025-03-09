import { Cycle } from "./reducer";

export enum CycleActions {
    CREATE_CYCLE = "CREATE_CYCLE",
    INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
    MARK_FINISHED_CYCLE = "MARK_FINISHED_CYCLE",
}

export type CycleAction =
    | { type: CycleActions.CREATE_CYCLE; payload: { newCycle: Cycle } }
    | { type: CycleActions.INTERRUPT_CYCLE }
    | { type: CycleActions.MARK_FINISHED_CYCLE };

export function addNewCycleAction(newCycle: Cycle): CycleAction {
    return {
        type: CycleActions.CREATE_CYCLE,
        payload: {
            newCycle,
        }
    }
}

export function markCurrentCycleFinishedAction(): CycleAction {
    return {
        type: CycleActions.MARK_FINISHED_CYCLE
    }
}


export function interruptCurrentCycleAction(): CycleAction {
    return {
        type: CycleActions.INTERRUPT_CYCLE
    }
}