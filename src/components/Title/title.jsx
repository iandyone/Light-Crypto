import "./title.css";

export function Title(props) {
    const className = `${props.className} title`

    return <h2 className={className}>{props.content}</h2>
}