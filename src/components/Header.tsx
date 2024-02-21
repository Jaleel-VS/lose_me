"use client";
import { HOME_ROUTE, LOGIN_ROUTE, BALLOT_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { auth } from "@/util/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Button } from "./ui/button";
import { isLoggedIn } from "@/app/_auth/auth-handler";
import { useEffect, useState } from "react";

const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log("Checking if logged in")
        setLoggedIn(isLoggedIn());
    }, []);

    const router = useRouter();
    const logOut = () => {
        signOut(auth).then((response) => {
            router.push(LOGIN_ROUTE);
        }).catch((e) => {
            console.log("Logout Catch ", e.message)
        })
    }

    return (
        <header className="h-20 flex px-10 drop-shadow-[0px_2px_10px_rgba(2,0,0) text-black shadow-lg rounded-lg border-slate-500">
            <nav className="w-full mx-auto flex justify-between items-center px-2 text-black text-xl">
                <Link href={HOME_ROUTE}>
                    <Image src="/IEC.png" alt="logo" width={50} height={50} />
                </Link>
                <ul className="flex gap-4">
                    {!loggedIn &&
                        <>
                            <Link href={LOGIN_ROUTE}><li>
                                <Button>
                                    Login
                                </Button>
                            </li></Link>
                            <Link href={REGISTER_ROUTE}><li>
                                <Button>
                                    Register
                                </Button>
                            </li></Link>
                        </>
                    }
                    {loggedIn &&
                        <>
                            <li className=" cursor-pointer" onClick={
                                () => {
                                    logOut();
                                }
                            }>
                                <Button>
                                    Logout
                                </Button>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;