import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormPickerEnum } from '../common/enums/formPickerEnum';
import Addform from './Addform';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  'flex-direction': 'column',
};

interface AddModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formPicker: FormPickerEnum;
  setIsFetchData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableModal = ({
  open,
  setOpen,
  formPicker,
  setIsFetchData,
}: AddModalProps) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ justifyContent: 'center', display: 'flex' }}
          >
            {formPicker === FormPickerEnum.ADD ? 'Add Item' : 'Edit Item'}
          </Typography>
          <Addform setIsFetchData={setIsFetchData} />
        </Box>
      </Modal>
    </div>
  );
};
