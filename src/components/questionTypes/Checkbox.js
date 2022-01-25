
import React from 'react';

export default function Radio({question, setAnswers, answers, next}) {
  return <div>
      <h3>{question.question}</h3>
      <ul>
          {question.options.map((a,b) => 
          <li key={question.question + b}>
              <label htmlFor={a + b}>{a}</label>
              <input type="checkbox" id={a + b} name={question.question} onChange={e => {
                  const newAnswers = [...answers]
                  const currAnswer = newAnswers.find(b => question.id === b.id)
                  const choosen = b + 1

                  currAnswer.myAnswer = currAnswer.myAnswer || []

                  if(currAnswer.myAnswer.includes(choosen))currAnswer.myAnswer = currAnswer.myAnswer.filter(k => k !== choosen)
                  else currAnswer.myAnswer.push(choosen)

                  setAnswers(newAnswers)
              }} />
          </li>
              )}
      </ul>
      <button onClick={next}>Next</button>
  </div>;
}
