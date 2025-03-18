import { createSignal } from "solid-js";

interface RegisterProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function Register(props: RegisterProps) {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");

  const handleRegister = async () => {
    if (!name()) {
      alert("Nome é obrigatório!");
      return;
    }
    if (!email()) {
      alert("Email é obrigatório!");
      return;
    }
    if (password() !== confirmPassword()) {
      alert("As senhas não conferem!");
      return;
    }
    try {
      const response = await fetch("https://api-production-d3c5.up.railway.app/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name(), email: email(), password: password() }),
      });

      if (response.ok) {
        alert("Registrado com sucesso! Faça login.");
        props.onRegisterSuccess();
      } else {
        const data = await response.json();
        alert("Falha no registro: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erro no registro");
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded shadow-md w-80">
        <h2 class="text-xl font-bold mb-4">Cadastro</h2>
        <input
          type="text"
          placeholder="Nome"
          class="w-full p-2 mb-4 border rounded"
          onInput={(e) => setName(e.currentTarget.value)}
        />
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
        <input
          type="password"
          placeholder="Confirmar Senha"
          class="w-full p-2 mb-4 border rounded"
          onInput={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <button
          onClick={handleRegister}
          class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registrar
        </button>
        <div class="mt-4 text-center">
          <button
            onClick={props.onSwitchToLogin}
            class="text-blue-500 hover:underline"
          >
            Já tem conta? Faça login
          </button>
        </div>
      </div>
    </div>
  );
}
