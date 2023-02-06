import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'
import './index.css'

let inputValue

const FilteringGroups = props => {
  const getEmploymentTypesList = () => {
    const {employmentTypesList, onChangeEmploymentType} = props
    return employmentTypesList.map(empType => {
      const changeEmployment = () => {
        onChangeEmploymentType(empType.employmentTypeId)
      }

      return (
        <li className="employment-type-item" key={empType.employmentTypeId}>
          <input
            id={empType.employmentTypeId}
            type="checkbox"
            className="check-box"
            onClick={changeEmployment}
          />
          <label
            htmlFor={empType.employmentTypeId}
            className="employment-label"
          >
            {empType.label}
          </label>
        </li>
      )
    })
  }

  const getSalaryRangesList = () => {
    const {salaryRangesList, onChangeSalaryRange} = props
    return salaryRangesList.map(item => {
      const changeSalary = () => {
        onChangeSalaryRange(item.salaryRangeId)
      }

      return (
        <li className="employment-type-item" key={item.salaryRangeId}>
          <input
            type="radio"
            name="salary"
            className="radio-btn"
            onClick={changeSalary}
            id={item.salaryRangeId}
          />
          <label className="salary-label" htmlFor={item.salaryRangeId}>
            {item.label}
          </label>
        </li>
      )
    })
  }

  const renderingEmploymentTypesList = () => (
    <div>
      <h1 className="type-of-employment-heading">Type of Employment</h1>
      <ul className="employment-type-list">{getEmploymentTypesList()}</ul>
    </div>
  )

  const renderingSalaryList = () => (
    <div>
      <h1 className="salary-heading">Salary ranges</h1>
      <ul className="salary-list">{getSalaryRangesList()}</ul>
    </div>
  )

  const changeMobileSearchInput = event => {
    inputValue = event.target.value
    if (event.key === 'Enter') {
      const {onChangeMobileSearchInput} = props
      onChangeMobileSearchInput(event.target.value)
    }
  }

  const clickSearchBtn = () => {
    const {onClickMobileSearchBtn} = props
    onClickMobileSearchBtn(inputValue)
  }

  return (
    <div className="filtering-groups-container">
      <div className="search-bar-container-mobile">
        <input
          type="search"
          placeholder="Search"
          className="search-input-mobile"
          onKeyDown={changeMobileSearchInput}
        />

        <button
          type="button"
          data-testid="searchButton"
          className="search-icon-mobile-btn"
          onClick={clickSearchBtn}
        >
          <BsSearch size="20" className="search-icon" />
        </button>
      </div>
      <ProfileDetails />
      <hr />
      {renderingEmploymentTypesList()}
      <hr />
      {renderingSalaryList()}
    </div>
  )
}

export default FilteringGroups
