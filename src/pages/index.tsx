import Header from "../components/Header";
import styles from "./Home.module.css";
import Link from "next/link";
import axios from "axios";

type questionType = {
  title: string;
  content: string;
  date_created: Date;
  author: String;
  authorIdObect: {};
};

export default function Home({ data, count }: { data: questionType[] }) {
  return (
    <div className="background">
      <Header />

      <main className="flex flex-col items-center gap-y-4">
        <section className=" relative max-w-7xl w-3/4 mx-10 ">
          <div className="sectionStyles flex justify-center items-center gap-x-2">
            <Link href={"/ask"} className={styles.button}>
              Ask here
            </Link>

            <span>or browse all {count} questions</span>
          </div>
        </section>

        {data &&
          data.map((question) => {
            return (
              <article className="sectionStyles2 relative max-w-7xl w-3/4 mx-10">
                <Link className="questionStyle" href={`question/${question.id}`}>
                  <span className="questionAuthor">
                    Asked by {question.authorIdObect.name} on{" "}
                    {question.date_created.toString().split("T")[0]}
                  </span>
                  <h2 className="questionh2">{question.title}</h2>
                  <p className="questionContent">{question.content}</p>
                </Link>
              </article>
            );
          })}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:8080/allQuestions");
  const data = response.data.questions;
  const count = response.data.questionCount;

  console.log("count is ", count);

  return { props: { data, count } };
}
