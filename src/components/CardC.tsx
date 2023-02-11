import React, { FC } from "react"

export interface TodoItemProps {
  suma: String,
  obs: String,
  categorie: String,
  culoare: String
  
}

const CardC: React.FC<TodoItemProps> = ({ suma, obs, categorie, culoare }) => {
  
    return (
      <div className="cardl">
    <div className="col s12 6">
      <div className={culoare == "green"? "card green darken-3":"card red darken-3"}>
        <div className="card-content white-text">
          <span className="card-title" id='titlucard'>{categorie}</span>
          <p>Suma: {suma}</p>
          <p>Observatii: {obs}</p>
        </div>
      </div>
    </div>
  </div>
     )
}

export default CardC