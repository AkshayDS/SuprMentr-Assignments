import React, { useState } from 'react';
import './FolderTree.css';

// Dummy nested JSON array representing a file system
export const fileSystemData = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'FolderTree.jsx', type: 'file' },
          { name: 'FolderTree.css', type: 'file' },
          { name: 'Header.jsx', type: 'file' },
        ],
      },
      { name: 'App.jsx', type: 'file' },
      { name: 'index.jsx', type: 'file' },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'vite.svg', type: 'file' },
      { name: 'robots.txt', type: 'file' },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'README.md', type: 'file' },
];

/**
 * Recursive FolderTree component that renders a file system hierarchy.
 * It prevents infinite loops because it only calls itself for children
 * that are explicitly defined in the data structure, meaning the recursion
 * naturally stops when it reaches leaf nodes (files) or empty folders.
 */
const FolderTree = ({ data }) => {
  return (
    <div className="folder-tree-root">
      {data.map((item, index) => (
        <TreeNode key={index} node={item} />
      ))}
    </div>
  );
};

/**
 * TreeNode represents an individual file or folder.
 * It recursively renders FolderTree for its children if expanded.
 */
const TreeNode = ({ node }) => {
  // Toggle state is managed individually for each TreeNode instance.
  // By default, the folder is collapsed (isOpen = false).
  // When clicked, setIsOpen flips the boolean value, causing a re-render
  // of this specific sub-tree to show or hide the children.
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = node.type === 'folder';

  const handleToggle = (e) => {
    e.stopPropagation(); // Prevent parent folders from toggling when a child is clicked
    if (isFolder) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="tree-node">
      <div 
        className={`node-content ${isFolder ? 'folder' : 'file'}`} 
        onClick={handleToggle}
      >
        <span className="node-icon">
          {isFolder ? (isOpen ? '📂' : '📁') : '📄'}
        </span>
        <span className="node-name">{node.name}</span>
      </div>

      {/* Recursive rendering: 
          If the node is a folder, is currently open, and has children,
          we render another FolderTree inside this node, passing the children.
          The visual indentation is handled by CSS on the .tree-children container. */}
      {isFolder && isOpen && node.children && (
        <div className="tree-children">
          <FolderTree data={node.children} />
        </div>
      )}
    </div>
  );
};

export default FolderTree;
