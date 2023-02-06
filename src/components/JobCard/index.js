import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {HiMail} from 'react-icons/hi'
import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyImageUrl,
    title,
    rating,
    employmentType,
    location,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`} className="job-card-nav-link">
      <li className="job-card-container">
        <div className="job-item-logo-container">
          <img
            src={companyImageUrl}
            alt="company logo"
            className="job-card-company-image"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar size="20" color="gold" className="star-icon" />
              <p className="card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-location-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="employment-container">
            <HiMail className="email-icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-card-description-heading">description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
