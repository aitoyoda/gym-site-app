import React from 'react';
import { FeaturesAsymmetrical } from '../Home/FeaturesAsymmetrical';
import FeaturesCards from '../Home/FeaturesCards';

const Home: React.FC = () => {
  return (
    <div>
        <FeaturesCards />
        <FeaturesAsymmetrical />
    </div>
  );
}

export default Home;