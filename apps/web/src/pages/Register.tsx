import LogoImage from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { User } from "phosphor-react";

export default function Register() {
  return (
    <div className="h-screen bg-gradient-to-b from-zinc-900 to-indigo-900">
      <div className="max-w-md mx-auto pt-8 px-4">
        <header className="flex items-center justify-center mb-6">
          <Link to="/">
            <img src={LogoImage} alt="" />
          </Link>
        </header>

        <form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qual é o seu nome?
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Insira um e-mail válido
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Crie uma senha forte
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
          >
            <User weight="bold" size={20} />
            Cadastre-se
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-zinc-500">
          <p>Já possuí uma conta?</p>

          <Link
            to="/login"
            className="mt-2 flex justify-center w-full sm:w-max border border-violet-500 font-semibold text-sm rounded-lg px-5 py-2.5 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
