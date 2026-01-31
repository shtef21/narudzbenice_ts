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
  type SelectChangeEvent,
} from "@mui/material";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { useOrderFormContext } from "../context/OrderFormContext";
import { useEffect } from "react";
import type { DeliveryType, OrderType } from "../context/orderForm.types";

function OrderForm() {
  const { state: form, dispatch } = useOrderFormContext()

  const setFormId = (event: React.ChangeEvent<HTMLInputElement>) => dispatch({
    type: 'setId',
    payload: parseInt(event.target.value)
  })

  // Customer
  const setCustomerOib = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setCustomerOib', payload: event.target.value })
  const setCustomerName = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setCustomerName', payload: event.target.value })
  const setCustomerAddress = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setCustomerAddress', payload: event.target.value })
  const setCustomerEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setCustomerEmail', payload: event.target.value })

  // Supplier
  const setSupplierOib = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setSupplierOib', payload: event.target.value })
  const setSupplierName = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setSupplierName', payload: event.target.value })
  const setSupplierAddress = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setSupplierAddress', payload: event.target.value })

  // Others
  const setRegistryNumber = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setRegistryNumber', payload: event.target.value })
  const setFormClass = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setClass', payload: event.target.value })
  const setRecordNumber = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setRecordNumber', payload: event.target.value })
  const setBudgetPosition = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setBudgetPosition', payload: event.target.value })
  const setApprovedBy = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setApprovedBy', payload: event.target.value })

  // DeliveryType (select)
  const setDelivery = (event: SelectChangeEvent) =>
    dispatch({ type: 'setDelivery', payload: event.target.value as DeliveryType })

  // OrderType (select)
  const setOrderType = (event: SelectChangeEvent) =>
    dispatch({ type: 'setOrderType', payload: event.target.value as OrderType })

  // Reset form (button click)
  const resetForm = () => dispatch({ type: 'resetForm' })

  useEffect(() => {
    console.log(form)
  }, [form])

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
            <TextField type="number" placeholder="Unesite broj narudžbenice" value={form.id} onChange={setFormId} />
          </Stack>

          {/* Customer */}
          <Stack spacing={2} mb={3}>
            <Typography fontWeight="bold">
              Naručitelj
            </Typography>
            <TextField label="OIB" value={form.customer.oib} onChange={setCustomerOib} />
            <TextField label="Naziv" value={form.customer.name} onChange={setCustomerName} />
            <TextField label="Adresa" value={form.customer.address} onChange={setCustomerAddress} />
            <TextField label="E-mail" value={form.customer.email} onChange={setCustomerEmail} />
          </Stack>

          {/* Supplier */}
          <Stack spacing={2} mb={3}>
            <Typography fontWeight="bold">Dobavljač</Typography>
            <TextField label="OIB dobavljača" value={form.supplier.oib} onChange={setSupplierOib} />
            <TextField label="Naziv dobavljača" value={form.supplier.oib} onChange={setSupplierName} />
            <TextField label="Adresa dobavljača" value={form.supplier.oib} onChange={setSupplierAddress} />
          </Stack>

          {/* Other data */}
          <Typography fontWeight="bold" mb={3}>Ostalo</Typography>

          {/* Registry number (Urudžbeni broj) */}
          <TextField
            fullWidth
            label="Urudžbeni broj"
            value={form.registryNumber}
            onChange={setRegistryNumber}
            sx={{ mb: 3 }}
          />

          {/* Class */}
          <TextField
            fullWidth
            label="Klasa"
            value={form.class}
            onChange={setFormClass}
            sx={{ mb: 3 }}
          />

          {/* Delivery type */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Dostava</InputLabel>
            <Select label="Dostava" value={form.delivery} onChange={setDelivery}>
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
            <Select label="Tip narudžbe" value={form.orderType} onChange={setOrderType}>
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
            onChange={setRecordNumber}
            sx={{ mb: 3 }}
          />

          {/* Budget position */}
          <TextField
            fullWidth
            label="Pozicija iz proračuna"
            value={form.budgetPosition}
            onChange={setBudgetPosition}
            sx={{ mb: 3 }}
          />

          {/* Approved by */}
          <TextField
            fullWidth
            label="Narudžbu inicirao i odobrio"
            value={form.approvedBy}
            onChange={setApprovedBy}
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
            <Button variant="contained" color="warning" onClick={resetForm}>
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
