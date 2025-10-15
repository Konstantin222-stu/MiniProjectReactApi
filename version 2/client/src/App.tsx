import type React from 'react'
import AppRouter from './router/AppRouter'
import Footer from './section/footer/Footer'
import Header from './section/header/Header'

function App(): React.JSX.Element {
  return (
    <>
      <Header/>
      <AppRouter/>
      <Footer/>
    </>
  );
}

export default App
