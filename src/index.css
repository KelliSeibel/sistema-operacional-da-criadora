@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  --font-display: "Space Grotesk", sans-serif;
}

@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.15s ease-out forwards;
  }
  
  .animate-slide-in {
    animation: slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Custom scrollbar styles */
  .scrollbar-thin::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 9999px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Custom styles for select-text */
.select-text {
  user-select: text !important;
  -webkit-user-select: text !important;
}

.select-none {
  user-select: none !important;
  -webkit-user-select: none !important;
}
