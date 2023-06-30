import Header from "../components/Header";
import styles from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="background">
      <Header />

      <main className="flex justify-center ">
        <section className=" relative max-w-7xl mx-10">
          <div className="sectionStyles">
            <Link
              href={"/ask"}
              className={styles.button}
            >
              Post a question
            </Link>
            <br />
            <span>241 questions</span>
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit ipsum
            voluptates ipsa explicabo eum eveniet ad fugit aperiam dicta
            expedita neque, sed temporibus non facere rem? Optio totam facere
            repellendus?
          </div>
        </section>
      </main>
    </div>
  );
}
