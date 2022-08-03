import "./switchButton.css";

export function SwitchButton(props) {
    const className = `${props.className} switch-button`;
    const content = props.content || "";

    return (
        <a href="/" className={className}>{content}</a>
    );
}
