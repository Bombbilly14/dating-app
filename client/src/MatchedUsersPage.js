import React, { useEffect, useState } from 'react'
import MatchedCards from './MatchedCards.js'
import RequestedMatch from './RequestedMatch.js';
import './styles/MatchedUsers.css'
function MatchedUsersPage({ me }) {
  const [connections, setUserConnections] = useState([])
  const [receivedConnections, setReceivedConnections] = useState([])
  const [acceptedConnectionId, setAcceptedConnectionId] = useState(null);
  useEffect(() => {
    fetch(`/connections?recipient_id=${me.id}&accepted=nil`)
      .then(response => response.json())
      .then(connections => {
        const receivedConnection = connections.filter(connection => connection.recipient_id === me.id && connection.accepted === null);
        setReceivedConnections(receivedConnection);
      });
  }, [me.id, acceptedConnectionId]);

  const pendingConnections = receivedConnections.map((connection, index) => {
    return (
      <RequestedMatch connection={connection} key={index} me={me} receivedConnections={receivedConnections} setReceivedConnections={setReceivedConnections} setAcceptedConnectionId={setAcceptedConnectionId} />
    );
  });


  useEffect(() => {
    fetch(`/connections?sender_id=${me.id}&accepted=true`)
      .then(response => response.json())
      .then(connections => {
        const userConnections = connections.filter(connection => connection.sender_id === me.id || connection.recipient_id === me.id);

        setUserConnections(userConnections);
      });
  }, [me.id, acceptedConnectionId]);
  

  const users = connections.filter(connection => connection.accepted === true).map((connection, index) => {
    return (
      <MatchedCards connection={connection} key={index} me={me} />
    );
  });
  return (
    <>
    <div className='pending-connections-header'>
        {receivedConnections.length > 0 ? (
          <h2>Pending connections</h2>
        ) : (
          <h4>No pending connections. Check back later for sent connections.</h4>
        )}
      </div>
    <div className='pending-card'>
        {pendingConnections}
    </div>
    < hr className='separator' />
      <div className='matched-container'>
        {users}
      </div>
    </>
  )
}

export default MatchedUsersPage