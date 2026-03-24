import React from 'react';
import FolderTree, { fileSystemData } from './FolderTree';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Folder Architect</h1>
        <p>Interactive Recursive File Explorer</p>
      </header>
      
      <main className="tree-container">
        <FolderTree data={fileSystemData} />
      </main>
    </div>
  );
}

export default App;
