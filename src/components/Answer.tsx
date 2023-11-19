
import { useMutation } from "@tanstack/react-query";
import { handleDownvote, handleUpvote, deleteAnswer } from "@/store/plugins/api";
import  {useStore}  from "../store/state/store";

type answer = {
    id : string, 
    questionId: string,
    name: string,
    content: string, 
    user: string,
    date: string,
    author: string,
    upvoted: string[],
    downvoted:string[],
    upvoteCount: number,
    downvoteCount: number
}

export default function AnswerCard(props : answer) {

  const setUpdate = useStore((state) => state.setUpdate)
  const setLoader = useStore((state) => state.setLoader)
  const {id, name, content, user, date, author, upvoted, downvoted, upvoteCount, downvoteCount, questionId} = props


  const mutateUpvote = useMutation({
    mutationFn: handleUpvote,
    onMutate: () => setLoader(true),
    onSettled: () => 
    {
    setLoader(false)
    setUpdate()
    },

  })

  const mutateDownVote = useMutation({
    mutationFn: handleDownvote,
    onSettled: () => 
    {
    setLoader(false)
    setUpdate()
    },
  })


  const mutateDelete = useMutation({
    mutationFn: deleteAnswer,
    onSettled: () => 
    {
    setLoader(false)
    setUpdate()
    },
  })

  const isUpvoted = upvoted.includes(user)
  const isDownvoted = downvoted.includes(user)
  return (
    <article key={id} className="p-2 flex flex-col my-3 border-b-2 border-cyan-200">

    <span className="questionAuthor">{name} on {date}</span>
    <p>{content}</p>
    <div className="flex items-center gap-x-2">
        <button onClick={() => mutateUpvote.mutate(id)}><svg className="opacity-70 hover:opacity-30" fill={isUpvoted? "#1C7ED6" : "#000000"} width="25px" height="25px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32"><path d="M29.845,17.099l-2.489,8.725C26.989,27.105,25.804,28,24.473,28H11c-0.553,0-1-0.448-1-1V13  c0-0.215,0.069-0.425,0.198-0.597l5.392-7.24C16.188,4.414,17.05,4,17.974,4C19.643,4,21,5.357,21,7.026V12h5.002  c1.265,0,2.427,0.579,3.188,1.589C29.954,14.601,30.192,15.88,29.845,17.099z" id="XMLID_254_"/><path d="M7,12H3c-0.553,0-1,0.448-1,1v14c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1V13C8,12.448,7.553,12,7,12z   M5,25.5c-0.828,0-1.5-0.672-1.5-1.5c0-0.828,0.672-1.5,1.5-1.5c0.828,0,1.5,0.672,1.5,1.5C6.5,24.828,5.828,25.5,5,25.5z" id="XMLID_256_"/></svg></button>
      <span>{upvoteCount}</span>
        <button onClick={() => mutateDownVote.mutate(id)}><svg className="opacity-70 hover:opacity-30" fill={isDownvoted ? "#1C7ED6" : "#000000"} width="25px" height="25px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32"><path d="M2.156,14.901l2.489-8.725C5.012,4.895,6.197,4,7.528,4h13.473C21.554,4,22,4.448,22,5v14  c0,0.215-0.068,0.425-0.197,0.597l-5.392,7.24C15.813,27.586,14.951,28,14.027,28c-1.669,0-3.026-1.357-3.026-3.026V20H5.999  c-1.265,0-2.427-0.579-3.188-1.589C2.047,17.399,1.809,16.12,2.156,14.901z" id="XMLID_259_"/><path d="M25.001,20h4C29.554,20,30,19.552,30,19V5c0-0.552-0.446-1-0.999-1h-4c-0.553,0-1,0.448-1,1v14  C24.001,19.552,24.448,20,25.001,20z M27.001,6.5c0.828,0,1.5,0.672,1.5,1.5c0,0.828-0.672,1.5-1.5,1.5c-0.828,0-1.5-0.672-1.5-1.5  C25.501,7.172,26.173,6.5,27.001,6.5z" id="XMLID_260_"/></svg></button>
      <span>{downvoteCount}</span>

  {(user == author) && 
    <button onClick={() => mutateDelete.mutate({id,questionId})} >
        <svg  className="opacity-70 hover:opacity-30" width="25px" height="25px" viewBox="0 0 24 24" fill="#000000">
        <g id="Interface / Trash_Full">
        <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#ffffff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        </svg>
      </button>}
    </div>
</article>
  );
}

