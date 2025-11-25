import { Card } from "./ui/card";

type cgCardType = {
    cg: string,
    creds: string
}

function CgpaCard({cg, creds} : cgCardType) {
    return (
        <Card className="m-6 mb-0 p-6 px-12 grid grid-cols-2">
            <div className="flex justify-center flex-col items-center">
                <p className="text-5xl font-semibold">{cg}</p>
                <p className="pt-2">cgpa</p>
            </div>
            <div className="flex justify-center flex-col items-center">
                <p className="text-5xl font-semibold">{creds}</p>
                <p className="pt-2">credits</p>
            </div>
        </Card>
    )
} 

export default CgpaCard;