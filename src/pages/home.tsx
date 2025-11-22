import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CgpaCard from "@/components/CgpaCard";
import { LogOut, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { addSemester, getSemesters } from "@/services/sem";

type semInfo = {
    id: string,
    name: string,
    created_at: string,
    user_id: string
}

function Home() {
    const [name, setName] = useState<string | null>(null);
    const [newSemName, setNewSemName] = useState<string>("");
    const [semItems, setSemItems] = useState<semInfo[]>([]);

    const navigate = useNavigate();

    useEffect(() => {

        const checkAuth = async () => {

            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                const user = session?.user;
                setName(
                    user.user_metadata.full_name ||
                    user.user_metadata.name ||
                    user.user_metadata.preferred_username ||
                    null
                );
            }

            if (!session) {
                navigate("/login");
            }
        }

        checkAuth();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setSemItems((await getSemesters()) ?? []);
        }
        fetchData();
    }, [semItems]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleNewSem = async () => {
        await addSemester(newSemName);
    };

    return (
        <div className="w-screen h-[90vh] py-6 max-w-[1200px] mx-auto overflow-hidden">
            <div className="flex justify-between mx-6">
                <p className="text-xl font-bold">hello {name} 😋😋</p>
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut />
                </Button>
            </div>

            <CgpaCard cg="9.30" creds="84" />

            <Tabs defaultValue="0" >
                <TabsList className="overflow-scroll bg-background p-0 rounded-none w-full h-1/6 my-6 grid grid-cols-[4fr_1fr]">
                    <div className="flex overflow-scroll">

                        {
                            semItems.map((s, index) => (
                                <TabsTrigger className="w-full min-w-[120px] rounded-none p-4 pt-2 border-0 border-b-[2px] !bg-background data-[state=active]:!border-neutral-400"
                                value={index.toLocaleString()} id={s.id} key={s.id}>{s.name}</TabsTrigger>        
                            ))
                        }

                    </div>
                    
                    <Dialog>
                        <form className="w-full grid place-items-end pr-6">
                            <DialogTrigger asChild>
                                <Button variant="outline" className="cursor-pointer grid place-items-center">
                                    <Plus />
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-left">new semester</DialogTitle>
                                    <DialogDescription className="text-left">this action adds a new semester to your tracker</DialogDescription>
                                </DialogHeader>
                                <div>
                                    <Label className="pb-2">name</Label>
                                    <Input value={newSemName} onChange={(e) => setNewSemName(e.target.value)} type="text" placeholder="fall 2025"/>
                                </div>
                                <DialogFooter className="flex flex-row justify-end">
                                    <DialogClose asChild className="w-1/4">
                                        <Button variant="outline">cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild className="w-1/4">
                                        <Button onClick={handleNewSem}>add</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </TabsList>

                <TabsContent className="mx-6" value="account">
                    account
                </TabsContent>

                <TabsContent className="mx-6" value="password">
                    password
                </TabsContent>


            </Tabs>

        </div>
    )
}

export default Home;