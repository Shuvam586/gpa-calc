import { supabase } from "@/lib/supabaseClient";
import type { Provider } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";

function Login() {
    const loginWithProvider = async (provider: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: { redirectTo: window.location.origin } 
        });

        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    };

    return (
        <div className="w-full h-[90vh] flex justify-start flex-col mx-auto p-6 max-w-[600px]">
            <p className="text-3xl font-bold h-1/5 grid place-items-center">login 🍜</p>
            <div className="auth-buttons flex flex-col gap-6">
                <Card className="cursor-pointer">
                    <button onClick={() => loginWithProvider("google")}>
                        <p className="cursor-pointer text-l font-bold w-full">
                            google 🍤
                        </p>
                    </button>
                </Card>
                <Card className="cursor-pointer">
                    <button onClick={() => loginWithProvider("github")}>
                        <p className="cursor-pointer text-l font-bold w-full">
                            github 🍢
                        </p>
                    </button>
                </Card>
                <Card className="cursor-pointer grid place-items-center">
                    <Link to="/guest">
                        <p className="cursor-pointer text-l font-bold w-full">
                            guest 🍦
                        </p>
                    </Link>
                </Card>
            </div>
        </div>
    );
}

export default Login;