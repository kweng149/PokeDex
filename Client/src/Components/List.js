import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import ChunkArray from "../Utils/ChunkArray"

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: "#9de2ff",
}))

export default function InteractiveList({ showOptions, favorites }) {
    const [dense, setDense] = React.useState(false)
    const [secondary, setSecondary] = React.useState(true)

    const favoritesArray = Object.entries(favorites).map(([key, value]) => ({
        [key]: value,
    }))

    return (
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            {showOptions ? (
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={dense}
                                onChange={(event) =>
                                    setDense(event.target.checked)
                                }
                            />
                        }
                        label="Enable dense"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={secondary}
                                onChange={(event) =>
                                    setSecondary(event.target.checked)
                                }
                            />
                        }
                        label="Enable secondary text"
                    />
                </FormGroup>
            ) : null}

            <Grid container spacing={2}>
                {ChunkArray(favoritesArray, 3).map((chunk, i) => {
                    return (
                        <Grid item xs={12} md={4} key={i}>
                            <Demo>
                                <List dense={dense}>
                                    {chunk.map((favorite) =>
                                        favorite ? (
                                            <ListItem
                                                key={Object.keys(favorite)[0]}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <img
                                                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                                            alt="pokeball"
                                                        ></img>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primaryTypographyProps={{
                                                        fontSize: "20px",
                                                    }}
                                                    secondaryTypographyProps={{
                                                        fontSize: "17px",
                                                    }}
                                                    primary={
                                                        Object.keys(favorite)[0]
                                                    }
                                                    secondary={
                                                        secondary
                                                            ? favorite[
                                                                  Object.keys(
                                                                      favorite
                                                                  )[0]
                                                              ]
                                                            : null
                                                    }
                                                />
                                            </ListItem>
                                        ) : null
                                    )}
                                </List>
                            </Demo>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
