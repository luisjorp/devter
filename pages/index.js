import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import AppLayout from "@/components/AppLayout";

export default function Home() {
  const router = useRouter();


  return (
    <>
      <Head>
        <title>Devter 🐦️</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <AppLayout>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <nav>
          <Link href="/timeline">
              Timeline
          </Link>
        </nav>
      </AppLayout>

      <style jsx>{`
          h1 {
              text-align: center;
              font-size: 48px;
          }

          nav {
              font-size: 24px;
              text-align: center;
          }
      `}</style>
    </>
  );
}
