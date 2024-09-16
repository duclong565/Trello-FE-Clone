import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'

import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'

import { toast } from 'react-toastify'

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Column title is required')
      return
    }
    // console.log(newColumnTitle)
    //call API to add new column

    //reset form and close new cloumn state
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  /**
   *thằng sortableContext yêu cầu item là 1 mảng dạng ['id-1', 'id-2'] chứ không phải [{id: 'id-1'}, {id:'id-2'}]
   *nếu không đúng thì kéo thả sẽ không có animation
   */
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 2 },
        }}
      >
        {/* {columns?.map((column) => {
          return <Column key={column._id} />
        })} */}
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Box add new column */}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              borderRadius: '6px',
              mx: 2,
              height: 'fit-content',
              bgcolor: '#ffffff3d',
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              borderRadius: '6px',
              mx: 2,
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 1,
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus //ready to type
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}

              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiTextField-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid white',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main },
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                onClick={toggleOpenNewColumnForm}
                sx={{
                  color: 'white',
                  fontSize: 'small',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.main },
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
