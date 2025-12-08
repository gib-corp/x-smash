import Layout from './layouts/Layout'
import Cursor from './components/Cursor/Cursor'
import Coin from './components/Coin/Coin'
import CharacterGrid from './components/CharacterGrid/CharacterGrid'
import { CursorProvider } from './contexts/CursorContext'
import characters from './data/data.json'

function App() {

  return (
    <CursorProvider>
      <Layout>
        <Cursor/>
        <Coin />
        <CharacterGrid characters={characters} />
      </Layout>
    </CursorProvider>
  )
}

export default App
