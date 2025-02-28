import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

/**  || [] garantit focus comme un tableau meme si data est undefined
 * [...] crée une copie du tableau data?.focus (ou un tableau vide si data?.focus est undefined).
 */

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) => /**  "?" =optimal chaining. Si data est undefined ou null, l'expression entière renvoie undefined sans générer d'erreur. */
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );  

  /** plus besoin de la fonction nextCard(), car useEffect gère directement l'incrémentation de index avec setInterval */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [byDateDesc.length]);
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || idx}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} /** ici on remplace idx par index car index car idx est l'index du premier map slidecardlist */
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
