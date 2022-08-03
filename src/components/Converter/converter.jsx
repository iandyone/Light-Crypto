import { Button } from "../Button/button";
import { Title } from "../Title/title";
import "./converter.css";

export function Converter() {
    return (
        <section className="light-crypto__converter converter">
            <div className="converter__container container">
                <div className="converter__header">
                    <Title className ={"converter__title"} content={"💎 Cryptocurrency Converter"}/>
                    <Button className={"converner__button"} content={"refresh"} />
                </div>
                <form className="converter__body">
                    <p>инпут</p>
                    <p>инпут</p>
                </form>
            </div>
        </section>
    );
}