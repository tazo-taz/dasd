import React, { useEffect, useState } from 'react';
import Radio from '../../components/questionTypes/Radio';
import Checkbox from '../../components/questionTypes/Checkbox';
import Boolean from '../../components/questionTypes/Boolean';
import { getQuizDataAxios } from '../axios/quiz';
import { AnimationBg, ProgressBar, ProgressBarDiv } from '../../components/styledComponents';
import { Audio } from  'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';

function setWithExpiry(key, value, ttl) {
	const now = new Date()

	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [currQuestion, setCurrQuestion] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState({show: false, bg: ""})
  const [openPopup, setOpenPopup] = useState(false)

  let navigate = useNavigate();
  
const getQuizData = async () => {

  let session = getWithExpiry("quizData")
  if(session){

    const {questions, answers} = session
    setQuestions(questions)
  setAnswers(answers)
  setLoading(true)
  }else{
    
    const {data: {questions, answers}}=  await getQuizDataAxios()
    setWithExpiry("quizData",{questions, answers}, 1000 * 60 * 10)
    setQuestions(questions)
    setAnswers(answers)
    setLoading(true)
    
  }
}

const currQuestionData = questions[currQuestion]
const correntAnswers = answers.map(a => {
  const {answer, myAnswer} = a
  if(Array.isArray(myAnswer)){
    return JSON.stringify(answer.sort()) === JSON.stringify(myAnswer.sort()) ? 1 : 0
  }else return answer === myAnswer ? 1 : 0
}).reduce((a,b) => a + +b, 0)


  useEffect(() => {
    getQuizData()
  },[])

  if(!loading)return  <Audio
  heigth="100"
  width="100"
  color='grey'
  ariaLabel='loading'
/>
  
  else if(!currQuestionData && (currQuestion + 1) === questions.length)return "Question could be found"

  let questionDiv = ""

  const onNext = () => {
    setCurrQuestion(currQuestion + 1)
    const currAnswer = answers[currQuestion]
    if(currAnswer){
      let {answer, myAnswer} = currAnswer
      if(Array.isArray(answer)){
        answer = JSON.stringify(answer.sort())
        myAnswer = JSON.stringify((myAnswer || []).sort())
      }
      console.log(answer,myAnswer);
      setShowAnimation({
        show: true,
        bg: answer === myAnswer ? "green" : "red"
      })
      
      setTimeout(() => {
        setShowAnimation({
          show: false
        })
      },2000)
    }
  }
  if(currQuestionData){
    if(currQuestionData.type === "single")questionDiv =  <Radio question={currQuestionData} setAnswers={setAnswers} next={onNext} />
    if(currQuestionData.type === "multiple")questionDiv =  <Checkbox question={currQuestionData} setAnswers={setAnswers} answers={answers} next={onNext} />
    if(currQuestionData.type === "boolean")questionDiv =  <Boolean question={currQuestionData} setAnswers={setAnswers} answers={answers} next={onNext} />
  }

  

  const onFinish = <>
correct answers {correntAnswers}/{questions.length}
<Popup open={openPopup} setOpen={setOpenPopup} onSave={() => {
  let history = JSON.parse(localStorage.getItem("history") || "[]")
  const date = new Date().toLocaleDateString()
  history = [{date, score: correntAnswers}, ...history]
  localStorage.setItem("history", JSON.stringify(history))
  navigate('/');
}} onCancel={() => {
  navigate('/');
}} />
<button onClick={() => {
  setOpenPopup(true)
}}>try again</button>
<Link to="/history">See results</Link>
  </>

  console.log(answers,currQuestion ,questions.length);

  return <div>
    {showAnimation.show &&
    <AnimationBg  bg={showAnimation.bg} />
    }
    {
      (currQuestion + 1) <= questions.length &&
    <ProgressBarDiv>
      <ProgressBar width={(currQuestion + 1) / questions.length * 100}  />
    </ProgressBarDiv>
    }
    {questionDiv}

    {currQuestion === questions.length && onFinish}
  </div>;
}
