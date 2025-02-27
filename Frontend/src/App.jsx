import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Prism from "prismjs"
import Markdown from "react-markdown"
import Editor from "react-simple-code-editor"
import axios from "axios"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function sum(){
              return 1 + 1
            }`)

    const [review, setReview] = useState(``)

  useEffect(()=>{
    Prism.highlightAll();
  },[])

   async function reviewCode(){
    const response = await axios.post("http://localhost:3000/ai/get-review", { code })

    setReview(response.data)
  }


  return (
   <>
   <main>
    <div className="left">
      <div className="code">
        <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 17,
          borderRadius: "5px",
          border: "1px solid #ddd",
          height: "100%",
          // overflowY: "scroll",
          width: "100%",
        }}
      />
      </div>
      <div onClick={reviewCode}
      className="review">Review</div>
    </div>
 

    <div className="right">
      <Markdown
      rehypePlugins={[rehypeHighlight]}

      >{review}</Markdown>

    </div>
   </main>
   </>
  )
}

export default App
