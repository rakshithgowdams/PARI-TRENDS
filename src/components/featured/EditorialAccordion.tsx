"use client";

import { useState } from "react";
import EditorialPanel from "./EditorialPanel";
import { FEATURED_EDITS } from "@/data/featured-edits";

interface EditorialAccordionProps {
  defaultActiveId?: string;
}

/**
 * EditorialAccordion — Desktop Horizontal Interactive Fashion Lookbook
 *
 * Characteristics:
 *  • Six adjacent vertical fashion panels
 *  • One prominently expanded active panel (defaults to "03 — Celebration Edit")
 *  • Inactive panels: narrow, desaturated grayscale, rotated spine typography
 *  • Active panel: ~52% width, full colour, revealed editorial title, caption and CTA
 *  • Smooth 700ms width and filter transitions
 *  • Preserves the selected panel when pointer leaves accordion
 *  • Keyboard accessible with Tab, Enter and Space keys
 */
export default function EditorialAccordion({
  defaultActiveId = "celebration-edit",
}: EditorialAccordionProps) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId);

  return (
    <div
      role="tablist"
      aria-label="Pari Trends Featured Fashion Edits"
      className="hidden lg:flex w-full h-[540px] xl:h-[600px] gap-2.5 xl:gap-3 p-1 rounded-[6px] overflow-hidden"
    >
      {FEATURED_EDITS.map((edit, index) => (
        <EditorialPanel
          key={edit.id}
          edit={edit}
          index={index}
          isActive={activeId === edit.id}
          onActivate={() => setActiveId(edit.id)}
        />
      ))}
    </div>
  );
}
