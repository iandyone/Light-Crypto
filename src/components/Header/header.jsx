import "./header.css";

export function Header() {
    return (
        <header className="header">
            <div className="header__container container">
                <div className="header__body">
                    <a href="/" className="header__logo"><span>LightCrypto</span></a>
                </div>
            </div>
        </header>
    );
}