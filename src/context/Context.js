import { useContext, createContext, useState, useEffect } from "react"
import {useRouter} from 'next/router'
import PropTypes from "prop-types"

const AppContext = createContext()

export const Context = ({ children }) => {
  const [tab, setTab] = useState('home')
  const router = useRouter()

  useEffect(() => {
    const checkActiveTab = () => {
      const path = router.pathname.slice(1)
      setTab(path || 'home')
    }
    checkActiveTab()
  }, [router.pathname])

  return <AppContext.Provider value={{tab, setTab}}>
    { children }
  </AppContext.Provider>
}

export const useAppContext = () =>
  useContext(AppContext)

Context.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Context
