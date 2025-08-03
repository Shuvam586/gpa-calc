import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

function Home () {
    return (
        <div className="w-screen h-screen p-6">
            <div className="h-1/5 grid place-items-center">
                <p className="text-3xl font-bold">cgpa calc?! 📈📈</p>
            </div>

            <div className="grid grid-rows-2 gap-6">
                <Link to="/sgpa">
                    <Card className="grid place-items-center">
                        <p className="text-l font-bold">
                            SGPA ✍️
                        </p>
                    </Card>   
                </Link>

                <Link to="/cgpa">
                    <Card className="grid place-items-center">
                        <p className="text-l font-bold">
                            CGPA 📜
                        </p>
                    </Card>   
                </Link>   
            </div>
        </div>
    )
}

export default Home;