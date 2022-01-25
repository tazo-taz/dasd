import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { Context, ContextLi } from './styledCompoents';

export default function History() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("history") || "[]").sort((a,b) => {
        if(b.score === a.score)return new Date(b.date) - new Date(a.date)
        return b.score - a.score
    }))
   
  return <div>
      
      <h1>
          History
          </h1>
          <Link to="/">Go to main page</Link>
          <br />
          <Link to="/quiz">Go to quiz page</Link>
          <ul>
              {data.map((a,b) => 
              <li  key={b}>
              <ContextLi tabIndex="1">date - {a.date} / score - {a.score} (on left click delete)
              <Context>
                  <p onClick={() => {
                      const newData = [...data]
                      newData.splice(b,1)
                      setData(newData)
                      localStorage.setItem("history", JSON.stringify(newData))
                  }}>
                  Delete
                  </p>
              </Context>
              </ContextLi>
              </li>
              
              )}
          </ul>
      </div>;
}
