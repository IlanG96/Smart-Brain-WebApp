let counter =1;

export const COLUMN = [
    {
      Header: "Num",
      Footer: "Num",
      accessor: "id"
    },
  
    {
      Header: "Full Name",
      Footer: "Full Name",
      accessor: "name",
      getProps: (state, rowInfo, column) => {
        return {
          style: {
            background:
              rowInfo && rowInfo.row.first_name === "Neddy" ? "red" : null
          }
        };
      }
    },
  
    {
      Header: "Similarity Percentage",
      Footer: "Similarity Percentage",
      accessor: "percentage"
    },
  ];
  