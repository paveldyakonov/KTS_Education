import React, { useEffect, useState } from "react";

import Card from "@components/Card";
import { API_ENDPOINT } from "@config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: API_ENDPOINT.PRODUCTS,
      });

      setCards(
        result.data.map((row: any) => ({
          id: row.id,
          title: row.title,
          price: row.price,
          description: row.description,
          image: row.images[0],
          category: row.category.name,
        }))
      );
    };
    fetch();
  }, []);

  const clickEventHandler = (event: React.MouseEvent) => {
    navigate(`/product/${event.currentTarget.id}`);
  };

  return (
    <div>
      <div className={styles.label_and_products_length}>
        <div className={styles.label}>Total Product</div>
        <div className={styles.products_length}>{cards.length}</div>
      </div>
      <div className={styles.products_list}>
        {cards.map((card: any) => (
          <Card
            key={card.id}
            image={card.image}
            category={card.category}
            title={card.title}
            subtitle={card.description}
            content={card.price}
            onClick={clickEventHandler}
            id={card.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
