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
    <div className="">
      <Header />

      <main className="flex md:flex-row flex-col">
        <div className="max-w-xl m-4">
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
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {sliderData.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="p-1 ">
                    <Card>
                      <CardContent className="">
                        <img
                          className="w-full h-full rounded-xl shadow-2xl"
                          src={item.url}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
