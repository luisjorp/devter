import Link from "next/link";
import AppLayout from "@/components/AppLayout";

export default function Timeline({name}) {
  return (
    <>
      <AppLayout>
        <h1>Timeline of {name}</h1>
        <nav>
          <Link href="/">
            Home
          </Link>
        </nav>
      </AppLayout>

      <style jsx>{`
          h1 {
              text-align: center;
              font-size: 48px;
          }
      `}</style>
    </>
  );
}

Timeline.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
    .then(res => res.json());

}