import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }

    console.table(cart);
    saveLocalStorage();
  }

  function removeFromCart(guitarID) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== guitarID));
  }

  function increaseQuantityInCar(guitarID) {
    const updatedCart = cart.map((item) => {
      if (item.id === guitarID) {
        item.quantity = item.quantity + 1;
        return item;
      }

      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantityInCar(guitarID) {
    const updatedCart = cart.map((item) => {
      if (item.id === guitarID) {
        if (item.quantity !== 1) {
          item.quantity = item.quantity - 1;

          return item;
        }
      }
      return item;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantityInCar}
        decreaseQuantity={decreaseQuantityInCar}
        clearCart={clearCart}
      ></Header>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                cart={cart}
                setCart={setCart}
                addToCart={addToCart}
              ></Guitar>
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
