type ErrorMessageProps = {
  error?: string | null
}

/** エラーメッセージ表示部 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    error && (
      <div className='error-message'>
        ⚠️ {error}
      </div>
    )
  )
}
