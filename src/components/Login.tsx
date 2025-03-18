import { createSignal } from "solid-js";

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export default function Login(props: LoginProps) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api-production-d3c5.up.railway.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email(), password: password() }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        props.onLogin();
      } else {
        const data = await response.json();
        alert("Login falhou: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erro no login");
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-900">
      <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-white text-2xl mb-6 text-center">Entrar</h2>
        <div class="space-y-4">
          <input
            type="email"
            placeholder="Email"
            class="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Senha"
            class="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition"
            onClick={props.onLogin}
          >
            Entrar
          </button>
          <p class="text-center text-sm text-gray-400">
            Não tem conta?{" "}
            <a
              class="text-blue-500 hover:underline cursor-pointer"
              onClick={props.onSwitchToRegister}
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}