import { toast } from 'react-toastify'
import { ClientError } from 'scrivito'

export function errorToast(title: string, error: unknown): void {
  toast.error(
    <>
      <div>{title}</div>
      {error instanceof ClientError ? (
        <>
          <div className="text-small">{error.message}</div>
          <pre className="text-small text-muted">
            {JSON.stringify(error.details, null, 1)}
          </pre>
        </>
      ) : (
        <div className="text-small">{JSON.stringify(error, null, 1)}</div>
      )}
    </>,
    {
      autoClose: false,
    },
  )
}
