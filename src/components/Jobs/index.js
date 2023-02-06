import {Component} from 'react'
import Headers from '../Headers'
import JobProfileSection from '../JobProfileSection'
import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Headers />
        <div>
          <JobProfileSection />
        </div>
      </>
    )
  }
}

export default Jobs
