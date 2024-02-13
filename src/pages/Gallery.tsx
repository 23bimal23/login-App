import Breadcrumb from "../components/Breadcrumb";
import ProductList from "../components/ProductList";
import useFetch from "../hooks/useFetch";

interface ResponseType {
  data: Product[] | null;
  isPending: boolean;
  error: string | null;
}
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const page = "Gallery";
const Gallery = () => {
  const { data, isPending, error }: ResponseType = useFetch(
    "https://fakestoreapi.com/products/"
  );
  console.log(data);
  return (
    <>
      <Breadcrumb page={page} />
      <div className="content">
        <div className="store">
          {error && <div className="error"> Error while Fetching Data </div>}
          {isPending && <div className="loading-state"> Loading .....</div>}
          {data && <ProductList products={data} />}
        </div>
      </div>
    </>
  );
};

export default Gallery;
