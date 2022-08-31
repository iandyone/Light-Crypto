import "./switchButton.css";

export function SwitchButton(props) {
    return <a href="/" className={`${props.className} switch-button`}>{props.content}</a>;
}