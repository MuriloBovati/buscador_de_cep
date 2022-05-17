import './App.css';
import { FiSearch } from 'react-icons/fi'
import { useState} from 'react'
import api from './services/Api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})


  function handleChange(e){
    setInput(e.target.value)
  }

  async function handleSearch(){
    if(input === ''){
      alert('Preencha algum cep')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch {
      alert("Ops cep nao encontrado")
      setInput('')
    }
  }


  return (
    <div className="container">
      <h1 className='title' >Buscador CEP</h1>
      <div className='containerInput'>
        <input 
        type='text' 
        placeholder='Digite Seu Cep...'
        name="cep"
        onChange={handleChange}
        value={input}
        />
        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <div className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </div>
      )}
    </div>
  );
}

export default App;
