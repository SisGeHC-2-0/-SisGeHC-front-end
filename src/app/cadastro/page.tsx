import { CorePanel } from "@/components/corePanel";
import { SelectMenuPage } from "@/components/selectMenuPage";
import {AlunoForms} from "./forms/aluno";
import CoordenadorForms from "./forms/coordenador";
import ProfessorForms from "./forms/professor";


export default function Cadastro()
{
    return (
        <div className="w-full h-screen flex justify-center overflow-scroll">
            <CorePanel className="w-[60%] h-[120%] my-[15vh]">

            <SelectMenuPage pages={[
                {name : "Aluno", content: <AlunoForms/>},
                {name : "Professor", content: <ProfessorForms/>},
                {name : "Coordenador", content: <CoordenadorForms/>},
                
                ]}/>

            </CorePanel>
        </div>
    );
}