import { GameManager } from './store/game-manager';
import { PlayArea } from './components/wordle-play-area';
import { KeyboardLayout } from './components/keyboard-layout';
import { TitleComponent } from './components/title';
import './App.css';
import { observer, Provider } from 'mobx-react';
import { FlagContainer } from './components/flag-container';
import { useEffect } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';

const FlagGuesser = observer((({store}:{store: GameManager}) => {
  const {solution} = store;

  useEffect(() => {
    store.init();
  }, []);

  console.log('___solution', solution);

  if(!solution){
    return null;
  }

  return (
    <Provider store={store}>
      <div className='wordle-main'>
        <ReplayIcon className='restart-icon' onClick={store.restart}/>
        <TitleComponent />
        <FlagContainer code={store.solutionCode}/>
        <PlayArea/>
        <KeyboardLayout/>
      </div>
    </Provider>
  )

}));
export default function App() {
  const store = new GameManager();
  return <div><FlagGuesser store={store}/></div>;
}
     