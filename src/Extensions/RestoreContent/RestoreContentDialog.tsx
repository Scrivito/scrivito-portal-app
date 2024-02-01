import { useEffect, useState } from 'react'
import { registerComponent } from 'scrivito'
import { Instructions } from './SubComponents/Instructions'
import { Log } from './SubComponents/Log'
import { restoreContent } from './restoreContent'

registerComponent('RestoreContent', () => {
  const [apiClientId, setApiClientId] = useState(
    '970c471327bb44e0a905207cf3ffd6f0',
  )
  const [apiClientSecret, setApiClientSecret] = useState(
    'v+p2a/prEoulnTmVlokE4zw4XW0qkEXcNkeGGoXMlzGrs5RGgq94M7Hyf8nT10tQ',
  )
  const [details, setDetails] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [logText, setLogText] = useState('')
  const [progress, setProgress] = useState([0, 0])

  function log({
    text,
    count,
    step,
  }: {
    text?: string
    count?: number
    step?: string[]
  }) {
    if (count !== undefined || step) setDetails(step?.join(' ') || '')
    if (count !== undefined) setProgress([0, count])
    if (step) setProgress(([current, count]) => [current + 1, count])
    if (text) setLogText((log) => (!log ? text : `${log}\n${text}`))
  }

  useEffect(() => {
    if (isRunning) {
      restoreContent({ apiClientId, apiClientSecret, log })
    }
  }, [apiClientId, apiClientSecret, isRunning])

  return (
    <div className="scrivito_detail_content">
      <Instructions />
      <form>
        <table className="scrivito_notice_body">
          <tbody>
            <tr>
              <th align="right">Client ID</th>
              <td>
                <input
                  autoComplete="off"
                  disabled={isRunning}
                  onChange={({ target: { value } }) => setApiClientId(value)}
                  size={50}
                  type="text"
                  value={apiClientId}
                />
              </td>
            </tr>
            <tr>
              <th align="right">Client secret</th>
              <td>
                <input
                  autoComplete="off"
                  disabled={isRunning}
                  onChange={({ target: { value } }) =>
                    setApiClientSecret(value)
                  }
                  size={50}
                  type="password"
                  value={apiClientSecret}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          disabled={!apiClientId || !apiClientSecret || isRunning}
          onClick={() => setIsRunning(true)}
          type="submit"
        >
          Restore content
        </button>
      </form>
      <Log
        text={logText}
        progress={progress[1] ? `${progress[0]} of ${progress[1]}` : ''}
        details={details}
      />
    </div>
  )
})
