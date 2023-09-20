import React, { useState } from "react";
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

import { SortableItem } from "../SortableItem";
import Item from "../Item";

function Gallery() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    "birmingham-museums-trust-wgZgKLeKQh4-unsplash.jpg",
    "erik-karits-Fx61zgqQbok-unsplash.jpg",
    "cezar-sampaio-A8jVi5zAOMU-unsplash.jpg",
    "neom-AGZgrNeq7Kg-unsplash.jpg",
    "karsten-winegeart-EqMRa0cgEiI-unsplash.jpg",
    "martin-katler-s96eIS1YzSs-unsplash.jpg",
    "kellen-riggin-68j_mWLDR10-unsplash.jpg",
    "karsten-winegeart-MGOpFseNHUU-unsplash.jpg",
    "marek-piwnicki-nwBIdpYt9UU-unsplash.jpg",
    "martin-katler-zLKODiBGN6k-unsplash.jpg",
    "s-tsuchiya--wjUTPYkV2w-unsplash.jpg",
    "sina-bahar-xf4XM2i7usI-unsplash.jpg",
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <section className="grid grid-cols-2 md:grid-cols-4 w-[92.5%] md:w-[75%] my-4 mx-auto gap-[20px]">
          {items.map((item, index) => (
            <SortableItem key={index} id={item} />
          ))}
        </section>
      </SortableContext>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
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
