import React, { useState } from 'react'
import { MdxEditor } from '../lib'

const App = () => {
  const [state, setState] = useState({
    default_text: "# Hello World! \n## This is a subtitle\nThis is a **normal** text\n- Item 1\n- Item 2\n"
  })

  const setProps = (newProps) => {
    setState(newProps)
  }

  return <MdxEditor setProps={setProps} {...state} />
}

export default App
