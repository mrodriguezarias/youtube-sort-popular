import { useMemo } from "react"
import Table from "./Table"
import data from "./data"

import "./App.css"

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Thumbnail",
        accessor: "thumbnail",
        Cell: ({value}) => (
          <img width="336" height="188" src={value} alt="" />
        ),
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({value, row: {original}}) => (
          <a href={original.url} target="_blank" rel="noreferrer">
            <strong>{value}</strong>
          </a>
        ),
      },
      {
        Header: "ID",
        accessor: "url",
        Cell: ({value}) => {
          const id = value.replace("https://www.youtube.com/watch?v=", "")
          return <button onClick={async () => {
            await navigator.clipboard.writeText(id)
          }}>{id}</button>
        },
      },
      {
        Header: "Views",
        accessor: "views",
        Cell: ({value}) => (
          new Intl.NumberFormat().format(value)
        ),
      },
    ],
    []
  )

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App
