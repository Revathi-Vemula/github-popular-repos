import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickFilterItem, isActive} = props
  const {id, language} = languageDetails

  const buttonStyleClassName = isActive ? 'active-btn-class' : ''

  const setActiveFilterId = () => {
    onClickFilterItem(id)
  }

  return (
    <li className="language-item">
      <button
        type="button"
        className={`btn ${buttonStyleClassName}`}
        onClick={setActiveFilterId}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
