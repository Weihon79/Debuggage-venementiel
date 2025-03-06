import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  
  const { data } = useData();

  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
 // ancien code => new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
 // Correction pour afficher du plus ancien au plus récent
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  /** ancien code => 
   * const nextCard = () => {
   * setTimeout(
   * () => setIndex(index < byDateDesc.length ? index + 1 : 0),
   * 5000
   * );
   * };
  */    

  // Correction pour que le slider affiche la première image une fois arrivé à la dernière sans afficher de page blanche entre les 2
  const dataLength = data?.focus.length

  const nextCard = () => {
    setTimeout(
      // Ajout de -1 après "length"
      () => setIndex(index < dataLength - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
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
      // Ajout de la fermeture du premier ".map"
      ))} 
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
          // {byDateDesc.map((_, radioIdx)
            <input
              key={event.title}
              // key={`${event.id}`} correction event n'a pas d'id
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // checked={idx === radioIdx} correction idx => index 
              readOnly
              // console error : Warning: You provided a `checked` prop to a form field without an `onChange` handler. 
              // This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;