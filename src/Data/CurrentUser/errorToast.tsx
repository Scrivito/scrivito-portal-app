import { truncate } from 'lodash-es'
import { toast } from 'react-toastify'
import { ClientError } from 'scrivito'

export function errorToast(title: string, error: unknown): void {
  const message =
    error instanceof Error ? error.message : JSON.stringify(error, null, 1)

  toast.error(
    <>
      <div>{title}</div>
      <small>{truncate(message, { length: 300, separator: /,? +/ })}</small>
      {error instanceof ClientError ? (
        <pre className="text-small text-muted">
          {JSON.stringify(error.details, null, 1)}
        </pre>
      ) : null}
    </>,
    {
      autoClose: false,
    },
  )
}
