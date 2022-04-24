import Header from "./components/Outlet/Header";
import Footer from "./components/Outlet/Footer";
import MainPage from "./components/MainPage/MainPage";
import { Route, Routes, useParams } from "react-router-dom";
import ProductDetail from "./components/Product/ProductDetail";
import Transaction from "./components/Payment/Transaction";
import { useSelector } from "react-redux";
import MyPage from "./components/Mypage/MyPage";
import ProductForm from "./components/Product/ProductForm";
import Error403 from "./components/ErrorPage/Error403";

function App() {
  //불러올떄 이줄 추가 하시면돼요~!
  //컴포넌트 어디서든 로그인한 유저의 정보를 갖고올 수 있어요..App.js
  const getAuthInfo = useSelector((state) => state);

  console.log(getAuthInfo);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/:id/:email" element={<Transaction />}></Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/403Error" element={<Error403 />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/mypage/:userId" element={<MyPage />} />
        <Route path="/new-product" element={<ProductForm />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
