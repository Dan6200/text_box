import '../UI/App.css';
import TextBox from './TextBox.js'

function App() {
	const TEST = (
		<div id="Test">
			abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
		</div>
	)
  return (
    <div className="App">
			{TEST}
        <TextBox />
   </div>
  );
}

export default App;
