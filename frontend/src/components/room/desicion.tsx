import { TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

export default function Desicion() {
    return (
        <div className="col-span-3 col-start-2 row-start-4 w-full h-[80%] border border-white/20 bg-white/5 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center shadow-lg transition-all">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
                Make your decision
            </h2>
            <div className="flex gap-6 justify-center">
                <Button
                    variant="destructive"
                    className="w-full h-12 flex items-center gap-2 px-6 py-3 text-lg hover:scale-105 transition-transform"
                >
                    <TrendingDown className="w-5 h-5"/>
                    Sell
                </Button>
                <Button
                    variant="default"
                    className="bg-green-700 w-full h-12 flex items-center gap-2 px-6 py-3 text-lg hover:scale-105 transition-transform"
                >
                    <TrendingUp className="w-5 h-5"/>
                    Buy
                </Button>
            </div>
        </div>
    );
}
