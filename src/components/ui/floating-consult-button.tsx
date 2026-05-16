import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FloatingConsultButtonProps {
  // Button appearance
  buttonSize?: number; // Diameter in pixels (default: 160 for lg, 128 for mobile)
  imageSize?: number; // Center image diameter in pixels (default: 96 for lg, 80 for mobile)
  imageSrc?: string;
  imageAlt?: string;

  // Revolving text
  revolvingText?: string;
  revolvingSpeed?: number; // Duration in seconds for one rotation (default: 10)

  // Popup content
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaButtonAction?: () => void;

  // Positioning
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
}

export const FloatingConsultButton = ({
  buttonSize,
  imageSize,
  imageSrc = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  imageAlt = "Consultant",
  revolvingText = "FREE 30 MINUTES · CONSULT · ",
  revolvingSpeed = 10,
  popupHeading = "30-minute call",
  popupDescription = "A brief, free call with one of our producers to discuss your project and see if we're a fit.",
  popupBadgeText = "Free",
  ctaButtonText = "Book a call",
  ctaButtonAction = () => console.log("CTA clicked"),
  position = { bottom: "2rem", right: "2rem" },
}: FloatingConsultButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Responsive sizes with defaults
  const lgButtonSize = buttonSize || 160;
  const smButtonSize = buttonSize ? Math.round(buttonSize * 0.8) : 128;
  const lgImageSize = imageSize || 96;
  const smImageSize = imageSize ? Math.round(imageSize * 0.833) : 80;

  // CSS custom properties drive the responsive sizing (no global <style> selectors).
  const wrapperStyle = {
    ...position,
    ["--fcb-button-sm" as string]: `${smButtonSize}px`,
    ["--fcb-button-lg" as string]: `${lgButtonSize}px`,
    ["--fcb-image-sm" as string]: `${smImageSize}px`,
    ["--fcb-image-lg" as string]: `${lgImageSize}px`,
  } as React.CSSProperties;

  return (
    <>
      {/* Backdrop with Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fcb-heading"
            className="fixed bottom-48 right-8 z-50 w-[calc(100vw-4rem)] max-w-md rounded-3xl bg-white p-8 shadow-2xl lg:p-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute -top-12 -right-2 text-white transition-colors hover:text-gray-300"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="10" y1="10" x2="30" y2="30" />
                <line x1="30" y1="10" x2="10" y2="30" />
              </svg>
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <h3 id="fcb-heading" className="text-4xl font-bold leading-tight text-black lg:text-5xl">
                  {popupHeading}
                </h3>
                <span className="rounded-full border-2 border-black px-4 py-2 text-sm font-medium text-black">
                  {popupBadgeText}
                </span>
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                {popupDescription}
              </p>

              {/* CTA Button */}
              <Button
                className="w-full rounded-full bg-black px-8 py-4 text-base font-medium text-white hover:bg-gray-900"
                onClick={ctaButtonAction}
              >
                {ctaButtonText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="fixed z-50" style={wrapperStyle}>
        <motion.div
          className="fcb-trigger group relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen((v) => !v)}
          role="button"
          tabIndex={0}
          aria-label="Open consult popup"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen((v) => !v);
            }
          }}
        >
          {/* Rotating Text */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: revolvingSpeed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path
                  id="fcb-circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text className="fill-gray-600 text-[20.4px] font-medium uppercase tracking-wider">
                <textPath href="#fcb-circlePath" startOffset="0%">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center Image/Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="fcb-image overflow-hidden rounded-full bg-gray-900 shadow-lg transition-shadow group-hover:shadow-xl">
              {imageError ? (
                <div className="h-full w-full bg-gradient-to-br from-red-500 to-orange-500" />
              ) : (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Scoped responsive sizing via CSS variables — no global selectors. */}
        <style>{`
          .fcb-trigger {
            width: var(--fcb-button-sm);
            height: var(--fcb-button-sm);
          }
          .fcb-trigger .fcb-image {
            width: var(--fcb-image-sm);
            height: var(--fcb-image-sm);
          }
          @media (min-width: 1024px) {
            .fcb-trigger {
              width: var(--fcb-button-lg);
              height: var(--fcb-button-lg);
            }
            .fcb-trigger .fcb-image {
              width: var(--fcb-image-lg);
              height: var(--fcb-image-lg);
            }
          }
        `}</style>
      </div>
    </>
  );
};
