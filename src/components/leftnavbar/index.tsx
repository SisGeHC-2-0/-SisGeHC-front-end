import {
  IconCalendarCheck,
  IconCalendarUp,
  IconCalendarWeek,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";

export const LeftNavBar = () => {
  return (
    <>
      <section className="bg-[#00A285] rounded-[7px] flex flex-col pt-[40px] items-center gap-[40px] w-[100px] h-[409px]">
        <Link href={"/eventos"}>
          <IconCalendarWeek stroke={2} size={42} color="#fff" />
        </Link>
        <Link href={""}>
          <IconCalendarCheck stroke={2} size={42} color="#fff" />
        </Link>
        <Link href={""}>
          <IconCalendarUp stroke={2} size={42} color="#fff" />
        </Link>
        <Link href={"/perfil"}>
          <IconUserCircle stroke={2} size={42} color="#fff" />
        </Link>
      </section>
    </>
  );
};
