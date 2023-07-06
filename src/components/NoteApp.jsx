import React, { useEffect, useState } from 'react';
import './NoteApp.css'; // You can define your CSS styles in this file
import Modal from './Modal';
import Notes from './Notes.jsx';
import bg from '../image/mainbg.png'
import lock from '../image/lock.png'

const NoteApp = () => {

  const [selectedGroup, setSelectedGroup] = useState(null); // Keeps track of the currently selected group
  const [groups, setGroups] = useState([]);

  useEffect(async () => {
    // Define the setGroups function
    async function fetchGroups() {
      var storedGroups = localStorage.getItem('groups');

      if (storedGroups) {
        var groups = await JSON.parse(storedGroups);
        setGroups(groups)
      } else {
        console.log('No groups found in local storage');
      }
    }

    // Call the setGroups method within the useEffect hook
    await fetchGroups();
  }, []); // Empty dependency array to run the effect only once on mount


  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };
  console.log(groups);
  return (
    <div className="note-app">
      <div className="group-list">
        <Modal setGroups={setGroups} groups={groups} />
        {groups.map((group) => (
          <div
            key={group.id}
            className={`group-item ${selectedGroup === group ? 'selected' : ''}`}
            onClick={() => handleGroupClick(group)}
          >
            <div className='group-icon' style={{ "backgroundColor": group.color }}>{group.groupName.slice(0, 2).toUpperCase()}</div>
            <h3 style={{ "margin": "0px" }}>{group.groupName}</h3>
          </div>
        ))}
      </div>


      <div style={{ backgroundColor: " #f7ecdc" }} className="note-list">
        {selectedGroup ? (
          <Notes selectedGroup={selectedGroup} groups={groups} setGroups={setGroups} />
          // console.log(selectedGroup)
        ) : (
          <div>
            <img style={{ height: "350px", marginLeft: "300px", marginTop: "70px" }} src={bg} alt="bg" />
            <p style={{ fontSize: "2.2rem", marginLeft: "550px", fontWeight: "500", marginTop: "-20px" }}>Pocket Notes</p>
            <p className='Notes-down'>Send and receive messages without keeping your phone online.</p>
            <p className='Notes-down'>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
            <p id='end'>end-to-end encrypted</p>
            <img style={{ position: "absolute", top: "92.2%", left: "50%" }} src={lock} alt="lock" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteApp;






// used for testing

    // Sample data with groups and notes
  //   const SampleGroups = [
  //     {
  //       id: 0,
  //       groupName: 'Group 1',
  //       notes: [
  //         { timestamp: '2023-06-27 10:00', note: 'Note 1' },
  //         { timestamp: '2023-06-28 14:30', note: 'Note 2' },
  //       ],
  //     },
  //     {
  //       id: 1,
  //       groupName: 'Group 2',
  //       notes: [
  //           { timestamp: '2023-06-29 09:15', note: 'Note 3' },
  //           { timestamp: '2023-06-30 16:45', note: 'Note 4' },
  //         ],
  //     },
  // ];