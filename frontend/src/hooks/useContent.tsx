import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";
import axios from "axios";

export function useContent() {
  const [cards, setCards] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setCards(res.data.content));
  }, [refreshTrigger]);

  const refresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const deleteCard = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
        data: { contentId: id },
      });
      setCards((prev) => prev.filter((c: any) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete content", err);
    }
  };

  return { cards, deleteCard, refresh };
}
