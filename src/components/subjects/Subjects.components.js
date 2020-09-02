import React from 'react'
import { withRouter } from 'react-router-dom'

function Subjects(props) {
  return (
    <div className="Subjects">
      Subjects
      {console.log(props)}
    </div>
  )
}

export default withRouter(Subjects)
