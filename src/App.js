import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Home from './components/Home';

// ABIs
import TransferCertification from './abis/TransferCertification.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';
import logo from './assets/logo512.png';

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const transferCertification = new ethers.Contract(config[network.chainId].transferCertification.address, TransferCertification, provider)
    const totalSupply = await transferCertification.totalSupply()
    const homes = []

    for (var i = 1; i <= totalSupply; i++) {
      const uri = await transferCertification.tokenURI(i)
      console.log(uri)
      // const response = await fetch(uri)
      // const metadata = await response.json()
      homes.push("")
    }

    setHomes(homes)

    const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
    setEscrow(escrow)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const togglePop = (home) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Banner />

      <div className='cards__section'>

        <h3>Services For You</h3>

        <hr />

        <div className='cards'>

            <div className='card' onClick={() => togglePop(home)}>
              <h3>Money Transfer(Multi-currency)</h3>
              <div className='card__info'>
                <h4>{1} ETH</h4>
                <p>
                  <strong>{1}</strong> bds |
                  <strong>{1}</strong> ba |
                  <strong>{1}</strong> sqft
                </p>
                <p>{1}</p>
              </div>
            </div>

            <div className='card' onClick={() => togglePop(home)}>
              <h3>Exchange for ETH</h3>
              <div className='card__info'>
                <h4>{1} ETH</h4>
                <p>
                  <strong>{1}</strong> bds |
                  <strong>{1}</strong> ba |
                  <strong>{1}</strong> sqft
                </p>
                <p>{1}</p>
              </div>
            </div>

            <div className='card' onClick={() => togglePop(home)}>
              <h3>Lending</h3>
              <div className='card__info'>
                <h4>{1} ETH</h4>
                <p>
                  <strong>{1}</strong> bds |
                  <strong>{1}</strong> ba |
                  <strong>{1}</strong> sqft
                </p>
                <p>{1}</p>
              </div>
            </div>
        </div>

      </div>

      {toggle && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
      )}

    </div>
  );
}

export default App;
