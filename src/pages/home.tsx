import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import CgpaCard from "@/components/CgpaCard";
import SgpaCard from "@/components/SgpaCard";
import { LogOut, Plus, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { addCourse, addSemester, deleteCourse, deleteSemester, getCourses, getSemesters, updateCourse, updateSemester } from "@/services/sem";

type semInfo = {
    id: string,
    name: string,
    created_at: string,
    user_id: string
}

type courseInfo = {
    id: string,
    name: string,
    created_at: string,
    user_id: string,
    sem: string,
    credits: string,
    grade: string,
}

const gradeToAc: Record<string, number> = {
    " ": -1,
    "S": 10,
    "A": 9,
    "B": 8,
    "C": 7,
    "D": 6,
    "E": 5,
    "F": 0,
    "N": 0,
} 

function Home() {
    const [name, setName] = useState<string | null>(null);
    const [newSem, setNewSem] = useState<semInfo>({id: "", name:"", created_at:"", user_id:""})
    const [newCourse, setNewCourse] = useState<courseInfo>({id: "", name: "", created_at: "", user_id: "", sem: "", credits: "", grade: ""})
    const [semItems, setSemItems] = useState<semInfo[]>([]);
    const [courseItems, setCourseItems] = useState<courseInfo[]>([]);

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

    useEffect(() => {
        const fetchData = async () => {
            setCourseItems((await getCourses()) ?? []);
        }
        fetchData();
    }, [courseItems]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleNewSem = async () => {
        await addSemester(newSem);
    };

    const handleNewCourse = async () => {
        await addCourse(newCourse);
    };

    const handleUpdateSemester = async () => {
        await updateSemester(newSem);
    }

    const handleUpdateCourse = async () => {
        await updateCourse(newCourse);
    }

    const handleDeleteSemester = async () => {
        await deleteSemester(newSem);
    }

    const handleDeleteCourse = async () => {
        await deleteCourse(newCourse);
    }
    

    return (
        <div className="w-screen h-[98vh] py-6 max-w-[1200px] mx-auto overflow-scroll">
            <div className="flex justify-between mx-6">
                <p className="text-xl font-bold">hello {name?.toLowerCase()} 👋</p>
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut />
                </Button>
            </div>

            <CgpaCard
                cg={ String(( courseItems.filter(c => c.credits!="" && c.credits!=" " && c.grade!="" && c.grade!=" ").reduce((sum, course) => sum+(Number(course.credits)*gradeToAc[course.grade]), 0) / Math.max(courseItems.filter(c => c.credits!="" && c.grade!="").reduce((sum, course) => sum+Number(course.credits), 0), 1) ).toFixed(2)) }
                creds={String(courseItems.filter(c => c.credits!="" && c.credits!=" " && c.grade!="" && c.grade!=" ").reduce((sum, course) => sum+Number(course.credits), 0))} 
            />

            <Tabs defaultValue="0" >
                <TabsList className="overflow-scroll bg-background p-0 rounded-none w-full h-1/6 my-6 mb-5 grid grid-cols-[4fr_1fr]">
                    <div className="flex overflow-scroll">

                        {
                            semItems.sort((a, b) => a.created_at.localeCompare(b.created_at)).reverse().map((s, index) => (
                                <TabsTrigger
                                    className="w-full min-w-[120px] rounded-none p-4 pt-2 border-0 border-b-[2px] !bg-background data-[state=active]:!border-neutral-400"
                                    value={index.toLocaleString()} id={s.id} key={s.id}>
                                    {s.name}
                                </TabsTrigger>        
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
                                    <Input value={newSem.name} onChange={(e) => setNewSem(prev => ({...prev, name: e.target.value}))} type="text" placeholder="fall 2025"/>
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

                {
                    semItems.sort((a, b) => a.created_at.localeCompare(b.created_at)).reverse().map((s, index) => (
                        <TabsContent className="mx-6 flex flex-col justify-center gap-4" key={s.id} value={index.toLocaleString()}>
                            
                            <Dialog>
                                <form className="w-full grid place-items-end">
                                    <DialogTrigger asChild>
                                        <div className="w-full" onClick={() => setNewSem(prev => ({...prev, id: s.id, name: s.name}))}>
                                            <SgpaCard 
                                            name={s.name} 
                                            cg={ String( (0+courseItems.filter(c => c.sem==s.id).filter(c => c.credits!="" && c.credits!=" " && c.grade!="" && c.grade!=" ").reduce((sum, course) => sum+(Number(course.credits)*gradeToAc[course.grade]), 0) / Math.max(courseItems.filter(c => c.sem==s.id).filter(c => c.credits!="" && c.grade!="").reduce((sum, course) => sum+Number(course.credits), 0), 1)).toFixed(2) ) }
                                            creds={String(courseItems.filter(c => c.sem==s.id).filter(c => c.credits!="" && c.credits!=" " && c.grade!="" && c.grade!=" ").reduce((sum, course) => sum+Number(course.credits), 0))}
                                            />
                                        </div>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-left">update semester</DialogTitle>
                                            <DialogDescription className="text-left">this action updates the semester </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <Label className="pb-2">name</Label>
                                                <Input 
                                                    value={newSem.name} 
                                                    onChange={(e) => setNewSem(prev => ({...prev, name: e.target.value}))}
                                                    type="text" placeholder="calculus"
                                                    className="text-sm"
                                                />
                                            </div>
                                        
                                        </div>
                                        <DialogFooter className="flex flex-row !justify-between">
                                            <DialogClose asChild className="">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline"><Trash /></Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>delete {s.name}?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            this action cannot be undone
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleDeleteSemester}>delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </DialogClose>
                                            <div className="flex flex-row justify-end w-1/2 gap-3">
                                                <DialogClose asChild className="w-1/2">
                                                    <Button variant="outline">cancel</Button>
                                                </DialogClose>
                                                <DialogClose asChild className="w-1/2">
                                                    <Button onClick={handleUpdateSemester}>update</Button>
                                                </DialogClose>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </form>
                            </Dialog>  

                            
                            <div className="course-list flex flex-col gap-4">
                                
                                <p className="text-sm mt-2 font-medium">Courses</p>
                                
                                {
                                    courseItems.filter(c => c.sem==s.id).sort((a, b) => a.created_at.localeCompare(b.created_at)).map((c) => (
                                        <Dialog>
                                            <form className="w-full grid place-items-end">
                                                <DialogTrigger asChild>
                                                    <Card className="p-3 grid grid-cols-[70px_1fr_70px] gap-5 w-full cursor-pointer" key={c.id} onClick={() => setNewCourse(prev => ({...prev, id: c.id, name: c.name, credits: c.credits, grade: c.grade}))}>
                                                        <div className="cl-item-credits grid place-items-center pb-1">
                                                            <p className="text-2xl font-medium">{(c.credits!=" ")&&(c.credits!="") ? c.credits : "-"}</p>
                                                            <p className="text-xs">credits</p>
                                                        </div>
                                                        <div className="cl-item-name text-sm flex items-center">
                                                            <p className="text-center w-full">
                                                            {c.name}
                                                            </p>
                                                        </div>
                                                        <div className="cli-item-grade grid place-items-center">
                                                            <p className="text-2xl font-medium">{(c.grade!=" ")&&(c.grade!="") ? c.grade : "-"}</p>
                                                            <p className="text-xs">grade</p>
                                                        </div>
                                                    </Card> 
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className="text-left">update course</DialogTitle>
                                                        <DialogDescription className="text-left">this action updates the course </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex flex-col gap-3">
                                                        <div>
                                                            <Label className="pb-2">name</Label>
                                                            <Input 
                                                                value={newCourse.name} 
                                                                onChange={(e) => setNewCourse(prev => ({...prev, name: e.target.value}))}
                                                                type="text" placeholder="calculus"
                                                                className="text-sm"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <Label className="pb-2">grade</Label>
                                                                <Select
                                                                    value={newCourse.grade}
                                                                    onValueChange={(val) => setNewCourse(prev => ({...prev, grade: val}))}
                                                                >
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="grade" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem value=" ">Grade</SelectItem>
                                                                            <SelectItem value="S">S</SelectItem>
                                                                            <SelectItem value="A">A</SelectItem>
                                                                            <SelectItem value="B">B</SelectItem>
                                                                            <SelectItem value="C">C</SelectItem>
                                                                            <SelectItem value="D">D</SelectItem>
                                                                            <SelectItem value="E">E</SelectItem>
                                                                            <SelectItem value="F">F</SelectItem>
                                                                            <SelectItem value="N">N</SelectItem>
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div>
                                                                <Label className="pb-2">credits</Label>
                                                                <Select
                                                                    value={newCourse.credits}
                                                                    onValueChange={(val) => setNewCourse(prev => ({...prev, credits: val}))}
                                                                >
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="credits" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem value=" ">Credits</SelectItem>
                                                                            <SelectItem value="1">1</SelectItem>
                                                                            <SelectItem value="1.5">1.5</SelectItem>
                                                                            <SelectItem value="2">2</SelectItem>
                                                                            <SelectItem value="3">3</SelectItem>
                                                                            <SelectItem value="4">4</SelectItem>
                                                                            <SelectItem value="5">5</SelectItem>
                                                                            <SelectItem value="20">20</SelectItem>
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <DialogFooter className="flex flex-row !justify-between">
                                                        <DialogClose asChild className="">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="outline"><Trash /></Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                    <AlertDialogTitle>delete {c.name} from {s.name}?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        this action cannot be undone
                                                                    </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                    <AlertDialogCancel>cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={handleDeleteCourse}>delete</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DialogClose>
                                                        <div className="flex flex-row justify-end w-1/2 gap-3">
                                                            <DialogClose asChild className="w-1/2">
                                                                <Button variant="outline">cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild className="w-1/2">
                                                                <Button onClick={handleUpdateCourse}>update</Button>
                                                            </DialogClose>
                                                        </div>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </form>
                                        </Dialog>                                 
                                    ))
                                }

                            </div>
                            
                            {/* add course button implementation */}
                            <Dialog>
                                <form className="w-full grid place-items-end">
                                    <DialogTrigger asChild>
                                        <Button className="cursor-pointer bg-background mx-auto" variant="outline" 
                                        onClick={() => setNewCourse(prev => ({...prev, sem: s.id}))}>
                                            <Plus />
                                            add course
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-left">new course</DialogTitle>
                                            <DialogDescription className="text-left">this action adds a new course to your tracker</DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <Label className="pb-2">name</Label>
                                                <Input 
                                                    value={newCourse.name} 
                                                    onChange={(e) => setNewCourse(prev => ({...prev, name: e.target.value}))}
                                                    type="text" placeholder="calculus"
                                                    className="text-sm"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <Label className="pb-2">grade</Label>
                                                    <Select
                                                        value={newCourse.grade}
                                                        onValueChange={(val) => setNewCourse(prev => ({...prev, grade: val}))}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="grade" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value=" ">Grade</SelectItem>
                                                                <SelectItem value="S">S</SelectItem>
                                                                <SelectItem value="A">A</SelectItem>
                                                                <SelectItem value="B">B</SelectItem>
                                                                <SelectItem value="C">C</SelectItem>
                                                                <SelectItem value="D">D</SelectItem>
                                                                <SelectItem value="E">E</SelectItem>
                                                                <SelectItem value="F">F</SelectItem>
                                                                <SelectItem value="N">N</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label className="pb-2">credits</Label>
                                                    <Select
                                                        value={newCourse.credits}
                                                        onValueChange={(val) => setNewCourse(prev => ({...prev, credits: val}))}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="credits" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value=" ">Credits</SelectItem>
                                                                <SelectItem value="1">1</SelectItem>
                                                                <SelectItem value="1.5">1.5</SelectItem>
                                                                <SelectItem value="2">2</SelectItem>
                                                                <SelectItem value="3">3</SelectItem>
                                                                <SelectItem value="4">4</SelectItem>
                                                                <SelectItem value="5">5</SelectItem>
                                                                <SelectItem value="20">20</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        
                                        </div>
                                        <DialogFooter className="flex flex-row justify-end">
                                            <DialogClose asChild className="w-1/4">
                                                <Button variant="outline">cancel</Button>
                                            </DialogClose>
                                            <DialogClose asChild className="w-1/4">
                                                <Button onClick={handleNewCourse}>add</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </form>
                            </Dialog>

                            
                        </TabsContent>     
                    ))
                }



            </Tabs>

        </div>
    )
}

export default Home;