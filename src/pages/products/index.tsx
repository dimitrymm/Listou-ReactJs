import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProdutctForm from "@/components/ProductForm";

export default function Products() {
  return (
    <>
      <Header />
      <main className="flex justify-center mx-4 ">
        <ProdutctForm />
      </main>
      <Footer />
    </>
  );
}
