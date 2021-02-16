import React from 'react'
import { Navigator, Screen, ScreenHelmet, useNavigator } from 'karrotframe'

const App: React.FC = () => {
  return (
    <Navigator>
      <Screen path="/" component={Home} />
      <Screen path="/page1" component={Page1} />
      <Screen path="/page2" component={Page2} />
    </Navigator>
  )
}

const Home: React.FC = () => {
  const { push } = useNavigator()

  return (
    <div style={{ padding: '1rem' }}>
      <ScreenHelmet title="Welcome" />
      Welcome to Karrotframe :)
      <br />
      <br />
      <button
        onClick={() => {
          push('/page1')
        }}
      >
        Go to Page1
      </button>
      <br />
      <button
        onClick={() => {
          push('/page2')
        }}
      >
        Go to Page2
      </button>
    </div>
  )
}

const Page1: React.FC = () => {
  const [title, setTitle] = React.useState('Page 1')
  const left = React.useMemo(() => {
    return <div>left</div>
  }, [])
  return (
    <>
      <ScreenHelmet title={title} appendLeft={left}/>
      Page 1
      <button onClick={() => {
        setTitle('pageeeeee')
      }}>change title</button>
    </>
  )
}

const Page2: React.FC = () => {
  return (
    <>
      <ScreenHelmet title="Page 2" />
      Page 2
    </>
  )
}

export default App
