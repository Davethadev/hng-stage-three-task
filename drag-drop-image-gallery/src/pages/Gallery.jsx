import React, { useState } from "react";
import { auth } from "../auth/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "../utils/SortableItem";
import spinner from "../assets/spinner1.svg";

function Gallery() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState([
    "https://images.unsplash.com/photo-1695026069898-bcb96e060d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694198250632-b2fbc6746e17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    "https://plus.unsplash.com/premium_photo-1672762542894-caaa8d4f0a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694572620159-e69049aeba00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694907290706-3a2eb63b20b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694585536001-e9fc0c29570c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694739460867-89de7f89cfc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694719977532-293c34eed810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694804097987-92d439c1f10a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694721804143-7c611fde4b22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694903663907-7b28edb9a9a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1694885677512-40a76bc76ff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSignOut = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <section className="w-[92.5%] md:w-[75%] mx-auto">
          <div className="w-full flex justify-end">
            <button
              onClick={handleSignOut}
              disabled={submitting}
              className="font-dmsans uppercase text-white bg-blue rounded h-[45px] w-[300px] font-[500] mt-4 flex justify-center items-center"
            >
              {submitting ? <img src={spinner} alt="" /> : "sign out"}
            </button>
          </div>
          <div className="md:grid md:grid-cols-3 lg:grid-cols-4 my-4 w-full gap-[20px]">
            {items.map((item, index) => (
              <SortableItem key={index} id={item} />
            ))}
          </div>
        </section>
      </SortableContext>
      {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
    </DndContext>
  );

  function handleDragStart(event) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
}

export default Gallery;
