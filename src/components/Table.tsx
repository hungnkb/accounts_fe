import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "number", headerName: "STT", width: 90 },
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "parentGroup",
    headerName: "Parent Group",
    width: 150,
    editable: true,
  },
  {
    field: "group",
    headerName: "Group",
    width: 150,
    editable: true,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 110,
    editable: true,
  },
  {
    field: "password",
    headerName: "Password",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const rows = [
  {
    number: 1,
    parentGroup: "123",
    group: "Snow",
    username: "Jon",
    email: 35,
    password: "123",
    id: 1,
  },
  {
    number: 2,
    parentGroup: "123",
    group: "Lannister",
    username: "Cersei",
    email: "42",
    password: "123",
    id: 2,
  },
  {
    number: 3,
    parentGroup: "123",
    group: "Lannister",
    username: "Jaime",
    email: "45",
    password: "123",
    id: 3,
  },
  {
    number: 4,
    parentGroup: "123",
    group: "Stark",
    username: "Arya",
    email: "16",
    password: "123",
    id: 4,
  },
  {
    number: 5,
    parentGroup: "123",
    group: "Targaryen",
    username: "Daenerys",
    email: "null",
    password: "123",
    id: 5,
  },
  {
    number: 6,
    parentGroup: "123",
    group: "Melisandre",
    username: null,
    email: "150",
    password: "123",
    id: 6,
  },
  {
    number: 7,
    parentGroup: "123",
    group: "Clifford",
    username: "Ferrara",
    email: "44",
    password: "123",
    id: 7,
  },
  {
    number: 8,
    parentGroup: "123",
    group: "Frances",
    username: "Rossini",
    email: "36",
    password: "123",
    id: 8,
  },
  {
    number: 9,
    parentGroup: "123",
    group: "Roxie",
    username: "Harvey",
    email: "65",
    password: "123",
    id: 9,
  },
];

export default function Table() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
      />
    </Box>
  );
}
