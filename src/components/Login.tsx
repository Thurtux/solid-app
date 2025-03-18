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
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded shadow-md w-80">
        <h2 class="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          class="w-full p-2 mb-4 border rounded"
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          class="w-full p-2 mb-4 border rounded"
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <button
          onClick={handleLogin}
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
        <div class="mt-4 text-center">
          <button
            onClick={props.onSwitchToRegister}
            class="text-blue-500 hover:underline"
          >
            Não tem conta? Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}
