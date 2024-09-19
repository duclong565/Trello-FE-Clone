import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
} from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //now we use fixed board id for testing, later we will get it from route params using react-router-dom
    const boardId = '66eb955095fd6b8e0d3047d9'

    //call API to fetch board details
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  // CAll API to create new column and update board state
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    console.log('createdColumn:', createdColumn)

    //update board state
  }


  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({ 
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard:', createdCard)

    //update board state
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  )
}

export default Board
