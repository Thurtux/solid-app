import { createSignal } from "solid-js";
import { A } from "@solidjs/router";

export default function Sidebar() {
  const [isOpen, setIsOpen] = createSignal(true);

  return (
    <div class="flex h-screen">
      {/* Sidebar */}
      <div class={`bg-gray-900 text-white ${isOpen() ? "w-64" : "w-20"} transition-all duration-300 flex flex-col p-4 space-y-4`}>
        <button
          class="mb-4 text-xl focus:outline-none self-end"
          onClick={() => setIsOpen(!isOpen())}
        >
          {isOpen() ? "◀" : "▶"}
        </button>
        <A href="/products" class="p-2 rounded hover:bg-gray-700">
          Produtos
        </A>
        <A href="/about" class="p-2 rounded hover:bg-gray-700">
          Sobre
        </A>
      </div>
      {/* Content */}
      <div class="flex-1 p-6">
        <h1 class="text-2xl">Conteúdo Principal</h1>
      </div>
    </div>
  );
}
