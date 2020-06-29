import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import { listLogEntry, deleteLogEntry } from './API'
import LogEntryForm from './LogEntryForm'
import UpdateLogEntryForm from './UpdateLogEntryForm'

const App = () => {
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({})
  const [updateState, setUpdateState] = useState(false)
  const [addEntryLocation, setAddEntryLocaltion] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 10.7819886,
    longitude: 106.6809229,
    zoom: 3
  })
  const getEntries = async () => {
    const logEntries = await listLogEntry()
    setLogEntries(logEntries)
  }
  useEffect(() => {
    getEntries()
  }, [])

  const handleAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat
    setAddEntryLocaltion({
      latitude,
      longitude
    })
  }

  const handleDelete = (id) => {
    deleteLogEntry(id)
  }

  const handleUpdate = (id) => {
    setUpdateState(true)
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onDblClick={handleAddMarkerPopup}
      >
        {logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  [entry._id]: true
                })}>
                <svg
                  className="marker red"
                  style={{
                    height: `${4 * viewport.zoom}px`,
                    width: `${4 * viewport.zoom}px`,
                  }}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  achor="top"
                >
                  <div className="popup">
                    {updateState ? (
                      <UpdateLogEntryForm id={entry._id} onClose={() => {
                        setUpdateState(false)
                        getEntries()
                      }}/>
                    ) : (
                        <>
                          <h3>{entry.title}</h3>
                          <p>{entry.comments}</p>
                          <p>Visited on: {new Date(entry.visitDate).toLocaleString()}</p>
                          {entry.image && <img src={entry.image} alt={entry.title} />}
                          <button onClick={handleUpdate.bind(this, entry._id)}>Update</button>
                          <button onClick={handleDelete.bind(this, entry._id)}>Delete</button>
                        </>
                      )}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))}
        {
          addEntryLocation ? (
            <React.Fragment>
              <Marker
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
              >
                <div>
                  <svg
                    className="marker yellow"
                    style={{
                      height: `${4 * viewport.zoom}px`,
                      width: `${4 * viewport.zoom}px`,
                    }}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </Marker>
              <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setAddEntryLocaltion(null)}
                achor="top"
              >
                <div className="popup">
                  <LogEntryForm
                    location={addEntryLocation}
                    onClose={() => {
                      setAddEntryLocaltion(null)
                      getEntries()
                    }}
                  />
                </div>
              </Popup>)
            </React.Fragment>
          ) : null
        }
      </ReactMapGL>
    </div>
  )
}

export default App