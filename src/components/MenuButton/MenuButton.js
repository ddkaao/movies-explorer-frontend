import './MenuButton.css'; 

export default function MenuButton({ onClick }) {
    return (
       <section className="menuButton">
            <button type="button" className="menuButton__btn" onClick={onClick}></button>
       </section>
    )
}