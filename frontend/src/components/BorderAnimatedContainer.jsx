// import React from "react";

const BorderAnimatedContainer = ({ children }) => {
  return (
    <div
      className="w-full h-full
        [background:linear-gradient(135deg,#1e293b,#0f172a_50%,#1e293b)_padding-box,
        conic-gradient(from_var(--border-angle),
        theme(colors.slate.700/.4)_80%,
        theme(colors.rose.500)_86%,
        theme(colors.pink.400)_90%,
        theme(colors.emerald.400)_94%,
        theme(colors.slate.700/.4))_border-box]
        rounded-3xl border-2 border-transparent animate-border
        flex overflow-hidden shadow-2xl shadow-rose-500/20"
    >
      {children}
    </div>
  );
};

export default BorderAnimatedContainer;
