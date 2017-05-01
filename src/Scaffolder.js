import { exec } from 'child_process'

const GITHUB_URL = 'https://github.com'
const CACHE_DIR = '.cache'

class Scaffolder {
  execute: Function

  constructor (execute = exec, logger = console) {
    this.execute = execute
    this.logger = logger
  }

  async load (resource) {
    let url = resource
    if (!resource.includes(GITHUB_URL)) {
      url = `${GITHUB_URL}/${url}`
    }

    try {
      const name = await this._download(url)
      this.logger.log(`grabbed resource: ${name}`)

      this.execute(`cp -rf ${CACHE_DIR}/${name}/trunk/* .`, error => {
        if (error) {
          this.logger.error(error)
        } else {
          this.logger.log('copied scaffold!')
        }
      })
    } catch (error) {
      this.logger.log(`could not get resource: ${error}`)
    }
  }

  _download (url) {
    return new Promise((resolve, reject) => {
      this.execute(`mkdir -p .cache/ && cd .cache/ && svn checkout --trust-server-cert --non-interactive ${url}`, error => {
        if (error) {
          reject(error)
        } else {
          const name = url.substr(url.lastIndexOf('/') + 1)
          resolve(name)
        }
      })
    })
  }
}

export default Scaffolder
