import { CorePanel } from "@/components/corePanel";
import { SelectMenuPage } from "@/components/selectMenuPage";
import {AlunoForms} from "./forms/aluno";
import CoordenadorForms from "./forms/coordenador";
import ProfessorForms from "./forms/professor";
import Logo from "@/components/logo";


export default function Cadastro()
{
    return (
        <div className="w-full h-screen flex justify-center overflow-scroll">

            <CorePanel className="w-[60%] my-[15vh] pb-[3vh]">

                <div className="w-[100%] flex flex-col justify-center items-center my-[2vh] gap-[1vh]">

                <Logo/>
                <h2 className="font-bold text-xl">Cadastro de Usuário</h2>

                </div>

                <SelectMenuPage pages={[
                    {name : "Aluno", content: <AlunoForms/>},
                    {name : "Professor", content: <ProfessorForms/>},
                    {name : "Coordenador", content: <CoordenadorForms/>},
                    // {name : "BOSTA", content: <CoordenadorForms/>},
                    ]}/>
            </CorePanel>
        </div>
    );
}