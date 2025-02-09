interface TableProps {
  headers: string[];
  rows: (string | number)[][];
  leftAlignedColumn?: boolean;
}

export const Table = ({
  headers,
  rows,
  leftAlignedColumn = false,
}: TableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={header}
              className={`${
                index === 0 && leftAlignedColumn ? "text-left" : "text-center"
              }`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={`${rowIndex}-${cellIndex}`}
                className={`
                    ${
                      cellIndex === 0 && leftAlignedColumn
                        ? "text-left text-blue-600"
                        : "text-center"
                    }
                    ${typeof cell === "number" ? "font-medium" : ""}
                  `}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
