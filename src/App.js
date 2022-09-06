import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { publicRoute, priviteRoutes } from "./routes";
import { DefaultLayout } from "./layouts/UserLayouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc as docs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { setAuthenticatorUser, setUserInfo, setPosts } from "./redux/reducer";

function App() {
  const dispatch = useDispatch();
  const database = collection(db, "comments");

  onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUserInfo(currentUser));
  });

  // Lấy user hiện tại đang đăng nhập
  const currentUser = useSelector((prev) => prev.root.userinfo);
  const authenticatorUser = useSelector((prev) => prev.root.authenticatorUser);

  // kiểm tra xem endpoint có phải là /admin/ hay không
  const ref = useLocation();
  let laysOut = publicRoute;
  useEffect(() => {
    const getUser = () => {
      const users = collection(db, "users");
      onSnapshot(users, (snapshot) => {
        let users = [];
        // vòng lặp này để lấy ra tất cả các user có trong bảng firestore
        snapshot.docs.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
          if (
            doc?._document?.data?.value?.mapValue?.fields?.uid?.stringValue ===
            currentUser?.uid
          ) {
            const database = docs(db, "users", doc.id);
            onSnapshot(database, (doc) => {
              dispatch(setAuthenticatorUser(doc.data()));
            });
          }
        });
      });
    };
    getUser();
  }, [currentUser, dispatch]);

  useEffect(() => {
    onSnapshot(database, (snapshot) => {
      let comments = [];
      snapshot.docs.forEach((doc) => {
        comments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch(setPosts(comments));
    });
  }, [database, dispatch]);

  // kiểm tra xem nếu role là 1 thì sẽ vào được trang admin và ngược lại
  ref.pathname.startsWith("/admin/") && authenticatorUser.role === 1
    ? (laysOut = priviteRoutes)
    : (laysOut = publicRoute);

  return (
    <Routes>
      {laysOut.map((route, index) => {
        const Element = route.element;
        let Layout = DefaultLayout;
        if (route.layout) {
          Layout = route.layout;
        }
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Element />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
