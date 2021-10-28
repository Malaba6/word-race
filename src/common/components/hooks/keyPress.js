/* eslint-disable consistent-return */
// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useCallback, useEffect } from "react"
import useSound from "use-sound"
import {useTyping} from '../../../context/TypingContext'

const getPoints = (time) => {
  switch (true) {
    case time < 1:
      return 10
    case time < 3:
      return 5
    case time < 5:
      return 2
    default:
      return 1
  }
}

const useKeyPress = () => {
  const { state, setState } = useTyping()
  const [playFail] = useSound('/fail.mp3', { volume: 0.15})
  const [playSuccess] = useSound('/success.mp3', { volume: 0.15})
  const {
    isTargetPressed, keyTarget, index, toType, end,
    speed, time, score, multiplier
  } = state

  const handleKeyDown = useCallback(({ key }) => {
    let now = new Date()
    now = now.getTime()

    if (end) {
      return isTargetPressed
    }
    if ((index === 0 && key?.toLowerCase() === toType[0]?.toLowerCase())
      || key?.toLowerCase() === keyTarget?.toLowerCase()) {
      if (index === toType.length - 1) {
        const word = toType.slice(0, toType.length)
        const isBonusWord = ['alligators', 'ornery', 'toothbrush', 'kitchen', 'shoveling']
          .indexOf(word) !== -1
        const seconds = (now - time) / 1000
        const points = isBonusWord
          ? getPoints(seconds) + (multiplier * 2) + 3
          : getPoints(seconds) + (multiplier * 2)

        setState({ // Successfuly typed the last word
          ...state,
          end: true,
          isTargetPressed: false,
          keyPressed: null,
          keyTarget: null,
          index: 0,
          toType: '',
          wordFinished: false,
          time: seconds,
          score: score + points
        })

      } else if (toType[index + 1] === ' ') { // Successfuly typed a word 
        const word = toType.slice(0, index + 1)
        const isBonusWord = ['alligators', 'ornery', 'toothbrush', 'kitchen', 'shoveling']
          .indexOf(word) !== -1
        playSuccess()
  
        const newValue = toType.slice(index + 2)
        const seconds = (now - time) / 1000
        const points = isBonusWord ? getPoints(seconds) + 3 : getPoints(seconds)
        const multi = multiplier + 1

        setState({
          ...state,
          isTargetPressed: true,
          keyPressed: key,
          wordFinished: true,
          time: seconds,
          score: score + points,
          multiplier: multi
        })

        setTimeout(() => {
          setState({
            ...state,
            keyTarget: toType[index + 2],
            index: 0,
            toType: newValue,
            time: null,
            score: score + points,
            multiplier: multi
          })
        }, speed * 1000)

      } else { // Successfuly typed a letter
        setState({
          ...state,
          isTargetPressed: true,
          keyPressed: key,
          keyTarget: toType[index + 1],
          index: index + 1,
          wordFinished: false,
          time: index === 0  && !time ? now : time
        }) 
      }

    } else if ((index === 0 && key !== toType[2])) { // Failed to type a letter
      const points = multiplier * 2

      playFail()

      setState({
        ...state,
        time: index === 0  && !time ? now : time,
        isTargetPressed: false,
        keyPressed: key,
        keyTarget: toType[0],
        wordFinished: false,
        score: score + points,
        multiplier: 0
      })
    } else {
      const points = multiplier * 2
      playFail()
      setState({
        ...state,
        isTargetPressed: false,
        keyPressed: key,
        wordFinished: false,
        score: score + points,
        multiplier: 0
      })
    }
  }, [end, index, isTargetPressed, keyTarget,
    playFail, playSuccess, setState, speed,
    state, time, toType, score, multiplier])

  useEffect(() => {
    setState({
      ...state,
      keyTarget: toType[0]
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  return isTargetPressed
}

export default useKeyPress
