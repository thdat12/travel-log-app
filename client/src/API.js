export async function listLogEntry(){
  const response = await fetch(`${process.env.REACT_APP_ORIGIN}/api/logs`)
  return response.json()
}

export async function createLogEntry(entry){
  const response = await fetch(`${process.env.REACT_APP_ORIGIN}/api/logs`, {
    method: 'POST',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify(entry)
  })
  return response.json()
}

export async function deleteLogEntry(id){
  const response = await fetch(`${process.env.REACT_APP_ORIGIN}/api/logs/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}

export async function getLogEntryById(id){
  const response = await fetch(`${process.env.REACT_APP_ORIGIN}/api/logs/${id}`)
  return response.json()
}

export async function updateLogEntry(id, entry){
  const response = await fetch(`${process.env.REACT_APP_ORIGIN}/api/logs/update/${id}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(entry)
  })
  return response.json()
}