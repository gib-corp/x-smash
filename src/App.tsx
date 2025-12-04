import Layout from './layouts/Layout'
import Cursor from './components/Cursor/Cursor'
import CharacterGrid from './components/CharacterGrid/CharacterGrid'
import characters from './data/data.json'

function App() {

  return (
    <Layout>
      <Cursor cursorType={"drop"}/>
      <CharacterGrid characters={characters} />
    </Layout>
  )
}

export default App
