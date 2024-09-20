"use client";

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {/* Seção do Slide de Imagens */}
      <section className="mb-8">
        <div className="">
          <Slider {...sliderSettings}>
            <div>
              <Image
                src="/produto2.jpg"
                alt="Produto 2"
                width={800}
                height={400}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
            <div>
              <Image
                src="/produto3.jpg"
                alt="Produto 3"
                width={800}
                height={400}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
            <div>
              <Image
                src="/produto4.jpg"
                alt="Produto 4"
                width={800}
                height={400}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
          </Slider>
        </div>
      </section>

      {/* Seção dos Cards de Ofertas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="border p-4 rounded-lg shadow-md text-center bg-yellow-100">
          <h2 className="text-xl font-bold mb-2">Melhores Ofertas</h2>
          <p>Aproveite as melhores ofertas do dia!</p>
          <Link href="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Ver Ofertas
            </button>
          </Link>
        </div>

        <div className="border p-4 rounded-lg shadow-md text-center bg-yellow-100">
          <h2 className="text-xl font-bold mb-2">Ofertas até 40%</h2>
          <p>Descontos imperdíveis em diversos produtos.</p>
          <Link href="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Ver Ofertas
            </button>
          </Link>
        </div>

        <div className="border p-4 rounded-lg shadow-md text-center bg-yellow-100">
          <h2 className="text-xl font-bold mb-2">Produtos Mais Vendidos</h2>
          <p>Confira os produtos mais populares!</p>
          <Link href="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Ver Produtos
            </button>
          </Link>
        </div>

        <div className="border p-4 rounded-lg shadow-md text-center bg-yellow-100">
          <h2 className="text-xl font-bold mb-2">Entrega Rápida</h2>
          <p>Produtos com entrega garantida em 24 horas.</p>
          <Link href="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Ver Produtos
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
