import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Sidebar } from "../components/sidebar";
import ContentModal from "../components/content-model";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { useContent } from "../hooks/useContent";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cards, deleteCard, refresh } = useContent();

  const handleAddCard = async (data: {
    title: string;
    link: string;
    type: "youtube" | "twitter";
  }) => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/content`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      refresh();
    } catch (err) {
      console.error("Failed to save content", err);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, slides in when open */}
      <div
        className={`fixed z-30 h-full transition-transform duration-200 md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          onAddContent={() => {
            setModalOpen(true);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100">
          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden items-center justify-center h-8 w-8 rounded-lg text-neutral-500 hover:bg-neutral-100"
            onClick={() => setSidebarOpen(true)}
          >
            <IconMenu2 className="h-5 w-5" />
          </button>

          <h1 className="text-[14px] font-bold text-neutral-800">
            All Content
          </h1>

          <div className="flex items-center gap-3">
            <Button onClick={() => setModalOpen(true)} text="Add Content" />
            <Button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  {
                    share: true,
                  },
                  {
                    headers: { Authorization: localStorage.getItem("token") },
                  },
                );
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
              }}
              text="Share Brain"
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="p-6 flex flex-wrap gap-4">
          {cards.map((card, i) => (
            <Card
              key={i}
              _id={card._id}
              title={card.title}
              type={card.type}
              link={card.link}
              onDelete={deleteCard}
            />
          ))}
        </div>
      </div>

      <ContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddCard}
      />
    </div>
  );
}

export default Dashboard;
