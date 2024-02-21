import { SubmitButtonT } from "@/types/ButtonTypes"
import { Button } from "./ui/button";

const SubmitButton = ({label}:SubmitButtonT) => {
    return (
        <div className="flex justify-center mt-6 mb-3">
            <Button className="">{label}</Button>
        </div>
    )
}

export default SubmitButton;