import Link from "next/link";
import Commemnt from "@/icons/Comment";
type question = {
    id: number;
    title : string;
    content: string;
    author: string;
    date: string;
    answers:number;
}

export default function QuestionCard(props : question) {

  const {id, title, content, author, date, answers} = props

  return (
    <article className="sectionStyles2 w-3/4 xl:w-full mx-10 xl:max-w-lg">
        <Link className="questionLink" href={`/question/${id}`}>
            <span className="questionAuthor">
                    Asked by {author} on{" "}
                    {date}
            </span>
            <h2 className="questionh2">{title}</h2>
            <p className="questionContent">{content}</p>
            <div className="flex items-center">
              <Commemnt></Commemnt>
              <span className="text-lg my-2 opacity-70"> {answers} Answers</span>
            </div>
        </Link>
    </article>
  );
}

