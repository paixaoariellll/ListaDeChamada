import React, { useState } from 'react'
import Layout from '../components/Layout'
import db from '../utils/db';
import Clas from '../models/Clas';
import ClassesItem from '../components/ClassesItem';

function Presence({ classes }) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchHandler = () => {
    const filteredRegisters = classes.filter((clas) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return clas.className.toLowerCase().includes(searchTermLowerCase);
    });
    return filteredRegisters;
  };

  const filteredClasses = searchHandler();

  return (
    <Layout title="Disciplinas">
      <div className='card mb-5'>
        <h2 className='text-center font-extrabold w-full text-[#b02222] uppercase'>Disciplinas - ADS</h2>
      </div>
      <div className='flex items-center gap-x-5 justify-center'>
        <div>
          <input
            type="text"
            placeholder="Nome da matéria"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 my-5 border border-[#b02222] rounded-md w-auto" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredClasses.map((clas) => (
          <ClassesItem
            clas={clas}
            key={clas._id}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const classes = await Clas.find().lean();
  return {
    props: {
      classes: classes.map(db.convertDocToObject),
    },
  };
}

export default Presence;
