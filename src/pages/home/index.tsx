import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import sliderData from "@/lib/sliderData";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4 md:flex items-center md:mx-52">
        <div className="text-center md:text-left">
          <h1 className="text-7xl font-bold mb-3">Listou</h1>
          <span className="font-medium">
            Organize suas compras de forma simples e rápida
          </span>
          <p className="mt-3 font-bold">
            "Com o Listou, você nunca mais esquecerá um item da sua lista.
            Adicione suas compras, acompanhe o histórico e facilite o
            planejamento mensal da sua família."
          </p>
        </div>

        <Carousel className="w-full max-w-2xl">
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent>
            {sliderData.map((item) => (
              <CarouselItem key={item.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img className="rounded-xl shadow-2xl" src={item.url} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      <Footer />
    </div>
  );
}
