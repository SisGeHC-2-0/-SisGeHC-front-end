import { CorePanel } from "@/components/corePanel";
import Logo from "@/components/logo";
import LoginForm from "./form";

export default function Login()
{

    return (
        <div className="w-full h-screen flex justify-center overflow-scroll">

            <CorePanel className="w-[60%] my-[15vh] pb-[3vh]">

                <div className="w-[100%] flex flex-col justify-center items-center my-[2vh] gap-[1vh]">
                    <Logo/>
                    <h2 className="font-bold text-xl">Login</h2>
                </div>
                <div className="w-full flex justify-center">
                    <LoginForm/>
                </div>
            </CorePanel>
        </div>
    );
}