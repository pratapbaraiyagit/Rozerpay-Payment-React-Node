import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [book, setBook] = useState({
    name: "Iphone 13 (128Gb)",
    author: "Jams Bond",
    img: "https://www.rueducommerce.fr/media/images/web/produit/3298016/20210923133422/iphone_13_-_128go_-_bleu_1_1200x1200.png",
    price: 44500,
  });

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_LcRZY3vQWpFKMC",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = axios.post(verifyUrl, response);
          console.log("data", data);
        } catch (error) {
          console.log("error", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: book.price });
      console.log("data", data);
      initPayment(data.data);
    } catch (error) {}
  };
  return (
    <div className="App">
      <div className="book_container">
        <img src={book.img} alt="image" className="book_img" />
        <p className="book_name">{book.name}</p>
        <p className="book_author">By {book.author}</p>
        <p className="book_price">
          Price: <span>:{book.price}</span>
        </p>
        <button className="buy_btn" onClick={handlePayment}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default App;
