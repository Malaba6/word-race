import { useContext, createContext, useState } from "react"
import PropTypes from "prop-types"

const AppContext = createContext()

export const Context = ({ children }) => {
  const [tab, setTab] = useState('home')

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
