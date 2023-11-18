import axios from 'axios';

type post = {
  title: string,
  content: string
}

export async function fetchUser() {
  const token = localStorage.getItem("jwt_token")
  if(!token) throw Error
  const response = await axios.get(`${process.env.SERVER_URL}/user`, {
      headers: {
        authorization: token
      }
    })

  return response.data
}

export async function fetchQuestions() {
  const response = await fetch(`${process.env.SERVER_URL}/allQuestions`);
  return response.json();
}

export async function postQuestion(form :post) {
  const token = localStorage.getItem("jwt_token")
  if(!token) return null
    const response = await axios.post(
      `${process.env.SERVER_URL}/askQuestion`,
      form, 
      {headers: 
        {
        authorization: token
        }
      })

    return response.data
  
}

export async function postAnswer({form, routerId} : {form : {content: string}, routerId : string}){
  const token = localStorage.getItem("jwt_token")
  if(!token) return null
    const response = await axios.post(
      `${process.env.SERVER_URL}/question/${routerId}/answer`,
      form, 
      {headers: 
        {
        authorization: token
        }
      })
    
    return response.data
}

export async function fetchQuestion(routerId :string) {

    const token = localStorage.getItem("jwt_token")
    if(!token) return null
    const response = await axios.get(
        `${process.env.SERVER_URL}/question/${routerId}/answers`,
        {headers: 
          {
          authorization: token
          }
        }
      );
    return response.data.questionsWithAnswers[0]
  
}

export async function deleteAnswer({id, questionId} : {id : string, questionId : string}){
  const token = localStorage.getItem("jwt_token")
  if(!token) return null
  const response = await axios.delete(`${process.env.SERVER_URL}/removeAnswer?answerId=${id}&questionId=${questionId}`, {headers: {authorization: token}})
  return response.data
}

export async function deleteQuestion(questionId : string){
    const token = localStorage.getItem("jwt_token")
    if(!token) return null

    const response = await axios.delete(`${process.env.SERVER_URL}/removeQuestion/${questionId}`, {
        headers: {authorization: token}
      });
    return response
}

export async function handleUpvote(id : string) {
      const token = localStorage.getItem("jwt_token")
      if(!token) return null

      const response = await axios.put(
        `${process.env.SERVER_URL}/answer/${id}/upvote`,
         {},
        {headers: 
          {
          authorization: token
          }
        })

      return response.data
}

export async function handleDownvote(id: string) {

  const token = localStorage.getItem("jwt_token")
  if(!token) return null

  const response = await axios.put(
    `${process.env.SERVER_URL}/answer/${id}/downvote`,{},
      {headers: 
          {
          authorization: token
          }
        })
  return response.data

}