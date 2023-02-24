import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import sortImage from "../Images/Misc/sort.png"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ffc7fd",
        color: theme.palette.text.primary,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}))

export default function CustomizedTable({ headers, pokemon }) {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    width: "75%",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                aria-label="customized table"
            >
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <StyledTableCell key={header.name} align="center">
                                <div
                                    style={{
                                        display: "grid",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gridColumnGap: "5px",
                                    }}
                                >
                                    <div style={{ gridColumn: "2" }}>
                                        {header.name}
                                    </div>

                                    {header.name !== "" &&
                                    header.name !== "Types" &&
                                    header.name !== "Abilities" &&
                                    header.name !== "URL" ? (
                                        <input
                                            style={{ gridColumn: "3" }}
                                            type="image"
                                            alt="sort arrows"
                                            src={sortImage}
                                            onClick={header.sort}
                                            width="15"
                                            height="15"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemon.map((p) => (
                        <StyledTableRow key={p.name}>
                            <StyledTableCell align="center">
                                {p.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <img
                                    src={
                                        p.image
                                            ? p.image
                                            : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                    }
                                    alt={"Image of " + p.name}
                                    width="50"
                                    height="50"
                                ></img>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {p.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {p.types.length === 2 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img
                                            style={{ margin: "2px" }}
                                            alt="type icon"
                                            src={require("../Images/Types/" +
                                                p.types[0] +
                                                ".png")}
                                            width="25"
                                            height="25"
                                        ></img>{" "}
                                        <img
                                            style={{ margin: "2px" }}
                                            alt="type icon"
                                            src={require("../Images/Types/" +
                                                p.types[1] +
                                                ".png")}
                                            width="25"
                                            height="25"
                                        ></img>
                                    </div>
                                ) : (
                                    <img
                                        src={require("../Images/Types/" +
                                            p.types[0] +
                                            ".png")}
                                        width="25"
                                        alt="type icon"
                                        height="25"
                                    ></img>
                                )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {p.abilities.length === 1 ? (
                                    p.abilities[0]
                                ) : p.abilities.length === 2 ? (
                                    <div>
                                        {p.abilities[0]} <br></br>{" "}
                                        {p.abilities[1]}
                                    </div>
                                ) : (
                                    <div>
                                        {p.abilities[0]}
                                        <br></br>
                                        {p.abilities[1]}
                                        <br></br>
                                        {p.abilities[2]}
                                    </div>
                                )}
                            </StyledTableCell>
                            {Object.keys(p.stats).map((stat) => {
                                return (
                                    <StyledTableCell
                                        key={p.name + "_" + stat}
                                        sx={{ width: 75 }}
                                        align="center"
                                    >
                                        {p.stats[stat]}
                                    </StyledTableCell>
                                )
                            })}
                            {/*<StyledTableCell align="center">
                                {p.url}
                            </StyledTableCell>*/}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
