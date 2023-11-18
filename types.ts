export type questionType = {
    id:number;
    title: string;
    content: string;
    date_created: Date;
    author: String;
    authorIdObect: {
      name: string
    };
    answers: Array<string>
  };
  
export type questionData = {
    questions: questionType[],
    questionCount: number
  }