import './MenuButton.css'; 

export default function MenuButton({ onClick }) {
    return (
       <div className="menuButton">
            <button type="button" className="menuButton_btn" onClick={onClick}></button>
       </div>
    )
}