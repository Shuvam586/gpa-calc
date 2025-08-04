import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SemItem({ index, item, onChange }: { index: number, item: { select1: string, select2: string } , onChange: (index: number, field: "select1" | "select2", value: string) => void}) {
    return (
        <div key={index} className="w-full grid grid-cols-2 gap-4">
            <Select
                value={item.select1}
                onValueChange={(val) => onChange(index, "select1", val)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value=" ">Grade</SelectItem>
                        <SelectItem value="sgrade">S</SelectItem>
                        <SelectItem value="agrade">A</SelectItem>
                        <SelectItem value="bgrade">B</SelectItem>
                        <SelectItem value="cgrade">C</SelectItem>
                        <SelectItem value="dgrade">D</SelectItem>
                        <SelectItem value="egrade">E</SelectItem>
                        <SelectItem value="fgrade">F</SelectItem>
                        <SelectItem value="ngrade">N</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                value={item.select2}
                onValueChange={(val) => onChange(index, "select2", val)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Credits" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value=" ">Credits</SelectItem>
                        <SelectItem value="1cred">1</SelectItem>
                        <SelectItem value="1_5cred">1.5</SelectItem>
                        <SelectItem value="2cred">2</SelectItem>
                        <SelectItem value="3cred">3</SelectItem>
                        <SelectItem value="4cred">4</SelectItem>
                        <SelectItem value="5cred">5</SelectItem>
                        <SelectItem value="20cred">20</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}



export default SemItem;