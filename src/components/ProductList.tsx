import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  openCart,
  closeCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} from "../slices/ShoppingCartSlice";
import ReactPaginate from "react-paginate";
import { RootState } from "../store";
import CartItem from "../slices/ShoppingCartSlice";
import ShoppingCartSlice from "../slices/ShoppingCartSlice";

export interface ProductListType {
  products: IProduct[] | null;
}
type CartItem = {
  id: number;
  quantity: number;
};

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductList = (props: ProductListType) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.ShoppingCart.cartItems
  );
  const { products } = props;
  const getItemQuantity = (id: number) => {
    const cartItem = cartItems.find((item: CartItem) => item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };
  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = products
    ?.slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => {
      return (
        <div key={product.id} className="product-preview">
          <Link to={`/products/${product.id}`}>
            <h2>{product.title}</h2>
            <p>
              Price <span>Rs. {product.price}</span>
            </p>
            <div className="image">
              <img src={product.image} alt="product" />
            </div>
          </Link>
          <div className="add-to-cart">
            {getItemQuantity === 0 ? (
              <button
                className="btn-add-cart"
                onClick={() => dispatch(increaseCartQuantity(product.id))}
              >
                Add To Cart
              </button>
            ) : (
              <div className="cart-itemsss">
                <div className="cart-update">
                  <div>
                    <button
                      className="btn-update"
                      onClick={() => dispatch(decreaseCartQuantity(product.id))}
                    >
                      -
                    </button>
                  </div>
                  <span className="quantity">{getItemQuantity}</span> in cart
                  <div>
                    <button
                      className="btn-update"
                      onClick={() => dispatch(increaseCartQuantity(product.id))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="remove">
                  <button
                    className="btn-remove"
                    onClick={() => dispatch(removeFromCart(product.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil((products?.length ?? 0) / productsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    console.log("selected", selected);
    setPageNumber(selected);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  return (
    <>
      <div className="items">{displayProducts}</div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"prevBtn"}
        nextLinkClassName={"nextBtn"}
        activeClassName={"paginationActive"}
        pageRangeDisplayed={productsPerPage}
      />
      {/* <Stack spacing={10}>
      <Pagination count={pageCount} onChange={handleChange} variant="outlined" shape="rounded" 
      />
    </Stack>  */}
    </>
  );
};

export default ProductList;
