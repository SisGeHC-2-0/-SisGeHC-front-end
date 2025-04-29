import { Header } from "@/components/header";
import { LeftNavBar } from "@/components/leftnavbar";

export default function UsuarioLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)
{

    return <>
        <Header />
        <div className="flex pt-[20px] gap-[21px] max-w-[1350px] mx-auto px-2 w-full bg-transparent">
        <LeftNavBar />
        {children}
        </div>
    </>
}''

