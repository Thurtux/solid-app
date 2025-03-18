import { createSignal } from "solid-js";
import ProductList from "./ProductList";

export default function App() {
  const [selectedPage, setSelectedPage] = createSignal("products");

  return (
    <div class="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside class="w-64 bg-gray-800 p-5 space-y-4">
        <h1 class="text-xl font-bold mb-4">Minha Loja</h1>
        <nav class="space-y-2">
          <button
            class={`block w-full text-left p-2 rounded ${selectedPage() === "products" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setSelectedPage("products")}
          >
            Produtos
          </button>
          <button
            class={`block w-full text-left p-2 rounded ${selectedPage() === "orders" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setSelectedPage("orders")}
          >
            Pedidos
          </button>
          <button
            class={`block w-full text-left p-2 rounded ${selectedPage() === "settings" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setSelectedPage("settings")}
          >
            Configurações
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main class="flex-1 p-6 overflow-auto">
        {selectedPage() === "products" && <ProductList />}
        {selectedPage() === "orders" && <h1 class="text-2xl">Pedidos</h1>}
        {selectedPage() === "settings" && <h1 class="text-2xl">Configurações</h1>}
      </main>
    </div>
  );
}
