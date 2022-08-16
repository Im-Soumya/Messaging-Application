import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Messaging App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-7">
        <Header />
        <Sidebar />
      </main>

      <footer className="flex flex-1 py-5 border-t-1 justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center flex-grow-1"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
