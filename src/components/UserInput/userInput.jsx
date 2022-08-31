import { Input } from "../Input/input";
import { Select } from "../Select/select";
import "./userInput.css";

export function UserInput(props) {
    return (
        <div className={`${props.className} user-input`}>
            <Select className={props.selectClassName} id={props.id} />
            <Input className={props.inputClassName} id={props.id} placeholder={props.placeholder} />
        </div>
    );
}