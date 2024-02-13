import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IProduct } from "../components/ProductList";
import Breadcrumb from "../components/Breadcrumb";

interface ResponseType {
  data: IProduct | null;
  isPending: boolean;
  error: string | null;
}

const ProductDetail = () => {
  const { id } = useParams();
  const {
    data: product,
    error,
    isPending,
  }: ResponseType = useFetch("https://fakestoreapi.com/products/" + id);
  console.log("response ", product);
  const page =product?.title
  return (
    <>
    <Breadcrumb page={page} />
      <div className="content">
    <div className="product-details">
      {isPending && <div> Loading .....</div>}
      {error && <div>{error}</div>}
      {product && (
        <article>
          <h2>{product.title}</h2>
          <p>Price {product.price}</p>
          <div className="image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="add-to-cart">
            <button className="btn-add-cart">Add To Cart</button>
          
          <div className="cart-itemsss">
            <div className="cart-update">
              <div >
                <button className="btn-update">-</button>
              </div>
              <span className="quantity">3</span> in cart
              <div >
                <button className="btn-update">+</button>
              </div>
            </div>
            <div className="remove">
              <button className="btn-remove">
              Remove
              </button>
            </div>
          </div>
          </div>
          <button>
            <Link to={"/edit/:id"}>Edit</Link>
          </button>
        </article>
      )}
    </div>
    </div>
    </>
  );
};

export default ProductDetail;
