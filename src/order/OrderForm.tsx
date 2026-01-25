import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

function OrderForm() {
  return (
    <Box bgcolor="#f5f5f5" minHeight="100vh" py={4}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Generiranje narudžbenice
          </Typography>

          {/* Doc ID */}
          <Stack spacing={1} mb={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography fontWeight="bold">Broj narudžbenice</Typography>
              <Tooltip title="Broj narudžbenice automatski se povećava nakon svakog generiranja narudžbenice, a može se i ručno postaviti">
                <IconButton size="small">
                  <InfoOutlineIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <TextField type="number" placeholder="Unesite broj narudžbenice" defaultValue={1} />
          </Stack>

          {/* Buyer */}
          <Stack spacing={2} mb={3}>
            <Typography fontWeight="bold">
              Naručitelj
            </Typography>
            <TextField defaultValue="83507857596" label="OIB" />
            <TextField disabled defaultValue="Općina Karojba" label="Naziv" />
            <TextField
              disabled
              defaultValue="Karojba 1, 52424 Motovun"
              label="Adresa"
            />
            <TextField disabled defaultValue="opcina@karojba.hr" label="E-mail" />
          </Stack>

          {/* Supplier */}
          <Stack spacing={2} mb={3}>
            <Typography fontWeight="bold">Dobavljač</Typography>
            <TextField label="OIB dobavljača" />
            <TextField label="Naziv dobavljača" />
            <TextField label="Adresa dobavljača" />
          </Stack>

          {/* Ur broj */}
          <TextField
            fullWidth
            label="Urudžbeni broj"
            sx={{ mb: 3 }}
          />

          {/* Klasa */}
          <TextField
            fullWidth
            label="Klasa"
            sx={{ mb: 3 }}
          />

          {/* Delivery */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Dostava</InputLabel>
            <Select label="Dostava" defaultValue="">
              <MenuItem value="">-- Unesite tip dostave --</MenuItem>
              <MenuItem value="Paketna dostava">Paketna dostava</MenuItem>
              <MenuItem value="Prijevoz isporučitelja">Prijevoz isporučitelja</MenuItem>
              <MenuItem value="Prijevoz naručitelja">Prijevoz naručitelja</MenuItem>
              <MenuItem value="Ostalo">Ostalo</MenuItem>
            </Select>
          </FormControl>

          {/* Tip narudžbe */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tip narudžbe</InputLabel>
            <Select label="Tip narudžbe" defaultValue="">
              <MenuItem value="">-- Odaberite tip narudžbe --</MenuItem>
              <MenuItem value="Roba">Roba</MenuItem>
              <MenuItem value="Usluga">Usluga</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Evidencijski broj"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Pozicija iz proračuna"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Narudžbu inicirao i odobrio"
            defaultValue="Marko Lakošeljac"
            disabled
            sx={{ mb: 4 }}
          />

          {/* Items placeholder */}
          <Box mb={3}>
            <Typography variant="h6">Stavke</Typography>
            {/* Item components would go here */}
          </Box>

          {/* Buttons */}
          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained">Dodaj stavku</Button>
            <Button variant="contained" color="error">
              Ukloni posljednju stavku
            </Button>
            <Button variant="contained" color="warning">
              Prikaži spremljene podatke
            </Button>
            <Button variant="contained" color="success">
              Prikaži tekst
            </Button>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            color="success"
            size="large"
          >
            Generiraj PDF
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default OrderForm;
