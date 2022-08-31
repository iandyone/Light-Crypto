import "./title.css";

export function Title(props) {
    return <h2 className={`${props.className} title`}><span>{props.content}</span></h2>
}