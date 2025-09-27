import { GameManager } from './store/game-manager';
import { PlayArea } from './components/wordle-play-area';
import { KeyboardLayout } from './components/keyboard-layout';
import { TitleComponent } from './components/title';
import './App.css';
import { observer, Provider } from 'mobx-react';
import { FlagContainer } from './components/flag-container';
import { useEffect } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import { KeyboardEntryManager } from './store/keyboard-entry-manager';
import { OverlayLoader } from './components/overlay-loader';

const FlagGuesser = observer((({store}:{store: GameManager}) => {
  const {solution} = store;

  useEffect(() => {
    store.init();
  }, []);

  console.log('___solution', solution);
  

  return (
    <OverlayLoader loading={store.loading}>
      <Provider store={store}>
        <div className='wordle-main'>
          <ReplayIcon className='restart-icon' onClick={store.restart}/>
          <TitleComponent />
          <FlagContainer imageManager = {store.imageManager} code={store.solutionCode}/>
          <PlayArea/>
          <KeyboardLayout/>
        </div>
      </Provider>
    </OverlayLoader>
    
  )

}));
export default function App() {
  const store = new GameManager();
  const keyEntryManager = new KeyboardEntryManager(store);
  return <FlagGuesser store={store}/>;
}
     