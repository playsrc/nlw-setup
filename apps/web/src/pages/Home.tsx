import LogoImage from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    // <div className="h-screen bg-landing-page bg-no-repeat bg-cover">
    <div className="h-screen bg-gradient-to-b from-zinc-900 to-indigo-900">
      <div className="max-w-3xl mx-auto pt-8">
        <header className="flex items-center justify-between mb-6">
          <img src={LogoImage} alt="" />

          <Link
            to="/app"
            className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          >
            Comece já
          </Link>
        </header>

        <p>
          <b>habits</b> é um aplicativo projetado para ajudar você a rastrear
          seus hábitos e melhorar sua qualidade de vida. Com ele, você pode
          criar uma lista de hábitos que deseja incorporar em sua rotina diária
          e marcá-los a medida que os pratica.
        </p>
      </div>
    </div>
  );
}
