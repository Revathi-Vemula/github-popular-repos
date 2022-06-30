import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  failed: 'FAILED',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLangId: 'ALL',
    apiStatus: apiStatusConstants.initial,
    fetchedReposList: [],
  }

  componentDidMount() {
    this.getRepositories()
  }

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="failure-view-image"
    />
  )

  renderLoader = () => (
    <div className="repo-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getRepositories = async () => {
    const {activeLangId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLangId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const fetchedPopularRepos = fetchedData.popular_repos

      const formattedPopularRepos = fetchedPopularRepos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        fetchedReposList: formattedPopularRepos,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositories = () => {
    const {fetchedReposList} = this.state

    return (
      <ul className="repos-list-container">
        {fetchedReposList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  onClickFilterItem = filterId => {
    this.setState({activeLangId: filterId}, this.getRepositories)
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositories()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {activeLangId} = this.state

    return (
      <div className="popular-repo-container">
        <h1 className="heading">Popular</h1>

        <ul className="filter-items-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageDetails={eachItem}
              key={eachItem.id}
              onClickFilterItem={this.onClickFilterItem}
              isActive={eachItem.id === activeLangId}
            />
          ))}
        </ul>

        <div className="repo-body-container">{this.renderView()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
