import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import { ItemData } from '../pages/AppDashboard';
import { useEffect, useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { TableModal } from './TableModal';
import { FormPickerEnum } from '../common/enums/formPickerEnum';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Table({ data: props }: { data: ItemData[] }) {
  const [data, setData] = useState<ItemData[] | object[]>([]);
  const [open, setOpen] = useState(false);
  const [isFetchData, setIsFetchData] = useState(false);
  const [showPassword, setShowPassword] = useState(
    {} as {
      [key: string]: boolean;
    }
  );

  const handleClickShowPassword = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    setShowPassword((prev) => {
      let newStateShowPassword = {};
      if (prev[params.id]) {
        newStateShowPassword = {
          ...showPassword,
          [`${params.id}`]: !prev[`${params.id}`],
        };
      } else {
        newStateShowPassword = {
          ...showPassword,
          [`${params.id}`]: true,
        };
      }
      return newStateShowPassword;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (props.length) {
      const listData = [];
      for (const [index, item] of props.entries()) {
        listData.push({
          number: index + 1,
          id: item.id,
          group: item.group?.name,
          username: item.username,
          email: item.email,
          password: item.password ? atob(item.password) : '',
          name: item.name,
        });
      }
      setData(listData);
    }
  }, [props, isFetchData]);

  useEffect(() => {
    const showPasswordAction = () => {};
    showPasswordAction();
  });

  const handleAdd = () => {
    setOpen((pre) => !pre);
  };

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <Box
          display={'flex'}
          alignItems={'flex-end'}
          justifyContent={'space-between'}
        >
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
          <Button variant="contained" color="error">
            Remove
          </Button>
        </Box>
        <DataGrid
          rows={data}
          columns={
            [
              { field: 'number', headerName: 'STT', width: 90 },
              { field: 'id', headerName: 'ID', width: 90 },
              {
                field: 'group',
                headerName: 'Group',
                width: 150,
                editable: true,
              },
              {
                field: 'name',
                headerName: 'Name',
                width: 150,
                editable: true,
              },
              {
                field: 'username',
                headerName: 'Username',
                width: 150,
                editable: true,
              },
              {
                field: 'email',
                headerName: 'Email',
                type: 'string',
                width: 280,
                editable: true,
              },
              {
                field: 'password',
                headerName: 'Password',
                description:
                  'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
                renderCell: (params) => {
                  return (
                    <>
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword(params)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                      <div>
                        {showPassword[params.id] ? params.value : '----------'}
                      </div>
                    </>
                  );
                },
              },
            ] as GridColDef[]
          }
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={!data.length && true}
        />
      </Box>
      <TableModal
        open={open}
        setOpen={setOpen}
        formPicker={FormPickerEnum.ADD}
        setIsFetchData={setIsFetchData}
      />
    </>
  );
}
