import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {HiMail} from 'react-icons/hi'
import {RiExternalLinkFill} from 'react-icons/ri'
import Headers from '../Headers'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const fetchedJobDetails = data.job_details
      const fetchedSimilarJobs = data.similar_jobs

      const updatedJobDetails = {
        companyLogoUrl: fetchedJobDetails.company_logo_url,
        companyWebsiteUrl: fetchedJobDetails.company_website_url,
        employmentType: fetchedJobDetails.employment_type,
        id: fetchedJobDetails.id,
        jobDescription: fetchedJobDetails.job_description,
        location: fetchedJobDetails.location,
        rating: fetchedJobDetails.rating,
        packagePerAnnum: fetchedJobDetails.package_per_annum,
        title: fetchedJobDetails.title,
        skills: fetchedJobDetails.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        lifeAtCompany: {
          description: fetchedJobDetails.life_at_company.description,
          imageUrl: fetchedJobDetails.life_at_company.image_url,
        },
        similarJobs: fetchedSimilarJobs.map(item => ({
          id: item.id,
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          jobDescription: item.job_description,
          location: item.location,
          rating: item.rating,
          title: item.title,
        })),
      }

      this.setState({
        jobDetails: updatedJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderingJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
      similarJobs,
    } = jobDetails

    console.log(similarJobs)

    return (
      <div className="job-item-container">
        <div className="job-card">
          <div className="job-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-card-logo"
            />
            <div>
              <h1 className="job-card-title">{title}</h1>
              <div className="job-card-rating-container">
                <AiFillStar color="gold" size="18" />
                <p className="job-card-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-card-location-employment-type-container">
            <div className="card-location-container">
              <MdLocationOn color="#ffffff" size="20" />
              <p className="job-card-location">{location}</p>
            </div>
            <div className="card-employment-type-container">
              <HiMail size="25" color="#ffffff" />
              <p className="job-card-employment-type">{employmentType}</p>
            </div>
            <p className="job-card-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-item-description-container">
            <h1 className="job-card-description">Description</h1>
            <a href={companyWebsiteUrl} className="visit-container">
              <p className="visit">Visit</p>
              <RiExternalLinkFill />
            </a>
          </div>
          <p className="card-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(item => (
              <li key={item.name} className="skill-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="skill-image"
                />
                <p className="skill-name">{item.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="company-about">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-cards-list">
          {similarJobs.map(eachItem => (
            <SimilarJobItem similarJobDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderingLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderingFailureView = () => (
    <div className="job-item-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-view-image"
      />
      <h1 className="job-item-failure-view-heading">
        Oops! Something Went Wrong!
      </h1>
      <p className="job-item-failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderingViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingJobDetails()
      case apiStatusConstants.failure:
        return this.renderingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderingLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Headers />
        <div className="job-item-details-container">
          {this.renderingViews()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
