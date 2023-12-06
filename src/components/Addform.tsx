import * as React from 'react';
import { Box, styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Input as BaseInput, InputProps, inputClasses } from '@mui/base/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createOne } from '../services/items';
import { getGroupData } from '../services/group';
import { Select } from '@mantine/core';

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[600] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const InputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
);

const IconButton = styled(Button)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[700]};
  `
);

const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { slots, ...other } = props;
  return (
    <BaseInput
      slots={{
        root: InputRoot,
        input: InputElement,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

const dropDownStyle = {
  dropdown: { zIndex: 9999 },
};

interface valueState {
  name: string;
  email: string;
  username: string;
  password: string;
  showPassword: boolean;
  groupId: number;
}

interface State {
  value: valueState;
  groupData: GroupData[];
}

export interface GroupData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: any;
  accountId: number;
  categoryId: number;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: any;
  groups: any;
}

function Addform({
  setIsFetchData,
}: {
  setIsFetchData: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, setValues] = React.useState<State>({
    value: {
      name: '',
      email: '',
      username: '',
      password: '',
      showPassword: false,
      groupId: 0,
    },
    groupData: [],
  });

  const handleChange = (event: any, prop: keyof valueState) => {
    if (prop === 'groupId') {
      const index = state.groupData.findIndex((group) => group.name === event);
      setValues({
        ...state,
        value: {
          ...state.value,
          groupId: state.groupData[index].id,
        },
      });
    } else {
      setValues({
        ...state,
        value: { ...state.value, [prop]: event.target.value },
      });
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...state,
      value: {
        ...state.value,
        showPassword: !state.value.showPassword,
      },
    });
  };

  const handleSave = async () => {
    if ((state.value.username || state.value.email) && state.value.password) {
      const res = await createOne(state.value);
      if (res) {
        setIsFetchData((prev) => !prev);
      } else {
        console.log('Error');
      }
    }
  };
  console.log(7777, state.value);

  React.useEffect(() => {
    const fetchGroupData = async () => {
      const res = await getGroupData();

      if (res) {
        setValues((prev) => {
          return {
            value: prev.value,
            groupData: res,
          };
        });
      } else {
        console.log('Error');
      }
    };
    fetchGroupData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column' },
          gap: 2,
        }}
      >
        <div style={{ marginTop: '30px' }}>Group</div>
        <Select
          // label="Your favorite library"
          placeholder="Pick value"
          data={state.groupData && state.groupData.map((data) => data.name)}
          searchable={true}
          styles={dropDownStyle}
          onChange={(e) => handleChange(e, 'groupId')}
        />
        <div>Name</div>
        <Input
          id="outlined-start-adornment"
          onChange={(e) => handleChange(e, 'name')}
        />
        <div>Email</div>
        <Input
          id="outlined-start-adornment"
          onChange={(e) => handleChange(e, 'email')}
        />
        <div>Username</div>
        <Input
          id="outlined-start-adornment"
          onChange={(e) => handleChange(e, 'username')}
        />
        <div>Password</div>
        <Input
          id="outlined-adornment-password"
          type={state.value.showPassword ? 'text' : 'password'}
          value={state.value.password}
          onChange={(e) => handleChange(e, 'password')}
          endAdornment={
            <InputAdornment>
              <IconButton
                size="small"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
              >
                {state.value.showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </>
  );
}

export default Addform;
