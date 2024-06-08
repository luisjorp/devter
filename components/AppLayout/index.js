import styles, {globalStyles} from "@/components/AppLayout/styles";

export default function Index({children}) {
  return (
    <>
      <div>
        <main>
          {children}
        </main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>{globalStyles}</style>
    </>
  )
    ;
}