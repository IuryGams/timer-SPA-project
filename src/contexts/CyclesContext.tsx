import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
    task: string;
    minutesAmount: number;
}


interface CyclesContextType {
    cycles: Cycle[];
    activeCycle?: Cycle;
    activeCycleId: string | null;
    amountSecondsPassed: number;

    markCurrentCycleAsFinishid: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType);

interface CycleContextProviderProps {
    children: ReactNode
}



export function CycleContextProvider({ children }: CycleContextProviderProps) {
    const [cyclesStates, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
    }, (initialState) => {
        const storedStateAsJson = localStorage.getItem("@timer:cycles-states-1.0.0");

        if(storedStateAsJson) {
            return JSON.parse(storedStateAsJson)
        }

        return initialState;
    });

    const { cycles, activeCycleId } = cyclesStates;
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
        if(activeCycle) {
            return differenceInSeconds(new Date, new Date(activeCycle.startDate));
        }
        
        return 0;
    } );

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesStates);

        localStorage.setItem("@timer:cycles-states-1.0.0", stateJSON)
    }, [cyclesStates])

    

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinishid() {
        dispatch(markCurrentCycleFinishedAction())
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        dispatch(addNewCycleAction(newCycle));
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinishid,
                setSecondsPassed,
                activeCycle,
                createNewCycle,
                interruptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}