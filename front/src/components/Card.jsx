import { useState } from "react"
import { useEffect } from "react"
import './Card.css';

export default function Card(props) {
  
  const [name, setName] = useState(props.name || [])
  const [id, setId] = useState(props.id || [])

  function deleteCard() {
   
  }

  return <div className="container-card">
    {name}
  </div>
}