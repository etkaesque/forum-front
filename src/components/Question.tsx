import Link from "next/link";

import Commemnt from "@/components/icons/Comment";
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

  const isContentLong = content.length > 250
  let shortContent = content;

  if(isContentLong) {
    shortContent = content.slice(0,250)
    shortContent = shortContent + "..."
  }

  return (
    <article className="sectionStyles2 w-full xl:w-full mx-10 xl:max-w-lg">
        <Link className="questionLink" href={`/question/${id}`}>
            <span className="questionAuthor">
                    Asked by {author} on{" "}
                    {date}
            </span>
            <h2 className="text-md break-words">{title}</h2>
            <div className={isContentLong ? "Qoverlay" : ""}>
            <p className="text-sm break-words">{shortContent}</p>

            </div>
            
            <div className="flex items-center">
              <Commemnt></Commemnt>
              <span className="text-sm my-2 opacity-70"> {answers} Answers</span>
            </div>
        </Link>
    </article>
  );
}

