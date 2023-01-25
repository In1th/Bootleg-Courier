/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useStore } from "../hooks/useStore";
import { Card } from "@mui/material";

export const TabsView = observer(() => {
    
    const {orderStore} = useStore();

    if (true){
      return (
      <p>
        Loading . . .
      </p>);
    }

    const rows = (orderStore.orders).map((o, i) => {
        return {id: i, name: o.name, approved: o.approved, date: o.deliveryTime};
    })

    return (

    <div css={css`
            width: 100vw;
            height: 93vh;
        `}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection />
    </div>
    )
});


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Order name',
      width: 150,
      editable: true,
    },
    {
      field: 'approved',
      headerName: 'Approved',
      type: 'boolean',
      width: 110,
      editable: true,
    },
    {
        field: 'deliveryTime',
        headerName: 'Delivery Time',
        type: 'date',
        width: 110,
        editable: true,
    },

  ];