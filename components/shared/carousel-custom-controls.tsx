"use client";

import { useEffect, useState, useCallback } from "react";
import { CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";

interface CarouselCustomControlsProps {
  api?: CarouselApi; // 👈 Menerima api dari luar
}

export function CarouselCustomControls({ api }: CarouselCustomControlsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Callback untuk membaca titik indikator dan slide aktif
  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  const onInit = useCallback(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    // Jalankan di microtask berikutnya agar dianggap asynchronous oleh React Compiler
    queueMicrotask(() => {
      onInit();
    });

    api.on("select", onSelect);
    api.on("reInit", onInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onInit);
    };
  }, [api, onInit, onSelect]);

  // Jika data belum siap atau item tidak cukup banyak untuk discroll, sembunyikan navigasi
  if (!api || scrollSnaps.length <= 1) return null;

  return (
    <div
      role="group"
      aria-label="Carousel Navigation"
      className="inline-flex lg:bg-navbar lg:p-2 rounded-sm items-center gap-2 select-none"
    >
      {/* 1. TOMBOL PREV */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => api.scrollPrev()}
        disabled={!api.canScrollPrev()}
        aria-label="Previous slide"
        className="hidden lg:flex h-10 w-10 rounded-sm bg-muted hover:bg-accent transition-colors"
      >
        <RiArrowLeftLine className="h-5 w-5" />
      </Button>

      {/* 2. INDIKATOR BAR / DOTS */}
      <div className="flex w-60 lg:w-20 items-center gap-1 px-1" role="tablist">
        {scrollSnaps.map((_, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api.scrollTo(index)}
              className={`h-1 w-full rounded-lg transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "w-5 bg-red-600" // Aktif: Merah & lebih panjang
                  : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50" // Inaktif
              }`}
            />
          );
        })}
      </div>

      {/* 3. TOMBOL NEXT */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => api.scrollNext()}
        disabled={!api.canScrollNext()}
        aria-label="Next slide"
        className="hidden lg:flex h-10 w-10 rounded-sm bg-muted hover:bg-accent transition-colors"
      >
        <RiArrowRightLine className="h-5 w-5" />
      </Button>
    </div>
  );
}
