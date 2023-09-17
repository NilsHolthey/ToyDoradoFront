import Featured from '@/components/Featured';
import Header from '@/components/Header';
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import CategoriesPage from './categories';
import { Category } from '@/models/Categories';
import Layout from '@/components/Layout';
import CategoriesPageContent from '@/components/CategoriesPageContent';

export default function HomePage({
  featuredProduct,
  newProducts,
  mainCategories,
  categoriesProducts,
}) {
  return (
    <Layout>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
      <CategoriesPageContent
        mainCategories={mainCategories}
        categoriesProducts={categoriesProducts}
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProductId = '64ef237231549dc766a2e179';

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const products = await Product.find({ category: mainCat._id }, null, {
      limit: 4,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
