import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";
import axios from "axios";

export function useContent() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setCards(res.data.content));
  }, []);

  return { cards, setCards };
}
