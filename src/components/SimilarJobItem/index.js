import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {HiMail} from 'react-icons/hi'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  console.log(similarJobDetails)
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    jobDescription,
    location,
  } = similarJobDetails
  return (
    <li className="similar-job-card">
      <div className="similar-job-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-card-logo"
        />
        <div>
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <AiFillStar color="gold" size="20" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-icons-container">
        <div className="similar-job-icon-container">
          <MdLocationOn size="25" />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="similar-job-icon-container">
          <HiMail size="25" />
          <p className="similar-job-employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
