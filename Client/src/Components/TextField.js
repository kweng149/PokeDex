import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

export default function BasicTextFields({
    text,
    onSubmit,
    options,
    margin = true,
}) {
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <Box
            sx={{ margin: margin ? "25px 50px 0px 50px" : "0" }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(event) => handleSubmit(event)}
        >
            <Autocomplete
                freeSolo
                options={options}
                onChange={(event, value) => {
                    onSubmit(value)
                }}
                renderInput={(params) => (
                    <TextField
                        sx={{
                            "& .MuiInputBase-root": {
                                height: margin ? 40 : 40,
                            },
                        }}
                        {...params}
                        style={{ width: "180px" }}
                        size="small"
                        id="outlined-basic"
                        label={text}
                        variant="outlined"
                    />
                )}
            ></Autocomplete>
        </Box>
    )
}
