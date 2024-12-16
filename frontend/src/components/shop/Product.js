import React from "react";
import "../../css/main.css";
import AddToCart from "../includes/AddToCart";
const Product = (props) => {
  console.log("Productee", props);
  const { id, title, imageUrl, price, description } = props.product;
  console.log("Product", id, title, imageUrl, price, description);
  // console.log("Product", title, imageUrl, price, description);
  console.log("ProductID", id);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");

    // Add your code to handle form submission here
  };
  return (
    <div className={"Cart"}>
      <form className={"product-form"} onSubmit={handleSubmit}>
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
          <AddToCart id={id} />
          {console.log(props.product.id, "product")}
        </div>
      </form>
    </div>
  );
};

export default Product;
