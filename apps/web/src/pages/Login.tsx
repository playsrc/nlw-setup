import LogoImage from "../assets/logo.svg";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { SignIn } from "phosphor-react";
import { FormEvent, useState } from "react";
import { trpc } from "../utils/trpc";

export let token: string;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMut = trpc.users.login.useMutation({
    async onSuccess(accessToken) {
      localStorage.setItem("token", accessToken);
      // navigate("/app");
    },
    onError(error) {
      window.alert(`Oops, ocorreu um erro: ${error.message}`);
    },
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await loginMut.mutateAsync({ email, password });
  }

  return (
    <div className="h-screen bg-gradient-to-b from-zinc-900 to-indigo-900">
      <div className="max-w-md mx-auto pt-8 px-4">
        <header className="flex items-center justify-center mb-6">
          <Link to="/">
            <img src={LogoImage} alt="" />
          </Link>
        </header>

        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-violet-600 hover:bg-violet-700 focus:ring-violet-800"
          >
            <SignIn weight="bold" size={20} />
            Entrar
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-zinc-500">
          <p>Não tem uma conta?</p>

          <Link
            to="/register"
            className="mt-2 flex justify-center w-full sm:w-max border border-violet-500 font-semibold text-sm rounded-lg px-5 py-2.5 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
