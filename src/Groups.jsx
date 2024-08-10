import React, { useRef, useState, useEffect } from 'react';

const Groups = (props) => {
  const { group, setGroup, newMessage } = props;
  const inputRef = useRef();
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('groups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  function createGroup() {
    const newGroup = inputRef.current.value.trim();
    if (newGroup) {
      setGroups([...groups, { "group": newGroup }]);
      setGroup(newGroup);
      inputRef.current.value = "";
    }
  }

  const filteredGroups = groups.filter(item =>
    item.group.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className='relative border-r flex flex-col justify-between items-center w-[70%]'>
      <header className='p-2 pb-5 border-b-slate-300'>
        <h1 className='text-[36px] font-serif font-bold text-white'>Rooms</h1>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder='Find/Create room!' 
            ref={inputRef} 
            value={newMessage} 
            onChange={(e) => setFilterTerm(e.target.value)} 
            className='p-2 rounded-md font-mono font-light text-slate-600' 
          />
          <button 
            type="submit" 
            className='bg-blue-600 rounded-md p-2 text-white' 
            onClick={createGroup}
          >
            Create
          </button>
        </div>
      </header>
      <div id="groups" className='w-full flex flex-col items-around overflow-auto h-[100vh] pt-5 pb-10'>
        {filterTerm ? 
          filteredGroups.map((item, index) => (
            <button 
              key={index} 
              onClick={() => setGroup(item.group)} 
              className='border-b border-slate-500 mx-5 p-2 text-slate-300 font-bold'
            >
              {item.group}
            </button>
          ))
          : 
          groups.map((item, index) => (
            <button 
              key={index} 
              onClick={() => setGroup(item.group)} 
              className='border-b border-slate-500 mx-5 p-2 text-slate-300 font-bold'
            >
              {item.group}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Groups;
