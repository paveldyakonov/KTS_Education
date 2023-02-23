import React, { useEffect, useState } from "react";

import Card from "@components/Card";
import { API_ENDPOINT } from "@config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./RelatedProducts.module.scss";

export type RelatedProductsProps = {
  categoryId: string;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId }) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `${API_ENDPOINT.CATEGORY_ALL_PRODUCTS}/${categoryId}/products`,
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
    if (categoryId) fetch();
  }, [categoryId]);

  const clickEventHandler = (event: React.MouseEvent) => {
    navigate(`/product/${event.currentTarget.id}`);
  };

  return (
    <div>
      <div className={styles.title}>Related Items</div>
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

export default RelatedProducts;
