import { Input } from "./ui/input";

export function CgItem({ index, item, onChange }: { index: number, item: { select1: string, select2: string } , onChange: (index: number, field: "select1" | "select2", value: string) => void}) {
    return (
        <div key={index} className="w-full grid grid-cols-2 gap-4">
            <Input placeholder="GPA" value={item.select1} onChange={(e) => onChange(index, "select1", e.target.value)} />
            <Input placeholder="Credits" value={item.select2} onChange={(e) => onChange(index, "select2", e.target.value)} />
        </div>
    )
}

export default CgItem;