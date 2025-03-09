import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { compareDesc } from "date-fns";


export function NewCycleForm() {

    const { activeCycle, cycles } = useContext(CyclesContext);
    const {register} = useFormContext();
    const MAX_OPTIONS = 5;

    // Criando uma copia e então ordenando pela ordem de criação mais recente.
    const sortedCycles = ([...cycles]).sort((firstCycle , secondCycle) => compareDesc(firstCycle .startDate, secondCycle.startDate)).slice(0, MAX_OPTIONS);

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                list="task-suggestions"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle}
                {...register("task")}
            />

            <datalist id="task-suggestions">
                {sortedCycles.map(cycle => <option value={cycle.task} />)}
            </datalist>

            <label htmlFor="minutesAmount" >Durante</label>
            <MinutesAmountInput
                id="minutesAmount"
                type="number"
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}