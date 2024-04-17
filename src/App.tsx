import { MantineProvider } from '@mantine/core';
import wineData from './Wine-Data';
import Statistics from './Statistics';



const App = () => {
 const transformedData = wineData.map((wine : any) => {
  return {...wine,Gamma : (wine.Ash * wine.Hue)/wine.Magnesium};
 });
 
 

  return (
    <MantineProvider>
      <div>
        <h1>Flavanoids Based Calculations</h1>
        <Statistics wineData={wineData} field = 'Flavanoids'/>
      </div>
      <div>
        <h1>Gamma Based Calculations</h1>
        <Statistics wineData={transformedData} field = 'Gamma'/>
      </div>
    </MantineProvider>
  );
};

export default App;
