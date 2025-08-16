type ErrorMessageProps = {
  error: string
}

/** エラーメッセージ表示部 */
export const ErrorMessage: React.FC<ErrorMessageProps> = props => {
  return (
    props.error && (
      <div className='error-message'>
        ⚠️ {props.error}
      </div>
    )
  )
}
