// Small inline SVG set, replacing the Material Symbols font the mockups pulled from Google.
// Square line caps and mitred joins keep the strokes on-brand (no rounded ends).

type IconProps = { className?: string };

function Svg({ className = "size-4", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v15M5 12l7 7 7-7" />
  </Svg>
);

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15M12 5l7 7-7 7" />
  </Svg>
);

export const ExternalLink = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />
  </Svg>
);

export const Download = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v12M6 10l6 6 6-6M4 21h16" />
  </Svg>
);

export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
  </Svg>
);

export const Bolt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </Svg>
);

export const Code = (p: IconProps) => (
  <Svg {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
  </Svg>
);

export const Terminal = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4 7 5 5-5 5M12 18h8" />
  </Svg>
);

export const Database = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5h16v4H4zM4 9h16v5H4zM4 14h16v5H4z" />
  </Svg>
);

export const Wrench = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 4h6v6l-3 0-9 9-3-3 9-9z" />
  </Svg>
);
