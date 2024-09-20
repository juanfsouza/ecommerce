import { useStore } from '@/app/store';
import { Product } from '@/app/store';

// motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '@/variants';


interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product);

  };

  return (
    <div 
      className="border p-4 m-12 rounded-lg shadow-lg"
    >
      <motion.img
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-lg"
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.6 }} 
      />
        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
        <p className="mt-1">{product.description}</p>
        <p className="mt-1 text-lg font-bold">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Adicionar
      </button>
    </div>
  );
};

export default ProductCard;
