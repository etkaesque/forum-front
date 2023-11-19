import axios from 'axios';

type post = {
  title: string,
  content: string
}
type Credentials ={
  email: string,
  password: string,
}

export async function loginUser(data : Credentials) {
  const response = await axios.post(
      `${process.env.SERVER_URL}/login`,
      {
        email: data.email,
        password: data.password
      }
    );
  
  return response.data
}

export async function fetchUser() {

  try {
    const token = localStorage.getItem("jwt_token")
    if(!token) throw Error
    const response = await axios.get(`${process.env.SERVER_URL}/user`, {
        headers: {
          authorization: token
        }
      })
    return response.data

  } catch {
    throw Error('Could not fetch an user')
  }

}

export async function createUser(data : {email : string, password: string, confirmPassword: string, name: string}) {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/signUp`,
      {
        email: data.email,
        password: data.password,
        name: data.name,
        confirm_password: data.confirmPassword
      }
    );
  
  return response.data 
  } catch (err) {
    console.log(err)
    throw Error("Could not create an user")
  }
}

export async function fetchQuestions() {

  try {
    const response = await fetch(`${process.env.SERVER_URL}/allQuestions`);
    return response.json();

  } catch {
    throw Error("Could not fetch data")
  }


}

export async function postQuestion(form :post) {

  try {
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

  } catch {
    throw Error("Could not post a question")
  }
}

export async function postAnswer({form, routerId} : {form : {content: string}, routerId : string}){

  try {
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

  } catch {

    throw Error("Could not post an answer")
  }
}

export async function fetchQuestion(routerId :string) {

  try {
    const response = await axios.get(
        `${process.env.SERVER_URL}/question/${routerId}/answers`
      );

    return response.data.questionsWithAnswers[0]
  } catch {
    throw Error("Could not fetch data from a server")
  }
}

export async function deleteAnswer({id, questionId} : {id : string, questionId : string}){

  try {
    const token = localStorage.getItem("jwt_token")
    if(!token) return null
    const response = await axios.delete(`${process.env.SERVER_URL}/removeAnswer?answerId=${id}&questionId=${questionId}`, {headers: {authorization: token}})
    return response.data

  } catch {
    throw Error("Could not delete an answer")
  }

}

export async function deleteQuestion(questionId : string){

  try {
    const token = localStorage.getItem("jwt_token")
    if(!token) return null
    const response = await axios.delete(`${process.env.SERVER_URL}/removeQuestion/${questionId}`, {
        headers: {authorization: token}
      });
    return response

  } catch {
    throw Error("Could not delete a question")
  }

}

export async function handleUpvote(id : string) {

    try {
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

    } catch {
      throw Error("Could not upvote")
    }
}

export async function handleDownvote(id: string) {

  try {
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
  } catch {
    throw Error("Could not downvote")
  }

}