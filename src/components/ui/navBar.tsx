
import { MenuIcon } from 'lucide-react'
import { Bell } from 'lucide-react';
import Image from "next/image";
import { Button } from './button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Sheet, SheetContent, SheetTrigger } from "./sheet"
import Sidebar from './sidebar'
import Navigation from './langNavBar/Navigation';

const NavBar = async () => {
  const session = await getServerSession(authOptions);
    // const { resolvedTheme } = useTheme();
    // const logoSrc = resolvedTheme !== 'dark' ? '/logo-breitfuss(1).png' : '/logo-breitfuss(1).png';
    const t = await getTranslations('Navbar');
   

    return (
      <div className="fixed w-full  bg-slate-100 dark:bg-slate-800 shadow-md dark:shadow-md z-20">
          <Sheet >
        <div className="flex justify-between">
          <div className="flex">
            <div className="mx-11">
              <Image
                className="p-2 mx-5"
                src={"/logo-breitfuss(1).png"}
                height={125}
                width={125}
                alt="Breitfuss Logo"
              />
            </div>
            <div>
              <Button
                className="flex items-center rounded p-2 transition-colors hover:bg-slate-200  dark:hover:bg-slate-700"
                
              >
                  <SheetTrigger asChild>
                  <MenuIcon className='h-5 w-5 ' />
          </SheetTrigger>
                
              </Button>
            </div>
          </div>

          <div className="flex text-sm space-x-6">
          {(session?.user?.roles.includes("SuperAdmin") ||
              session?.user?.roles.includes("UserAdmin")) && (
              <div className="cursor-pointer flex items-center justify-center rounded p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
                <Link href="/userAdmin">{t("title1")}</Link>
              </div>
            )}

            {(session?.user?.roles.includes("SuperAdmin") ||
              session?.user?.roles.includes("DataAdmin")) && (
              <div className="cursor-pointer flex items-center justify-center rounded p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
                <Link href="/dataAdmin">{t("title2")}</Link>
              </div>
            )}

            <div className="cursor-pointer flex items-center justify-center rounded p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
              {t("title3")}
            </div>
            <div
              className="cursor-pointer flex items-center justify-center rounded p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
            >
{t("title4")}
            </div>
           

          </div>
         
          <div className="flex 8">
            <div><Navigation/></div>
          
            <div
              className="cursor-pointer flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
             
            >
              <Bell className=' h-5 w-5 ' />
            </div>
            
          
          </div>
        </div>

        <div className=" ">
        
          <SheetContent className=' bg-slate-100 dark:bg-slate-800' side={"left"}>
  <Sidebar/>
    {/* <Counter/> */}
          </SheetContent>
       
      
    </div>
    </Sheet>
      </div>
    );
};

export default NavBar;