import { useContext } from "react";
import { HistoryContainer, HistoryList, Status, StatusTasks } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import {formatDistanceToNow}  from "date-fns"
import {ptBR} from "date-fns/locale"



export function History() {

    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate && (<Status statusColor={StatusTasks.GREEN} >Concluído</Status>)}

                                        {cycle.interruptedDate && (<Status statusColor={StatusTasks.RED} >Interrompido</Status>)}

                                        {!cycle.interruptedDate && !cycle.finishedDate && (<Status statusColor={StatusTasks.YELLOW} >Em andamento</Status>)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}