
import React from 'react';

export default function Boolean({question, setAnswers, next}) {
  return <div>
      <h3>{question.question}</h3>
      <ul>
          <li>
              <label htmlFor={"Yes"}>Yes</label>
              <input type="radio" id={"Yes"} name={question.question} onChange={e => {
                  setAnswers(ans => {
                    const currAnswer = ans.find(b => question.id === b.id)
                    if(currAnswer)currAnswer.myAnswer = true
                    return ans
                  })
              }} />
          </li>
          <li>
              <label htmlFor={"No"}>No</label>
              <input type="radio" id={"No"} name={question.question} onChange={e => {
                  setAnswers(ans => {
                    const currAnswer = ans.find(b => question.id === b.id)
                    if(currAnswer)currAnswer.myAnswer = false
                    return ans
                  })
              }} />
          </li>
      </ul>
      <button onClick={next}>Next</button>
  </div>;
}
