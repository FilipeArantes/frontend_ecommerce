import { AppProps } from "next/app";
import "@/styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Nav from "../components/usuario/nav/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* <Nav></Nav> */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
