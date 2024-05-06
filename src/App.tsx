import { useEffect, useState } from 'react'
import './App.css'
import { tokens } from './tokens'



const shuffleNightcore = () => {
  const ids: number[] = []
  const names: string[] = []
  const sentence: any = []

  tokens.forEach((token) => {
    if ((token.pos == "名詞" && token.pos_detail_1 == "一般")) {
      ids.push(token.word_id)
      names.push(token.surface_form)
    }
  })

  shuffle(names)

  tokens.forEach((token) => {
    const id = token.word_id
    const find = ids.findIndex((elem) => elem == id)
    if (find < 0) {
      sentence.push(token.surface_form)
    }
    else {
      sentence.push(names.pop())
    }
  })

  const lasts: string[] = [sentence.slice(-1)[0], sentence.slice(-2)[0], sentence.slice(-3)[0]]

  lasts.sort(() => Math.random() - 0.5)
  sentence.splice(-3)
  sentence.push(...lasts)

  return sentence
}

function shuffle(arr: string[]) {
  for (let i = arr.length - 1; 0 < i; i--) {
    const r = Math.floor(Math.random() * i);
    const tmp = arr[r];
    arr[r] = arr[i];
    arr[i] = tmp;
  }
}

function App() {
  const [nightcore, setNightcore] = useState(shuffleNightcore())

  useEffect(() => {
    shuffleNightcore()
  }, [])

  return (
    <>
      <h1>{nightcore}</h1>
      <div className="card">
        <button className="button" onClick={() => {
          setNightcore(shuffleNightcore())
        }}>
          シャッフル
        </button>
      </div>

      <div className="card">
        <a href={`https://twitter.com/intent/tweet?text=${nightcore.join('')}&url=https://nimea-takuo.vercel.app`} target="_blank" rel="noopener noreferrer">Tweet</a>
        <a href="https://twitter.com/NimeaTakuo" target="_blank" rel="noopener noreferrer">@NimeaTakuo</a>
      </div>
    </>
  )
}

export default App