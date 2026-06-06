import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IconBrain } from "@tabler/icons-react";
import { Card } from "../components/card";
import { BACKEND_URL } from "../config/config";

type CardType = "youtube" | "twitter";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: CardType;
}

export default function SharedBrain() {
  const { shareId } = useParams();
  const [username, setUsername] = useState("");
  const [cards, setCards] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/brain/${shareId}`)
      .then((res) => {
        setUsername(res.data.username);
        setCards(res.data.content);
      })
      .catch(() => setError("This brain doesn't exist or the link is invalid."))
      .finally(() => setLoading(false));
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-[12px] text-neutral-400">Loading brain...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-[22rem] rounded-xl bg-white flex flex-col p-6"
          style={{
            boxShadow:
              "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 24px 68px rgba(47,48,55,0.05), 0 2px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#3b5bdb]">
              <IconBrain className="h-[17px] w-[17px] text-white" />
            </div>
            <span className="text-[15px] font-bold tracking-[-0.4px] text-neutral-800">
              Second <span className="text-[#3b5bdb]">Brain</span>
            </span>
          </div>
          <p className="text-[12px] text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Topbar */}
      <div className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#3b5bdb]">
            <IconBrain className="h-[17px] w-[17px] text-white" />
          </div>
          <span className="text-[15px] font-bold tracking-[-0.4px] text-neutral-800">
            Second <span className="text-[#3b5bdb]">Brain</span>
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-md"
          style={{
            boxShadow:
              "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div className="h-5 w-5 rounded-full bg-[#3b5bdb] flex items-center justify-center">
            <span className="text-[9px] font-bold text-white uppercase">
              {username?.[0]}
            </span>
          </div>
          <p className="text-[12px] font-semibold text-neutral-600">
            {username}'s brain
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="p-6 flex flex-wrap gap-4">
        {cards.map((card) => (
          <Card
            key={card._id}
            title={card.title}
            type={card.type}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}
