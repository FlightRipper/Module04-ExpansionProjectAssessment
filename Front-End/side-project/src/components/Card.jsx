import { React } from "react";
import "./card.css";
import { Link } from 'react-router-dom';

const Card = ({ image, title, description, category, memeId }) => {

 return (
   <div className="card mb-3" key={memeId}>
     <div className="card__img__container">
       <img className="card__img" src={image}></img>
     </div> 
     <div className="card__descr-wrapper">
       <p className="card__title">
         {title}
       </p>
        <Link to={`/product/${memeId}`}>
          <button className="btn btn-success">View Product</button>
        </Link>
     </div>
   </div>
 );
};

export default Card;
