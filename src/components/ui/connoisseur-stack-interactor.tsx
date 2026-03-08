import { cn } from "@/lib/utils";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

interface MenuItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "Teeth Whitening",
    clipId: "clip-original",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80",
  },
  {
    num: "02",
    name: "Dental Implants",
    clipId: "clip-hexagons",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    num: "03",
    name: "Smile Makeover",
    clipId: "clip-pixels",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80",
  },
];

export const ConnoisseurStack = ({
  items = defaultItems,
  className,
}: {
  items?: MenuItem[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const item = items[index];
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current)
      mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);

    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
      .to(selector, {
        scale: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      .to(selector, {
        scale: 0,
        duration: 0.6,
        stagger: { amount: 0.3, from: "edges" },
        ease: "expo.in",
      });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full",
        className
      )}
    >
      {/* LEFT SIDE: MENU */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="space-y-1">
          <div className="flex flex-col gap-1">
            {items.map((item, index) => (
              <div
                key={item.num}
                onMouseEnter={() => handleItemHover(index)}
                className="group cursor-pointer"
              >
                <div className="flex items-baseline gap-4 py-4 px-3 rounded-xl transition-colors duration-300 hover:bg-primary/5">
                  <span
                    className={cn(
                      "text-sm font-mono transition-colors duration-300",
                      activeIndex === index
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    )}
                  >
                    {item.num}
                  </span>

                  <div
                    className={cn(
                      "text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-none tracking-tight transition-colors duration-300",
                      activeIndex === index
                        ? "text-foreground"
                        : "text-muted-foreground/40 group-hover:text-foreground"
                    )}
                  >
                    <span>{item.name.split(" ")[0]}</span>{" "}
                    <span className="italic font-light">
                      {item.name.split(" ")[1]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SVG GRID */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square">
          <svg
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <clipPath id="clip-original">
                {Array.from({ length: 9 }).map((_, i) => (
                  <rect
                    key={`o-${i}`}
                    className="path"
                    x={(i % 3) * 105}
                    y={Math.floor(i / 3) * 105}
                    width="95"
                    height="95"
                    rx="8"
                  />
                ))}
              </clipPath>

              <clipPath id="clip-hexagons">
                {Array.from({ length: 6 }).map((_, i) => (
                  <circle
                    key={`h-${i}`}
                    className="path"
                    cx={50 + (i % 3) * 100}
                    cy={75 + Math.floor(i / 3) * 150}
                    r="48"
                  />
                ))}
              </clipPath>

              <clipPath id="clip-pixels">
                {Array.from({ length: 9 }).map((_, i) => (
                  <rect
                    key={`p-${i}`}
                    className="path"
                    x={(i % 3) * 105}
                    y={Math.floor(i / 3) * 105}
                    width="95"
                    height="95"
                    rx="4"
                  />
                ))}
              </clipPath>
            </defs>

            <g ref={mainGroupRef} clipPath="url(#clip-original)">
              <image
                ref={imageRef}
                href={items[0].image}
                x="0"
                y="0"
                width="300"
                height="300"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
