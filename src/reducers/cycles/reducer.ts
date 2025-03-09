import { CycleAction, CycleActions } from "./actions";
import { produce } from "immer";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CycleStates {
    cycles: Cycle[],
    activeCycleId: string | null;
}



export function cyclesReducer(prev: CycleStates, action: CycleAction) {
    // switch (action.type) {
    //     case CycleActions.CREATE_CYCLE:
    //         return produce(prev, draft => {
    //             draft.cycles.push(action.payload.newCycle)
    //             draft.activeCycleId = action.payload.newCycle.id;
    //         })
    //     case CycleActions.INTERRUPT_CYCLE: {
    //         const currentCycleIndex = prev.cycles.findIndex(cycle => {
    //             return cycle.id == prev.activeCycleId
    //         });

    //         if (currentCycleIndex < 0) {
    //             return prev
    //         }

    //         return produce(prev, draft => {
    //             draft.activeCycleId = null;
    //             draft.cycles[currentCycleIndex].interruptedDate = new Date();
    //         })
    //     }
    //     case CycleActions.MARK_FINISHED_CYCLE:
    //         {
    //             const currentCycleIndex = prev.cycles.findIndex(cycle => {
    //                 return cycle.id == prev.activeCycleId
    //             });

    //             if (currentCycleIndex < 0) {
    //                 return prev
    //             }

    //             return produce(prev, draft => {
    //                 draft.activeCycleId = null;
    //                 draft.cycles[currentCycleIndex].finishedDate = new Date();
    //             })
    //         }
    //     default:
    //         return prev;
    // }

    return produce(prev, draft => {
        switch (action.type) {
            case CycleActions.CREATE_CYCLE:
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
                break;

            case CycleActions.INTERRUPT_CYCLE:
            case CycleActions.MARK_FINISHED_CYCLE: {
                const currentCycle = draft.cycles.find(cycle => cycle.id === draft.activeCycleId);
                if (!currentCycle) return prev;

                draft.activeCycleId = null;
                if (action.type === CycleActions.INTERRUPT_CYCLE) {
                    currentCycle.interruptedDate = new Date();
                } else {
                    currentCycle.finishedDate = new Date();
                }
                break;
            }

            default:
                return prev;
        }
    });
}