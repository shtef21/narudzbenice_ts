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
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormManager } from "../logic/formManager";

function OrderForm() {
  const form = useFormManager()

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
            <TextField type="number" placeholder="Unesite broj narudžbenice" value={form.id} onChange={form.setFormId} />
          </Stack>

          {/* Customer */}
          <Stack spacing={2} mb={3}>
            <Typography fontWeight="bold">
              Naručitelj
            </Typography>
            <TextField label="OIB" value={form.customer.oib} onChange={form.setCustomerOib} />
            <TextField label="Naziv" value={form.customer.name} onChange={form.setCustomerName} />
            <TextField label="Adresa" value={form.customer.address} onChange={form.setCustomerAddress} />
            <TextField label="E-mail" value={form.customer.email} onChange={form.setCustomerEmail} />
          </Stack>

          {/* Supplier */}
          <Stack spacing={2} mb={3}>
            <Typography fontWeight="bold">Dobavljač</Typography>
            <TextField label="OIB dobavljača" value={form.supplier.oib} onChange={form.setSupplierOib} />
            <TextField label="Naziv dobavljača" value={form.supplier.oib} onChange={form.setSupplierName} />
            <TextField label="Adresa dobavljača" value={form.supplier.oib} onChange={form.setSupplierAddress} />
          </Stack>

          {/* Other data */}
          <Typography fontWeight="bold" mb={3}>Ostalo</Typography>

          {/* Registry number (Urudžbeni broj) */}
          <TextField
            fullWidth
            label="Urudžbeni broj"
            value={form.registryNumber}
            onChange={form.setRegistryNumber}
            sx={{ mb: 3 }}
          />

          {/* Class */}
          <TextField
            fullWidth
            label="Klasa"
            value={form.class}
            onChange={form.setFormClass}
            sx={{ mb: 3 }}
          />

          {/* Delivery type */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Dostava</InputLabel>
            <Select label="Dostava" value={form.delivery} onChange={form.setDelivery}>
              <MenuItem value="">-- Unesite tip dostave --</MenuItem>
              <MenuItem value="Paketna dostava">Paketna dostava</MenuItem>
              <MenuItem value="Prijevoz isporučitelja">Prijevoz isporučitelja</MenuItem>
              <MenuItem value="Prijevoz naručitelja">Prijevoz naručitelja</MenuItem>
              <MenuItem value="Ostalo">Ostalo</MenuItem>
            </Select>
          </FormControl>

          {/* Order type */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tip narudžbe</InputLabel>
            <Select label="Tip narudžbe" value={form.orderType} onChange={form.setOrderType}>
              <MenuItem value="">-- Odaberite tip narudžbe --</MenuItem>
              <MenuItem value="Roba">Roba</MenuItem>
              <MenuItem value="Usluga">Usluga</MenuItem>
            </Select>
          </FormControl>

          {/* Record number */}
          <TextField
            fullWidth
            label="Evidencijski broj"
            value={form.recordNumber}
            onChange={form.setRecordNumber}
            sx={{ mb: 3 }}
          />

          {/* Budget position */}
          <TextField
            fullWidth
            label="Pozicija iz proračuna"
            value={form.budgetPosition}
            onChange={form.setBudgetPosition}
            sx={{ mb: 3 }}
          />

          {/* Approved by */}
          <TextField
            fullWidth
            label="Narudžbu inicirao i odobrio"
            value={form.approvedBy}
            onChange={form.setApprovedBy}
            sx={{ mb: 4 }}
          />

          {/* Items placeholder */}
          <Box mb={3}>
            <Typography variant="h6" mb={1}>Stavke ({form.items.length})</Typography>
          </Box>

          {form.items.map((item, index) => {
            return (
              <Paper key={item.uuid} elevation={3} sx={{ p: 2, mb: 3 }}>
                <Stack spacing={2} mb={3}>
                  <Typography
                    fontWeight="bold"
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    Stavka {index + 1}
                    <IconButton onClick={() => form.deleteItem(item.uuid)}>
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                  <TextField label="OIB dobavljača" value={form.supplier.oib} onChange={form.setSupplierOib} />
                  <TextField label="Naziv dobavljača" value={form.supplier.oib} onChange={form.setSupplierName} />
                  <TextField label="Adresa dobavljača" value={form.supplier.oib} onChange={form.setSupplierAddress} />
                </Stack>
              </Paper>
            )
          })}

          {/* Buttons */}
          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained" onClick={form.addItem}>Dodaj stavku</Button>
            <Button variant="contained" color="warning">
              Prikaži spremljene podatke
            </Button>
            <Button variant="contained" color="warning" onClick={form.resetForm}>
              Očisti formu
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
