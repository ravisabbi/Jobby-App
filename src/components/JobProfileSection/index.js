import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import FilteringGroups from '../FilteringGroups'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    employmentTypeList: [],
    salaryRange: 0,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentTypeList, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const ulr = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeList.join()}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(ulr, options)
    const data = await response.json()

    if (response.ok) {
      const updatedJobsList = data.jobs.map(eachItem => ({
        companyImageUrl: eachItem.company_logo_url,
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
        jobDescription: eachItem.job_description,
      }))
      this.setState({
        jobsList: updatedJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeEmploymentType = type => {
    this.setState(
      prevState => ({
        employmentTypeList: [...prevState.employmentTypeList, type],
      }),
      this.getJobsList,
    )
  }

  onChangeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobsList)
  }

  onPressEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onChangeMobileSearchInput = value => {
    this.setState({searchInput: value}, this.getJobsList)
  }

  renderingJobsList = () => {
    const {jobsList} = this.state

    return jobsList.length > 0 ? (
      <ul className="job-card-list">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobCardDetails={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-found-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  onClickMobileSearchBtn = value => {
    this.setState({searchInput: value}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderingFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=" failure view"
        className="jobs-failure-view-image"
      />
      <h1 className="jobs-failure-view-heading">Oops! Something Went wrong</h1>
      <p className="jobs-failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-btn"
        testid="button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderingLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderingViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingJobsList()
      case apiStatusConstants.failure:
        return this.renderingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderingLoadingView()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="job-profile-section-container">
        <FilteringGroups
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          onChangeEmploymentType={this.onChangeEmploymentType}
          onChangeSalaryRange={this.onChangeSalaryRange}
          onChangeMobileSearchInput={this.onChangeMobileSearchInput}
          onClickMobileSearchBtn={this.onClickMobileSearchBtn}
        />
        <div className="jobs-section-container">
          <div className="search-bar-container">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              className="search-input-lg"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onPressEnter}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-icon-lg-btn"
              onClick={this.getJobsList}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderingViews()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection
