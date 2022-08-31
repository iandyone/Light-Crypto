import "./button.css";

export function Button(props) {
    return <a href="/" className={`${props.className} button`} onClick={(e) => { props.onClick(e) }}><span>{props.content}</span></a>;
}