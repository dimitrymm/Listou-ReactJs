import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <Header />

      <main className="flex">
        <div className="max-w-xl m-auto">
          <h1 className="text-7xl font-bold mb-3">Listou</h1>
          <span className="font-medium">
            Organize suas compras de forma simples e rápida
          </span>
          <p className="mt-3">
            "Com o Listou, você nunca mais esquecerá um item da sua lista.
            Adicione suas compras, acompanhe o histórico e facilite o
            planejamento mensal da sua família."
          </p>
        </div>
        <aside className="m-auto max-w-3xl">
          <h1>Demonstrações</h1>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
