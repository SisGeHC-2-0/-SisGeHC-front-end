import Image from "next/image";
import ImageHeader from "@/imgs/perfil2.jpg";
import eventosImage from "@/imgs/eventosImage.png";

export const Header = () => {
  return (
    <>
      <section className=" max-w-[1350px] py-2 px-2 mx-auto w-full flex items-center justify-between ">
        <div className="flex gap-5 items-center">
          <figure>
            <Image alt="" src={ImageHeader} width={90} height={98} />
          </figure>
          <div className="text-start">
            <h2 className="text-black ">Natália Ruth Mesquita da Silva</h2>
            <p className="text-black font-bold ">1234578</p>
          </div>
        </div>
        <figure>
          <Image alt="" src={eventosImage} width={90} height={70} />
        </figure>
      </section>
    </>
  );
};
