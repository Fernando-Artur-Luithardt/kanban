import { useState } from "react"
import { useEffect } from "react"
import './Coluna.css';

import Card from "./Card"

export default function Coluna(props) {
  
  const [cards, setCards] = useState(props.cards || [])

  function addCard() {
   
  }

  return <div className="container-coluna">
    <Card name="testeeeeeeee"/>
  </div>
}