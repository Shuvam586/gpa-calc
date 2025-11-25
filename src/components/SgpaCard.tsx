import { Card } from "./ui/card";

type cgCardType = {
    name: string,
    cg: string,
    creds: string
}

function SgpaCard({name, cg, creds } : cgCardType) {
    return (
        <Card className="p-3 grid grid-cols-[70px_1fr_70px] gap-5 w-full cursor-pointer">
            <div className="cl-item-credits grid place-items-center pb-1">
                <p className="text-2xl font-medium">{creds}</p>
                <p className="text-xs">credits</p>
            </div>
            <div className="cl-item-name text-sm flex items-center">
                <p className="text-center w-full">
                {name}
                </p>
            </div>
            <div className="cli-item-grade grid place-items-center">
                <p className="text-2xl font-medium">{cg}</p>
                <p className="text-xs">sgpa</p>
            </div>
        </Card>
    )
} 

export default SgpaCard;