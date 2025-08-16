type HeaderProps = {
  lastUpdated: string | null
}

/** ヘッダー */
export const Header:React.FC<HeaderProps> = props => {
  const { lastUpdated } = props
  return (
      <header className='app-header'>
        <h1>💱 通貨換算ツール</h1>
        <p>リアルタイムな為替レートで計算します。</p>
        {lastUpdated && (
          <small style={{ opacity: 0.8 }}>
            最終更新: {lastUpdated}
          </small>
        )}
      </header>    
  )
}
