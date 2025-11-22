import CgItem from "@/components/CgItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"

import { useState } from "react";

function GuestCg() {
    const numItems = 8

    const [cgpa, setCgpa] = useState('0.0')

    const [selections, setSelections] = useState(
        Array.from({ length: numItems }, () => ({ select1: "", select2: "" }))
    )

    const handleChange = (index: number, field: "select1" | "select2", value: string) => {
        const updated = [...selections]
        updated[index][field] = value
        setSelections(updated)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        var weightedCreds = 0;
        var normalCreds = 0;

        for(const [key, value] of Object.entries(selections)) {
            console.log(key);
            if (value.select1 && value.select2) {
                weightedCreds += Number(value.select1) * Number(value.select2);
                normalCreds += Number(value.select2);
            };
        }

        var cgpacomputed = (weightedCreds/normalCreds).toFixed(2); 
        setCgpa(cgpacomputed);

    }

    return (
        <form onSubmit={handleSubmit} className="w-screen h-[90vh] max-w-[600px] mx-auto p-6 flex flex-col gap-4">
            <div className="h-full grid place-items-center">
                <p className="text-3xl font-bold">cgpa 🍿🍿</p>
            </div>

            <div className="flex flex-col gap-4">

                {selections.map((item, index) => (
                    <CgItem index={index} item={item} onChange={handleChange} />
                ))}

            </div>

            <Button type="submit" className="w-full">Look Up</Button>

            <Card className="h-full grid place-items-center">
                <CardContent className="grid place-items-center">
                    <p className="text-7xl font-semibold">{cgpa}</p>
                </CardContent>
            </Card>

        </form>
    )
}

export default GuestCg;