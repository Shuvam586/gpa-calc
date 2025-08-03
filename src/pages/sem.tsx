import SemItem from "@/components/SemItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"

import { useState } from "react";

function Sem() {
    const numItems = 10

    const [sgpa, setSgpa] = useState('0.0')

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
        // console.log("crazzyyyyy");
        // console.log(selections);
        const credToAc: Record<string, number> = {
            "1cred": 1,
            "1_5cred": 1.5,
            "2cred": 2,
            "3cred": 3,
            "4cred": 4,
            "5cred": 5,
            "20cred": 20,
        }
        const gradeToAc: Record<string, number> = {
            "sgrade": 10,
            "agrade": 9,
            "bgrade": 8,
            "cgrade": 7,
            "dgrade": 6,
            "egrade": 5,
            "fgrade": 0,
            "ngrade": 0,
        } 
        var weightedCreds = 0;
        var normalCreds = 0;

        for(const [key, value] of Object.entries(selections)) {
            console.log(key);
            if (value.select1 && value.select2) {
                weightedCreds += gradeToAc[value.select1] * credToAc[value.select2];
                normalCreds += credToAc[value.select2];
            };
        }

        var sgpacomputed = (weightedCreds/normalCreds).toFixed(2); 
        setSgpa(sgpacomputed);

    }

    return (
        <form onSubmit={handleSubmit} className="w-screen h-screen p-6 flex flex-col gap-4">
            <div className="h-full grid place-items-center">
                <p className="text-3xl font-bold">semester gpa 🍕🍕</p>
            </div>

            <div className="flex flex-col gap-4">

                {selections.map((item, index) => (
                    <SemItem index={index} item={item} onChange={handleChange} />
                ))}

            </div>

            <Button type="submit" className="w-full">Look Up</Button>

            <Card className="h-full grid place-items-center">
                <CardContent className="grid place-items-center">
                    <p className="text-7xl font-semibold">{sgpa}</p>
                </CardContent>
            </Card>

        </form>
    )
}

export default Sem;