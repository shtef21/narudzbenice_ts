import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf
} from '@react-pdf/renderer'
import type { ItemCalculatedType, OrderFormCalculatedType } from '../context/orderForm.types'
import { formatDate } from './utils'
import { logoBase64 } from '../assets/base64images'

// --------------------
// Styles
// --------------------
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    // fontFamily: 'Helvetica'  <-- By default it's Helvetica. TODO - Embed Times New Roman or smth
  },

  // Logo
  logo: {
    width: 200,
    position: 'absolute',
    top: 40,
    left: 40
  },

  // Headers
  mainHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subheader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },

  // Right column (buyer info)
  rightColumn: {
    marginLeft: 240,
    marginBottom: 10,
  },

  section: {
    marginBottom: 10
  },

  // Table
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0'
  },
  tableCell: {
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 9
  },

  colName: { width: '32%' },
  colSmall: { width: '11.33%' },

  footer: {
    marginTop: 20
  }
})

type MyDocumentProps = {
  formData: OrderFormCalculatedType
  logoBase64: string
}

// --------------------
// Document
// --------------------
const MyDocument = ({ formData, logoBase64 }: MyDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo */}
      <Image src={logoBase64} style={styles.logo} />

      {/* Right aligned header */}
      <View style={styles.rightColumn}>
        <Text style={styles.mainHeader}>
          Narudžbenica br. {formData.id}/{formData.class}
        </Text>

        <Text style={styles.header}>Naručitelj</Text>
        <Text>OIB: {formData.customer.oib}</Text>
        <Text>Naziv: {formData.customer.name}</Text>
        <Text>Adresa: {formData.customer.address}</Text>
        <Text>E-mail: {formData.customer.email}</Text>
      </View>

      {/* Supplier */}
      <View style={styles.section}>
        <Text style={styles.header}>Dobavljač</Text>
        <Text>OIB: {formData.supplier.oib}</Text>
        <Text>Naziv: {formData.supplier.name}</Text>
        <Text>Adresa: {formData.supplier.address}</Text>
      </View>

      {/* Data */}
      <View style={styles.section}>
        <Text style={styles.header}>Podaci</Text>
        <Text>Urudžbeni broj: {formData.registryNumber}</Text>
        <Text>Klasa: {formData.class}</Text>
        <Text>Dostava: {formData.delivery}</Text>
        <Text>Tip narudžbe: {formData.orderType}</Text>
        <Text>Evidencijski broj iz plana nabave: {formData.recordNumber}</Text>
        <Text>Pozicija iz proračuna: {formData.budgetPosition}</Text>

        <Text style={{ marginTop: 10 }}>
          Broj stavki: {formData.calculatedItems.length}
        </Text>
        <Text>Ukupno bez PDVa: €{formData.formTotalNoPdv.toFixed(2)}</Text>
        <Text>Iznos PDVa: €{formData.formTotalPdvAmount.toFixed(2)}</Text>
        <Text style={{ fontWeight: 'bold' }}>
          UKUPNA CIJENA: €{formData.formGrandTotal.toFixed(2)}
        </Text>
      </View>

      {/* Items table */}
      <Text style={styles.subheader}>Stavke:</Text>

      <View style={styles.table}>
        {/* Header row */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeaderCell, styles.colName]}>
            Naziv
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell, styles.colSmall]}>
            Cijena bez{'\n'}PDVa (€)
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell, styles.colSmall]}>
            Kol.
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell, styles.colSmall]}>
            PDV (%)
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell, styles.colSmall]}>
            Ukupno bez{'\n'}PDVa (€)
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell, styles.colSmall]}>
            Ukupno s{'\n'}PDVom (€)
          </Text>
        </View>

        {/* Rows */}
        {formData.calculatedItems.map((item: ItemCalculatedType, i: number) => (
          <View key={i} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.colName]}>{item.name}</Text>
            <Text style={[styles.tableCell, styles.colSmall]}>
              {(item.priceNoPdv || 0).toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, styles.colSmall]}>
              {item.amount}
            </Text>
            <Text style={[styles.tableCell, styles.colSmall]}>
              {(item.pdvPtc || 0).toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, styles.colSmall]}>
              {item.totalNoPdv.toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, styles.colSmall]}>
              {item.totalWithPdv.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Narudžbu inicirao i odobrio: {formData.approvedBy}</Text>
        <Text>{'\n'}___________________________</Text>
        <Text>{'\n'}Generirano {formatDate(formData.createdAt)}</Text>
      </View>
    </Page>
  </Document>
)

// --------------------
// Hook
// --------------------
export const usePdfMaker = () => {
  const makePdf = async (formData: OrderFormCalculatedType) => {
    const blob = await pdf(
      <MyDocument formData={formData} logoBase64={logoBase64} />
    ).toBlob()

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Narudzbenica-${formData.registryNumber}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return { makePdf }
}
