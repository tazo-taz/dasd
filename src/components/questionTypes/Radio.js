
import React from 'react';

export default function Radio({question, setAnswers, next}) {
  return <div>
      <h3>{question.question}</h3>
      <ul>
          {question.options.map((a,b) => 
          <li key={b}>
              <label htmlFor={a + b}>{a}</label>
              <input type="radio" id={a + b} name={question.question} onChange={e => {
                  setAnswers(ans => {
                    const currAnswer = ans.find(b => question.id === b.id)
                    if(currAnswer)currAnswer.myAnswer = b + 1
                    return ans
                  })
              }} />
          </li>
              )}
      </ul>
      <button onClick={next}>Next</button>
  </div>;
}
