import React from 'react';

const productform = () => {
    return (
       
            <div className={"Cart"}>
              <form className={"product-form"}>
                <div className={"product-item"}>
                  <h2 className={"product__title"}>{title}</h2>
                  <div className={"card__image"}>
                    <img src={imageUrl} alt={title} />
                  </div>
        
                  <p className={"product__price"}>{price}</p>
                  <p className={"product__description"}>{description}</p>
        
                  <button onClick={() => console.log("Details clicked")}>
                    Details
                  </button>
                  <button type="submit">Add to Cart</button>
                </div>
              </form>
            </div>
          );

};

export default productform;