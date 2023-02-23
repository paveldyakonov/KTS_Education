import React, { useEffect, useState } from "react";

import Button from "@components/Button";
import { API_ENDPOINT } from "@config/api";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./InfoProductCard.module.scss";
import RelatedProducts from "../RelatedProducts";

const InfoProductCard = () => {
  const [card, setCard]: any = useState({});
  let { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `${API_ENDPOINT.PRODUCTS}/${id}`,
      });

      setCard({
        image1: result.data.images[0],
        image2: result.data.images[1],
        image3: result.data.images[2],
        id: result.data.id,
        title: result.data.title,
        price: result.data.price,
        description: result.data.description,
        category: result.data.category.name,
        categoryId: result.data.category.id,
      });
    };
    fetch();

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <div id={card.id} className={styles.card}>
        <img src={card.image1} alt={card.title} />
        <div className={styles.info_about_card}>
          <div className={styles.title}>{card.title}</div>
          <div className={styles.subtitle}>{card.description}</div>
          <div className={styles.price}>${card.price}</div>
          <div className={styles.buttons}>
            <Button size="big">Buy Now</Button>
            <Button size="big" color="white">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <RelatedProducts categoryId={card.categoryId} />
    </div>
  );
};

export default InfoProductCard;
