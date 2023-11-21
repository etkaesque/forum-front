
export type questionData = {
  questions: questionType[],
  questionCount: number
}
export type questionType = {
    id:number;
    title: string;
    content: string;
    date_created: Date;
    author: String;
    authorIdObect: {
      name: string
    };
    answers: string[]
  };
  
export type QuestionPost = {
  title: string;
  content: string;
}

export type AnswerPost = Omit<QuestionPost, "title">

export type Credentials ={
  name: string;
  email : string;
  password: string;
  confirmPassword: string;
}

export type LoginCredentials = Pick<Credentials, "email" | "password">

export type notificationType = {
  success: boolean, 
  message: string, 
  display: boolean
}