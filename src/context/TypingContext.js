/* eslint-disable no-undef */
import { useContext, createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { sentences } from "../common/components/utils/constants"

const TypingContext = createContext({})
const level1Sentences = sentences.filter(s => s.quote.split(' ').length < 30)
const level2Sentences = sentences.filter(s => {
  const sLength = s.quote.split(' ').length
  return sLength <= 30 && sLength < 40
})
const level3Sentences = sentences.filter(s => s.quote.split(' ').length > 39)

const randomQuote = (level) => {
  let length
  let pickedLevel
  switch (level) {
    case '1':
      length = level1Sentences.length - 1
      pickedLevel = level1Sentences
      break
    case '2':
      length = level2Sentences.length - 1
      pickedLevel = level2Sentences
      break
    default:
      length = level3Sentences.length - 1
      pickedLevel = level3Sentences
  }
  const randomPick = Math.floor(Math.random() * (length + 1))
  const { quote } = pickedLevel[randomPick]
  return quote
}

const initialState = {
  keyTarget: null, isTargetPressed: false,
  keyPressed: null, index: 0, toType: randomQuote('2'),
  end: false, wordFinished: false, level: '2', score: 0, multiplier: 0,
  stack: 30, speed: 1
}

export const TypingProvider = ({ children }) => {
  const [state, setState] = useState(initialState)
  const { level } = state

  useEffect(() => {
    const quote = randomQuote(level)
    setState({
      ...state,
      toType: quote
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  return <TypingContext.Provider value={{state, setState}}>
    { children }
  </TypingContext.Provider>
}

export const useTyping = () => useContext(TypingContext)

TypingProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default TypingProvider