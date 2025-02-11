import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProdutctForm from "@/components/ProductForm";

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex justify-center p-4 mx-4 ">
        <ProdutctForm />
      </main>
      <Footer />
    </div>
  );
}
