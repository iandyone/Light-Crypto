/* eslint-disable jsx-a11y/anchor-has-content */
import { SwitchButton } from "../SwitchButton/switchButton";
import "./header.css";

export function Header() {
    return (
        <header className="header">
            <div className="header__container container">
                <div className="header__body">
                    <a href="/" className="header__logo"><span>LightCrypto</span></a>
                    <SwitchButton className={"header__button"}/>
                </div>
            </div>
        </header>
    );
}