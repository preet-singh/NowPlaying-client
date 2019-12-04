//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import SortOptions from '../../components/SortOptions/SortOptions';
import CreateNewThreadForm from '../../components/CreateNewThreadForm/CreateNewThreadForm';

function NewThread() {
  return(
    <div className="NewThread">
        <Header />
        <Directory />
        <SortOptions />
        <main>
          <CreateNewThreadForm />
        </main>
    </div>
  );
}

export default NewThread;