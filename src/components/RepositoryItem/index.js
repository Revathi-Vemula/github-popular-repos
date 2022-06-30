import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails

  return (
    <li className="repo-content-container">
      <img src={avatarUrl} className="avatar-img" alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="insights">
        <div className="insight-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="insight-image"
            alt="stars"
          />
          <p className="insight-count">{starsCount} stars</p>
        </div>
        <div className="insight-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="insight-image"
            alt="forks"
          />
          <p className="insight-count">{forksCount} forks</p>
        </div>
        <div className="insight-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="insight-image"
            alt="open issues"
          />
          <p className="insight-count">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
