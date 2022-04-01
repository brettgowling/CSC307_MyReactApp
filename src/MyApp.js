import React from 'react'
import Table from './Table'

const characters = [
    {
      name: 'Charlie',
      job: 'Janitor',
    },
    {
      name: 'Mac',
      job: 'Bouncer',
    },
    {
      name: 'Dee',
      job: 'Aspring actress',
    },
    {
      name: 'Dennis',
      job: 'Bartender',
    },
    {
        name: 'Brett',
        job: 'Software Engineer'
    },
    {
        name: 'David - The Vanquisher - Leaman',
        job: 'Vanquisher'
    }
];

function MyApp() {
  return (
    <div className="container">
      <Table characterData={characters} />
    </div>
  );  
}

export default MyApp;