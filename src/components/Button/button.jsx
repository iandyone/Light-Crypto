import "./button.css";

export function Button(payload) {
    const className = `${payload.className} button`;

    return <a href="/" className={className}><span>{payload.content}</span></a>;
}