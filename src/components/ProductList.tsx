import { createSignal, onMount, For } from "solid-js";

interface Product {
  id: number;
  name: string;
}

export default function ProductList() {
  const [products, setProducts] = createSignal<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://api-production-d3c5.up.railway.app/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        setProducts(await response.json());
      } else {
        alert("Erro ao buscar produtos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    const name = prompt("Digite o nome do produto:");
    if (!name) return;

    try {
      const response = await fetch("https://api-production-d3c5.up.railway.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        fetchProducts();
      } else {
        alert("Erro ao adicionar produto");
      }
    } catch (error) {
      console.error(error);
    }
  };

  onMount(fetchProducts);

  return (
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Produtos</h2>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addProduct}
      >
        Adicionar Produto
      </button>
      <ul>
        <For each={products()}>
          {(product) => (
            <li class="border p-2 mb-2 rounded">{product.name}</li>
          )}
        </For>
      </ul>
    </div>
  );
}
