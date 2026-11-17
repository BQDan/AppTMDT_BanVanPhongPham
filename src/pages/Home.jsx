import { useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import ProductCard from '../components/common/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import '../components/home/Home.css';
import '../css/home.css';

export function Home()
{
    const [category, setCategory] = useState('all');
    const list = category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

    return (
        <>
            <HeroBanner />
            <section id='products'>
                <h2 className='section-title'>Sản phẩm nổi bật</h2>

                <div className='filter-bar'>
                    {['all', ...CATEGORIES].map((c) => (
                        <button key={c} type='button' className={c === category ? 'chip active' : 'chip'}
                            onClick={() => setCategory(c)}>
                            {c === 'all' ? 'Tất cả' : c}
                        </button>
                    ))}
                </div>

                <div className='product-grid'>
                    {list.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>
        </>
    );
}
