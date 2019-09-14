const React = require('react')

const WordRelay = (props) => {
  const [word, setWord] = React.useState('제로초')
  const [value, setValue] = React.useState('')
  const [result, setResult] = React.useState('')
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    // TODO
  })

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length -1] === value[0]) {
      setResult('딩동댕')
      setWord(value)
      setValue('')
      inputRef.current.focus()
    } else {
      setResult('땡')
      setValue('')
      inputRef.current.focus()
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">input your text</label>
        <input id="wordInput" ref={inputRef} value={value} onChange={onChangeInput} type="text"/>
        <button>Submit</button>
      </form>
      <div>{result}</div>
    </>
  )
}

module.exports = WordRelay;